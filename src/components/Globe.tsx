import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import earthMap from "../assets/earth_atmos_2048.jpg";
import earthNormal from "../assets/earth_normal_2048.jpg";
import earthSpecular from "../assets/earth_specular_2048.jpg";
import earthClouds from "../assets/earth_clouds_1024.png";

export type GlobePoint = {
  name: string;
  region: string;
  lat: number;
  lon: number;
};

export const globePoints: GlobePoint[] = [
  { name: "Santorini", region: "Cyclades, Greece", lat: 36.39, lon: 25.46 },
  { name: "Jökulsárlón", region: "South Iceland", lat: 64.05, lon: -16.18 },
  { name: "Itsukushima", region: "Hiroshima, Japan", lat: 34.29, lon: 132.32 },
  { name: "Nærøyfjord", region: "Western Norway", lat: 60.87, lon: 6.9 },
  { name: "Baa Atoll", region: "The Maldives", lat: 5.17, lon: 73.05 },
  { name: "Erg Chebbi", region: "Moroccan Sahara", lat: 31.15, lon: -3.98 },
  { name: "Torres del Paine", region: "Patagonia", lat: -50.94, lon: -73.4 },
  { name: "Ha'apai", region: "Kingdom of Tonga", lat: -19.75, lon: -174.36 },
];

const RADIUS = 1.6;

