import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import earthMap from "../assets/earth_atmos_2048.jpg";
import earthNormal from "../assets/earth_normal_1024.jpg";
import earthSpecular from "../assets/earth_specular_1024.jpg";
import earthClouds from "../assets/earth_clouds_1024.png";

export type GlobePlace = { name: string; country: string; lat: number; lng: number };

export type GlobeApi = {
  /** Turns the globe to `place` and draws the route out from home. */
  flyTo: (place: { lat: number; lng: number }) => void;
};

const RADIUS = 1.6;

function toVector(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Points along the great circle from `from` to `to`, lifted into an arc. */
function arc(from: THREE.Vector3, to: THREE.Vector3, segments = 96) {
  const radius = from.length();
  const a = from.clone().normalize();
  const b = to.clone().normalize();
  const angle = a.angleTo(b);
  const axis = new THREE.Vector3().crossVectors(a, b).normalize();
  if (axis.lengthSq() < 0.001) axis.set(0, 1, 0);
  return Array.from({ length: segments + 1 }, (_, i) => {
    const t = i / segments;
    return a
      .clone()
      .applyAxisAngle(axis, angle * t)
      .multiplyScalar(radius + Math.sin(Math.PI * t) * 0.32);
  });
}

export function Globe({
  destinations,
  home,
  onReady,
  className = "",
}: {
  destinations: GlobePlace[];
  home: GlobePlace;
  onReady?: (api: GlobeApi) => void;
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{ name: string; region: string } | null>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => new THREE.Color(styles.getPropertyValue(name).trim());
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const points = [
      { name: home.name, region: `${home.country} — our desk`, lat: home.lat, lng: home.lng },
      ...destinations.map((d) => ({ name: d.name, region: d.country, lat: d.lat, lng: d.lng })),
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 5.4;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Vertical swipes still scroll the page on phones.
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const segments = coarse ? 64 : 96;
    // Outer group takes the drag; the inner one holds Earth's axial tilt.
    const spin = new THREE.Group();
    spin.rotation.x = 0.35;
    spin.rotation.y = -1.1;
    scene.add(spin);
    const earth = new THREE.Group();
    earth.rotation.z = (23.4 * Math.PI) / 180;
    spin.add(earth);

    const loader = new THREE.TextureLoader();
    const map = loader.load(earthMap);
    map.colorSpace = THREE.SRGBColorSpace;
    const clouds = loader.load(earthClouds);
    clouds.colorSpace = THREE.SRGBColorSpace;
    const specular = loader.load(earthSpecular);
    const uniforms = { uTime: { value: 0 }, uOceanMask: { value: specular } };
    const surface = new THREE.MeshPhongMaterial({
      map,
      normalMap: loader.load(earthNormal),
      normalScale: new THREE.Vector2(0.85, 0.85),
      specularMap: specular,
      specular: token("--globe-specular"),
      shininess: 55,
    });
    // Brighter land, and a slow swell across the oceans (the specular map
    // doubles as the ocean mask).
    surface.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uOceanMask = uniforms.uOceanMask;
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "void main() {",
          `uniform float uTime;
          uniform sampler2D uOceanMask;
          float swell(vec2 uv, float time) {
            float a = sin(uv.x * 90.0 + time * 0.6);
            float b = sin(uv.y * 64.0 - time * 0.45);
            float c = sin((uv.x + uv.y) * 48.0 + time * 0.33);
            return (a * b + c) * 0.5;
          }
          void main() {`,
        )
        .replace(
          "#include <map_fragment>",
          `#include <map_fragment>
          float ocean = texture2D(uOceanMask, vMapUv).r;
          float wave = swell(vMapUv, uTime);
          vec3 oceanShallow = vec3(0.129, 0.420, 0.729);
          vec3 oceanDeep = vec3(0.031, 0.169, 0.451);
          diffuseColor.rgb *= mix(1.35, 1.0, ocean);
          vec3 water = mix(oceanDeep, oceanShallow, 0.5 + wave * 0.11);
          diffuseColor.rgb = mix(diffuseColor.rgb, water, ocean * 0.8);`,
        );
    };
    earth.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS, segments, segments), surface));

    const cloudLayer = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.012, segments, segments),
      new THREE.MeshPhongMaterial({ map: clouds, transparent: true, opacity: 0.42, depthWrite: false }),
    );
    earth.add(cloudLayer);

    const sun = new THREE.DirectionalLight(token("--globe-sun"), 2.3);
    sun.position.set(-1.6, 1.1, 4.2);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(token("--globe-ambient"), 0.6));
    const rim = new THREE.DirectionalLight(token("--globe-atmosphere"), 0.45);
    rim.position.set(3, -1, -2.5);
    scene.add(rim);

    // Atmosphere: a back-faced shell glowing at the limb, brighter on the sunlit side.
    spin.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.16, 64, 64),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            uColor: { value: token("--globe-atmosphere") },
            uSun: { value: sun.position.clone().normalize() },
          },
          vertexShader: `varying vec3 vNormal; varying vec3 vWorldNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vWorldNormal = normalize(mat3(modelMatrix) * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
          fragmentShader: `uniform vec3 uColor; uniform vec3 uSun; varying vec3 vNormal; varying vec3 vWorldNormal;
            void main() {
              float rim = pow(max(0.0, 0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.2);
              float lit = clamp(dot(vWorldNormal, uSun) * 0.5 + 0.62, 0.0, 1.0);
              gl_FragColor = vec4(uColor, 1.0) * rim * lit * 1.5;
            }`,
        }),
      ),
    );

    const pins = new THREE.Group();
    earth.add(pins);
    const pinGeometry = new THREE.SphereGeometry(0.028, 16, 16);
    const haloGeometry = new THREE.SphereGeometry(0.055, 16, 16);
    const pinColor = token("--globe-pin");
    points.forEach((point, index) => {
      const position = toVector(point.lat, point.lng, RADIUS * 1.015);
      const pin = new THREE.Mesh(pinGeometry, new THREE.MeshBasicMaterial({ color: pinColor }));
      pin.position.copy(position);
      pin.userData = { index };
      pins.add(pin);
      const halo = new THREE.Mesh(
        haloGeometry,
        new THREE.MeshBasicMaterial({ color: pinColor, transparent: true, opacity: 0.22, depthWrite: false }),
      );
      halo.position.copy(position);
      halo.userData = { halo: true, phase: index * 0.7 };
      pins.add(halo);
    });

    // The route from home, drawn out over 2.6s with a plane dot at its tip.
    const routeGeometry = new THREE.BufferGeometry();
    const routeMaterial = new THREE.LineBasicMaterial({ color: token("--globe-flight"), transparent: true, opacity: 0.7 });
    const route = new THREE.Line(routeGeometry, routeMaterial);
    route.visible = false;
    earth.add(route);
    const plane = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), new THREE.MeshBasicMaterial({ color: pinColor }));
    plane.visible = false;
    earth.add(plane);
    let routeCurve: THREE.CatmullRomCurve3 | null = null;
    let routeStart = 0;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerInside = false;
    let pointerMoved = false;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let spinY = reduced ? 0 : 0.0016;
    let spinX = 0;
    let lastInteraction = -Infinity;
    let autoSpin = 1;
    let dragDX = 0;
    let dragDY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastMoveTime = 0;
    let activePointer: number | null = null;
    let flight: { fromX: number; fromY: number; toX: number; toY: number; start: number; dur: number } | null = null;
    const touched = () => {
      lastInteraction = performance.now();
    };

    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerInside = true;
      pointerMoved = true;
      touched();
      if (dragging && e.pointerId === activePointer) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        dragDX += dx;
        dragDY += dy;
        const dt = Math.max(1, e.timeStamp - lastMoveTime);
        velocityX = velocityX * 0.7 + (dx / dt) * 0.3;
        velocityY = velocityY * 0.7 + (dy / dt) * 0.3;
        lastX = e.clientX;
        lastY = e.clientY;
        lastMoveTime = e.timeStamp;
      }
    };
    const onDown = (e: PointerEvent) => {
      touched();
      if (activePointer !== null || (e.pointerType === "mouse" && e.button !== 0)) return;
      activePointer = e.pointerId;
      dragging = true;
      flight = null;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = e.timeStamp;
      velocityX = velocityY = 0;
      spinY = spinX = 0;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onUp = (e: PointerEvent) => {
      touched();
      if (e.pointerId !== activePointer) return;
      activePointer = null;
      dragging = false;
      // A flick keeps the globe turning; a drag that paused before release doesn't.
      const flicked = e.timeStamp - lastMoveTime < 80;
      spinY = flicked && !reduced ? velocityX * 16.7 * 35e-5 : 0;
      spinX = flicked && !reduced ? velocityY * 16.7 * 35e-5 : 0;
    };
    const onLeave = () => {
      pointerInside = false;
      setHovered(null);
    };
    const canvas = renderer.domElement;
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("lostpointercapture", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      camera.aspect = width / height;
      // Pull back on portrait stages so the whole globe still fits across.
      camera.position.z = 5.8 / Math.min(1, camera.aspect);
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const clock = new THREE.Clock();
    let elapsed = 0;
    let frame = 0;
    let visible = true;
    const render = () => {
      if (!visible) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(render);
      const delta = Math.min(clock.getDelta(), 0.05);
      elapsed += delta;
      const step = delta * 60;

      if (dragDX || dragDY) {
        spin.rotation.y += dragDX * 0.005;
        spin.rotation.x = THREE.MathUtils.clamp(spin.rotation.x + dragDY * 0.005, -0.9, 0.9);
        dragDX = dragDY = 0;
      }
      if (flight) {
        const t = Math.min(1, (performance.now() - flight.start) / flight.dur);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
        // A slight pull back mid-flight, like a camera on a long move.
        camera.position.z = (5.8 + Math.sin(t * Math.PI) * 0.35) / Math.min(1, camera.aspect);
        spin.rotation.x = flight.fromX + (flight.toX - flight.fromX) * eased;
        spin.rotation.y = flight.fromY + (flight.toY - flight.fromY) * eased;
        if (t >= 1) flight = null;
      } else if (!reduced) {
        // Auto-rotation eases back in after five idle seconds.
        const idle = performance.now() - lastInteraction > 5000;
        autoSpin += (Number(idle) - autoSpin) * (1 - Math.exp(-(idle ? 1.2 : 7.2) * delta));
        if (!dragging) {
          spinY += (0.0016 * autoSpin - spinY) * (1 - Math.exp(-(idle ? 1.2 : 4.8) * delta));
          spinX *= Math.exp(-3.7 * delta);
          spin.rotation.y += spinY * step;
          spin.rotation.x = THREE.MathUtils.clamp(spin.rotation.x + spinX * step, -0.9, 0.9);
        }
      }

      uniforms.uTime.value = reduced ? 0 : elapsed;
      if (!reduced) cloudLayer.rotation.y += 0.024 * autoSpin * delta;

      if (routeCurve && !reduced) {
        const t = Math.min(1, (performance.now() - routeStart) / 2600);
        routeGeometry.setDrawRange(0, Math.max(2, Math.floor(t * 97)));
        plane.position.copy(routeCurve.getPoint(t));
        plane.visible = t < 1;
        routeMaterial.opacity = t < 1 ? 0.7 : 0.35;
      }

      pins.children.forEach((child) => {
        if (child.userData.halo && !reduced)
          child.scale.setScalar(1 + Math.sin(elapsed * 1.6 + child.userData.phase) * 0.35);
      });

      if (pointerInside && pointerMoved && !dragging) {
        pointerMoved = false;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster
          .intersectObjects(
            pins.children.filter((c) => !c.userData.halo),
            false,
          )
          // Only pins on the near side of the globe.
          .filter((hit) => hit.object.getWorldPosition(new THREE.Vector3()).z > 0);
        const point = hits[0] ? (points[hits[0].object.userData.index] ?? null) : null;
        setHovered((current) => (current?.name === point?.name ? current : point));
        canvas.style.cursor = hits.length ? "pointer" : "grab";
      }

      renderer.render(scene, camera);
    };

    // Off screen, the loop stops entirely.
    const visibility = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(render);
    });
    visibility.observe(mount);
    render();

    onReadyRef.current?.({
      flyTo: (place) => {
        if (!reduced) {
          const path = arc(toVector(home.lat, home.lng, RADIUS * 1.018), toVector(place.lat, place.lng, RADIUS * 1.018));
          routeCurve = new THREE.CatmullRomCurve3(path);
          routeGeometry.setFromPoints(path);
          routeGeometry.setDrawRange(0, 2);
          route.visible = true;
          routeStart = performance.now();
        }
        // Turn so the place faces the camera, the short way round.
        earth.updateMatrix();
        const facing = toVector(place.lat, place.lng, 1).applyMatrix4(earth.matrix);
        const toY = -Math.atan2(facing.x, facing.z);
        const toX = THREE.MathUtils.clamp(Math.asin(THREE.MathUtils.clamp(facing.y, -1, 1)), -0.9, 0.9);
        const full = Math.PI * 2;
        let turn = (toY - spin.rotation.y) % full;
        if (turn > Math.PI) turn -= full;
        if (turn < -Math.PI) turn += full;
        spinY = spinX = 0;
        lastInteraction = performance.now() + 4000;
        autoSpin = 0;
        if (reduced) {
          spin.rotation.set(toX, spin.rotation.y + turn, 0);
          return;
        }
        flight = {
          fromX: spin.rotation.x,
          fromY: spin.rotation.y,
          toX,
          toY: spin.rotation.y + turn,
          start: performance.now(),
          dur: 1600,
        };
      },
    });

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("lostpointercapture", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) => m.dispose());
        }
      });
      [map, clouds, specular, surface.normalMap].forEach((t) => t?.dispose());
      renderer.dispose();
      mount.removeChild(canvas);
    };
  }, [destinations, home]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="h-full w-full cursor-grab select-none" />
      {hovered && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 border border-primary/50 bg-abyss/80 px-4 py-2 text-center backdrop-blur">
          <p className="display text-xl text-primary">{hovered.name}</p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{hovered.region}</p>
        </div>
      )}
    </div>
  );
}
