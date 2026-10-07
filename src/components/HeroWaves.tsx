import { useEffect, useRef } from "react";
import * as THREE from "three";
import heroOcean from "../assets/hero-ocean.jpg";

/**
 * The original aerial-ocean hero photograph, animated: the image is drawn on a
 * full-bleed quad and its UVs are warped by a sum of scrolling sine swells, so
 * the water rolls continuously instead of sitting still. Crests get a slight
 * lift in brightness so the motion reads as swell rather than a wobble.
 */
export default function HeroWaves() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    // Orthographic + a unit quad: the shader owns the framing, not the camera.
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load(heroOcean);
    // Tagged sRGB, so the GPU decodes to linear on sample; the fragment shader
    // re-encodes via <colorspace_fragment> on the way out. Skipping either half
    // of that round trip is what made the photo render far darker than the
    // browser displays it.
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.minFilter = THREE.LinearFilter;

    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: texture },
      // x,y scale + x,y offset that reproduce CSS `object-fit: cover`.
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uUvOffset: { value: new THREE.Vector2(0, 0) },
    };

    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform sampler2D uTexture;
          uniform vec2 uUvScale;
          uniform vec2 uUvOffset;
          varying vec2 vUv;

          // The surf line runs upper-left to lower-right, with open water to the
          // upper right — so the swell has to travel shoreward, down and to the
          // left. SHORE is that heading; every wave marches along it.
          const vec2 SHORE = vec2(-0.707, -0.707);
          const float PI = 3.14159265;
          const float TAU = 6.28318531;

          // Long swell, cross swell, and a fine chop. Each is sin(k·(d·uv) - ωt),
          // which propagates along +d; summed, they never visibly repeat.
          float swell(vec2 uv, float t) {
            float travel = dot(SHORE, uv);
            float cross = dot(vec2(-SHORE.y, SHORE.x), uv);

            float a = sin(travel * 9.0 - t * 0.55);
            float b = sin(travel * 15.0 + cross * 4.0 - t * 0.42);
            float c = sin(travel * 24.0 - cross * 6.0 - t * 0.80);
            float d = sin(travel * 38.0 - t * 1.05);
            return a * 0.42 + b * 0.30 + c * 0.18 + d * 0.10;
          }

          void main() {
            vec2 uv = vUv * uUvScale + uUvOffset;

            float wave = swell(vUv, uTime);

            // Distance along the shoreward heading: ~0 at the sand in the lower
            // left, falling to -1.41 out at open water in the upper right.
            float shoreDist = dot(SHORE, vUv);
            // Confine the swash to the beach; the open water keeps its own swell.
            float shoreBand = smoothstep(-1.05, -0.12, shoreDist);

            // Swash cycle: the sea rushes up the sand quickly, then drains back
            // slowly — the asymmetry is what makes it read as surf rather than a
            // sine wave. One full run every 9 seconds.
            //
            // sin^2 is zero in both value AND slope at each end of the cycle, so
            // it wraps seamlessly. The phase warp below skews the peak earlier to
            // get the fast-up/slow-back shape without reintroducing a velocity
            // jump at the reset — the warp is monotonic (1 + 0.6cos > 0) and
            // fixes both endpoints.
            float phase = fract(uTime / 9.0);
            float skewed = phase + 0.6 * sin(PI * phase) / PI;
            float run = sin(PI * skewed);
            float swash = run * run * shoreBand;

            // Sampling at uv - SHORE*k makes the image travel along +SHORE, so the
            // foam edge climbs the sand as k rises and recedes as it falls.
            vec2 displaced = uv
              + SHORE * wave * 0.008
              - SHORE * swash * 0.045;

            vec3 color = texture2D(uTexture, displaced).rgb;

            // Crests catch a touch more light; the sand darkens as the wash wets
            // it and dries again behind the retreating edge.
            color *= 1.0 + wave * 0.04;
            color *= 1.0 - swash * 0.06;

            gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
            #include <colorspace_fragment>
          }
        `,
      }),
    );
    scene.add(quad);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      // Let three set the CSS size too: on a 2x display, sizing only the drawing
      // buffer leaves the canvas laid out at double scale and the photo blown up.
      renderer.setSize(clientWidth, clientHeight);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      const image = texture.image as HTMLImageElement | undefined;
      if (image?.width) {
        const imageAspect = image.width / image.height;
        const viewAspect = clientWidth / clientHeight;
        if (viewAspect > imageAspect) {
          // Viewport wider than image: crop top/bottom.
          const scaleY = imageAspect / viewAspect;
          uniforms.uUvScale.value.set(1, scaleY);
          uniforms.uUvOffset.value.set(0, (1 - scaleY) / 2);
        } else {
          const scaleX = viewAspect / imageAspect;
          uniforms.uUvScale.value.set(scaleX, 1);
          uniforms.uUvOffset.value.set((1 - scaleX) / 2, 0);
        }
      }
    };
    resize();
    // The image may not have decoded on the first layout pass.
    const settle = window.setInterval(() => {
      if ((texture.image as HTMLImageElement | undefined)?.width) {
        resize();
        window.clearInterval(settle);
      }
    }, 60);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const clock = new THREE.Clock();
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      uniforms.uTime.value = reduceMotion ? 0 : clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(settle);
      resizeObserver.disconnect();
      texture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
