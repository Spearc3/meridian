import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import earthMap from "../assets/earth_atmos_2048.jpg";
import earthNormal from "../assets/earth_normal_2048.jpg";
import earthSpecular from "../assets/earth_specular_2048.jpg";
import earthMapSmall from "../assets/earth_atmos_1024.jpg";
import earthNormalSmall from "../assets/earth_normal_1024.jpg";
import earthSpecularSmall from "../assets/earth_specular_1024.jpg";
import earthClouds from "../assets/earth_clouds_1024.png";
import { regions } from "../tpl";

export type GlobePoint = {
  name: string;
  region: string;
  lat: number;
  lon: number;
};

/** Where each destination in the deck's regional-coverage list sits. Country
 *  entries are pinned at their capital or main gateway city. */
const coordinates: Record<string, [number, number]> = {
  "New York": [40.71, -74.01],
  "Los Angeles": [34.05, -118.24],
  Chicago: [41.88, -87.63],
  Houston: [29.76, -95.37],
  Miami: [25.76, -80.19],
  Toronto: [43.65, -79.38],
  Vancouver: [49.28, -123.12],
  Montreal: [45.5, -73.57],
  Calgary: [51.05, -114.07],
  Singapore: [1.35, 103.82],
  Thailand: [13.76, 100.5],
  Malaysia: [3.14, 101.69],
  China: [39.9, 116.41],
  Japan: [35.68, 139.69],
  India: [28.61, 77.21],
  UAE: [25.2, 55.27],
  Qatar: [25.29, 51.53],
  "Saudi Arabia": [24.71, 46.68],
  Oman: [23.59, 58.41],
  Bahrain: [26.23, 50.59],
  Kuwait: [29.38, 47.99],
  "United Kingdom": [51.51, -0.13],
  France: [48.86, 2.35],
  Germany: [52.52, 13.4],
  Italy: [41.9, 12.5],
  Netherlands: [52.37, 4.9],
  Switzerland: [47.38, 8.54],
  Sydney: [-33.87, 151.21],
  Melbourne: [-37.81, 144.96],
  Brisbane: [-27.47, 153.03],
  Auckland: [-36.85, 174.76],
  "South Africa": [-26.2, 28.05],
  Kenya: [-1.29, 36.82],
  Morocco: [34.02, -6.84],
  Egypt: [30.04, 31.24],
};

/* Home desk first, then a pin for every destination the deck lists — built
   from the same `regions` list the home page prints under the globe. */