function toVector(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<GlobePoint | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 5.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // The Blue Marble map is already low-key; tone mapping only crushes it further.
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.x = 0.35;
    world.rotation.y = -1.1;
    scene.add(world);

    // Axial tilt, so the terminator falls where you expect it to.
    const earth = new THREE.Group();
    earth.rotation.z = (23.4 * Math.PI) / 180;
    world.add(earth);

    const loader = new THREE.TextureLoader();
    const color = loader.load(earthMap);
    color.colorSpace = THREE.SRGBColorSpace;
    const clouds = loader.load(earthClouds);
    clouds.colorSpace = THREE.SRGBColorSpace;

    const oceanMask = loader.load(earthSpecular);
    const waveUniforms = { uTime: { value: 0 }, uOceanMask: { value: oceanMask } };

    const surfaceMaterial = new THREE.MeshPhongMaterial({
      map: color,
      normalMap: loader.load(earthNormal),
      normalScale: new THREE.Vector2(0.85, 0.85),
      specularMap: oceanMask,
      // Kept very dark: any more and the sea turns into silver foil.
      specular: new THREE.Color("#16303f"),
      shininess: 55,
    });

    // The specular map is white over water and black over land, so it doubles as
    // an ocean mask: tint the sea a lighter teal and roll a slow swell across it,
    // leaving the continents untouched.
    surfaceMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = waveUniforms.uTime;
      shader.uniforms.uOceanMask = waveUniforms.uOceanMask;

      shader.fragmentShader = shader.fragmentShader
        .replace(
          "void main() {",
          `
          uniform float uTime;
          uniform sampler2D uOceanMask;

          float swell(vec2 uv, float time) {
            float a = sin(uv.x * 90.0 + time * 0.6);
            float b = sin(uv.y * 64.0 - time * 0.45);
            float c = sin((uv.x + uv.y) * 48.0 + time * 0.33);
            return (a * b + c) * 0.5;
          }

          void main() {
          `,
        )
        .replace(
          "#include <map_fragment>",
          `
          #include <map_fragment>
          float ocean = texture2D(uOceanMask, vMapUv).r;
          float wave = swell(vMapUv, uTime);
          vec3 oceanShallow = vec3(0.129, 0.420, 0.729);
          vec3 oceanDeep = vec3(0.031, 0.169, 0.451);
          // Land is dark in the Blue Marble map; lift it so it holds up against
          // the lightened sea.
          diffuseColor.rgb *= mix(1.35, 1.0, ocean);
          vec3 water = mix(oceanDeep, oceanShallow, 0.5 + wave * 0.11);
          diffuseColor.rgb = mix(diffuseColor.rgb, water, ocean * 0.8);
          `,
        );
    };

    const surface = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 96, 96),
      surfaceMaterial,
    );
    earth.add(surface);

    const cloudLayer = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.012, 96, 96),
      new THREE.MeshPhongMaterial({
        map: clouds,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      }),
    );
    earth.add(cloudLayer);

    // Sun: a single hard key light, offset toward the camera so most of the
    // near hemisphere is daylit and the terminator falls across the left limb.
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.3);
    sun.position.set(-1.6, 1.1, 4.2);
    scene.add(sun);
    // Enough fill that the night side reads as deep blue, not a void — but low
    // enough that the globe keeps its modelling instead of going flat and milky.
    scene.add(new THREE.AmbientLight(0x6d90a8, 0.6));
    const rimLight = new THREE.DirectionalLight(0x7fc6d8, 0.45);
    rimLight.position.set(3, -1, -2.5);
    scene.add(rimLight);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.16, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color("#6fc4e0") },
          uSun: { value: sun.position.clone().normalize() },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorldNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform vec3 uSun;
          varying vec3 vNormal;
          varying vec3 vWorldNormal;
          void main() {
            float rim = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
            // Scatter concentrates on the lit limb, as it does from orbit.
            float lit = clamp(dot(vWorldNormal, uSun) * 0.5 + 0.62, 0.0, 1.0);
            gl_FragColor = vec4(uColor, 1.0) * rim * lit * 1.5;
          }
        `,
      }),
    );
    world.add(atmosphere);

    // Destination markers.
    const markers = new THREE.Group();
    earth.add(markers);
    const markerGeometry = new THREE.SphereGeometry(0.028, 16, 16);
    const markerColor = new THREE.Color("#ffd79a");

    globePoints.forEach((point, i) => {
      const position = toVector(point.lat, point.lon, RADIUS * 1.015);

      const marker = new THREE.Mesh(
        markerGeometry,
        new THREE.MeshBasicMaterial({ color: markerColor }),
      );
      marker.position.copy(position);
      marker.userData = { index: i };
      markers.add(marker);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 16, 16),
        new THREE.MeshBasicMaterial({
          color: markerColor,
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        }),
      );
      halo.position.copy(position);
      halo.userData = { halo: true, phase: i * 0.7 };
      markers.add(halo);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerInside = false;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0.0016;
    let tiltVelocity = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerInside = true;

      if (dragging) {
        velocity = (e.clientX - lastX) * 0.00035;
        tiltVelocity = (e.clientY - lastY) * 0.00035;
        world.rotation.y += (e.clientX - lastX) * 0.005;
        world.rotation.x = THREE.MathUtils.clamp(
          world.rotation.x + (e.clientY - lastY) * 0.005,
          -0.9,
          0.9,
        );
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    };

    const onPointerUp = () => {
      dragging = false;
    };

    const onPointerLeave = () => {
      pointerInside = false;
      setHovered(null);
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);

    const resize = () => {
      const size = mount.clientWidth;
      renderer.setSize(size, size, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const clock = new THREE.Clock();
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      if (!dragging) {
        // Ease back to the idle drift after a drag.
        velocity += (0.0016 - velocity) * 0.02;
        tiltVelocity *= 0.94;
        world.rotation.y += velocity;
        world.rotation.x = THREE.MathUtils.clamp(
          world.rotation.x + tiltVelocity,
          -0.9,
          0.9,
        );
      }

      waveUniforms.uTime.value = t;

      // Clouds drift a touch faster than the surface.
      cloudLayer.rotation.y += 0.0004;

      markers.children.forEach((child) => {
        if (child.userData.halo) {
          const pulse =
            1 + Math.sin(t * 1.6 + (child.userData.phase as number)) * 0.35;
          child.scale.setScalar(pulse);
        }
      });

      if (pointerInside && !dragging) {
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(
          markers.children.filter((c) => !c.userData.halo),
          false,
        );
        // Only count a marker on the near hemisphere.
        const visible = hits.filter((hit) => {
          const world = hit.object.getWorldPosition(new THREE.Vector3());
          return world.z > 0;
        });
        const next =
          visible.length > 0
            ? globePoints[visible[0].object.userData.index as number]
            : null;
        setHovered((prev) => (prev?.name === next?.name ? prev : next));
        renderer.domElement.style.cursor = visible.length ? "pointer" : "grab";
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full cursor-grab" />
      {hovered && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 border border-primary/50 bg-abyss/80 px-4 py-2 text-center backdrop-blur">
          <p className="text-display text-xl text-primary">{hovered.name}</p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {hovered.region}
          </p>
        </div>
      )}
    </div>
  );
}