export const globePoints: GlobePoint[] = [
  { name: "Colombo", region: "Sri Lanka — our desk", lat: 6.93, lon: 79.86 },
  ...regions.flatMap((region) =>
    region.places
      .filter((place) => place in coordinates)
      .map((place) => ({
        name: place,
        region: region.name,
        lat: coordinates[place][0],
        lon: coordinates[place][1],
      })),
  ),
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

    // Touch devices get a 1.5x buffer: on a ~350px phone globe that is already
    // sharper than the eye resolves, at roughly half the fill cost of 2-3x.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, coarse ? 1.5 : 2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(pixelRatio);
    // ~350px across on a phone: 64 segments are as round as 96 there, at under
    // half the vertices per frame for the surface and cloud shells.
    const segments = coarse ? 64 : 96;
    // Horizontal drags spin the globe; vertical swipes still scroll the page.
    // Without this the browser claims the gesture mid-drag to scroll, which is
    // what made touch rotation stall and jump.
    renderer.domElement.style.touchAction = "pan-y";
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

    // Half of the map wraps the visible hemisphere, so a globe drawn at up to
    // ~640 device px shows no difference between the 1024 and 2048 textures —
    // the smaller set is a fifth of the download and GPU upload.
    const small = mount.clientWidth * pixelRatio <= 640;
    const loader = new THREE.TextureLoader();
    const color = loader.load(small ? earthMapSmall : earthMap);
    color.colorSpace = THREE.SRGBColorSpace;
    const clouds = loader.load(earthClouds);
    clouds.colorSpace = THREE.SRGBColorSpace;

    const oceanMask = loader.load(small ? earthSpecularSmall : earthSpecular);
    const waveUniforms = { uTime: { value: 0 }, uOceanMask: { value: oceanMask } };

    const surfaceMaterial = new THREE.MeshPhongMaterial({
      map: color,
      normalMap: loader.load(small ? earthNormalSmall : earthNormal),
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
      new THREE.SphereGeometry(RADIUS, segments, segments),
      surfaceMaterial,
    );
    earth.add(surface);

    const cloudLayer = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.012, segments, segments),
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
        new THREE.SphereGeometry(0.055, 16, 16),
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
    // Hit-testing 36 markers is only needed when the pointer has moved; after a
    // tap on a touch screen the pointer otherwise "stays inside" indefinitely.
    let pointerMoved = false;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0.0016;
    let tiltVelocity = 0;

    // Any touch, drag or hover holds the globe still so pins can be read; it
    // picks its slow spin back up after RESUME_MS without interaction.
    const DRIFT = 0.0016;
    const RESUME_MS = 5000;
    let lastInteraction = -Infinity;
    let drift = 1; // 0 = held still, 1 = idle spin (eased, never snaps)
    const touched = () => {
      lastInteraction = performance.now();
    };

    // Drag input is collected here and applied once per frame in tick(), so
    // touch screens (which can fire pointermove faster or slower than the
    // display) rotate in even steps. Flick speed is a smoothed px/ms average
    // over recent moves, not the last single event, so the coast is even too.
    const ROTATE_PER_PX = 0.005;
    let activePointer: number | null = null;
    let pendingX = 0;
    let pendingY = 0;
    let dragVX = 0;
    let dragVY = 0;
    let lastMoveTime = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerInside = true;
      pointerMoved = true;
      touched();

      if (dragging && e.pointerId === activePointer) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        pendingX += dx;
        pendingY += dy;
        const dt = Math.max(1, e.timeStamp - lastMoveTime);
        dragVX = dragVX * 0.7 + (dx / dt) * 0.3;
        dragVY = dragVY * 0.7 + (dy / dt) * 0.3;
        lastX = e.clientX;
        lastY = e.clientY;
        lastMoveTime = e.timeStamp;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      touched();
      // One finger drives; a second one doesn't hijack the drag.
      if (activePointer !== null) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      activePointer = e.pointerId;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = e.timeStamp;
      dragVX = dragVY = 0;
      velocity = tiltVelocity = 0;
      renderer.domElement.setPointerCapture(e.pointerId);
    };

    // Up, cancel (the browser took the gesture to scroll) or lost capture all
    // end the drag the same way, so it can never get stuck "held".
    const onPointerUp = (e: PointerEvent) => {
      touched();
      if (e.pointerId !== activePointer) return;
      activePointer = null;
      dragging = false;
      // Only a release that is still moving carries momentum (~7% of drag
      // speed, per frame); lifting a resting finger just stops.
      const moving = e.timeStamp - lastMoveTime < 80;
      velocity = moving ? dragVX * 16.7 * 0.00035 : 0;
      tiltVelocity = moving ? dragVY * 16.7 * 0.00035 : 0;
    };

    const onPointerLeave = () => {
      pointerInside = false;
      setHovered(null);
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.addEventListener("lostpointercapture", onPointerUp);
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
    // Only animate while the globe is on screen: off screen it would keep the
    // GPU busy (and the phone warm) for nothing. Time keeps flowing from the
    // clock, so the swell and pulses resume in step.
    let onScreen = true;
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !frame) frame = requestAnimationFrame(tick);
    });
    visibility.observe(mount);

    const tick = () => {
      if (!onScreen) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Apply this frame's share of the drag.
      if (pendingX || pendingY) {
        world.rotation.y += pendingX * ROTATE_PER_PX;
        world.rotation.x = THREE.MathUtils.clamp(
          world.rotation.x + pendingY * ROTATE_PER_PX,
          -0.9,
          0.9,
        );
        pendingX = pendingY = 0;
      }

      const idle = performance.now() - lastInteraction > RESUME_MS;
      drift += ((idle ? 1 : 0) - drift) * (idle ? 0.02 : 0.12);

      if (!dragging) {
        // Held: a flick's momentum dies out quickly and the globe settles.
        // Idle again: it eases back up to the slow drift.
        velocity += (DRIFT * drift - velocity) * (idle ? 0.02 : 0.08);
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
      cloudLayer.rotation.y += 0.0004 * drift;

      markers.children.forEach((child) => {
        if (child.userData.halo) {
          const pulse =
            1 + Math.sin(t * 1.6 + (child.userData.phase as number)) * 0.35;
          child.scale.setScalar(pulse);
        }
      });

      if (pointerInside && pointerMoved && !dragging) {
        pointerMoved = false;
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
      visibility.disconnect();
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      renderer.domElement.removeEventListener("lostpointercapture", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full cursor-grab select-none" />
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
