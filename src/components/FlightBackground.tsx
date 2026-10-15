import { useEffect, useRef } from "react";
import type { FlightStop } from "../flights";

/**
 * The drone flight behind a page: one photograph per stop, each with its own
 * camera move, joined by a fly-through cloud bank. Scroll position drives it
 * all — stopping mid-scroll hangs the drone in place, scrolling back up flies
 * the route in reverse.
 *
 * Stops are anchored to elements marked `data-flight`, in document order. A
 * stop holds while its element is on screen; the cloud pass peaks as the next
 * marked element's top edge crosses the middle of the viewport, which is the
 * padding between two sections rather than a paragraph.
 *
 * Plain WebGL rather than three.js: it is one full-screen quad, and this keeps
 * three.js off every page that doesn't already load it for the globe.
 */

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec2 uCoverA;
uniform vec2 uCoverB;
uniform vec3 uCamA;
uniform vec3 uCamB;
uniform float uOceanA;
uniform float uOceanB;
uniform float uMix;
uniform float uCloud;
uniform float uTravel;
uniform vec3 uSky;

const float PI = 3.14159265;

// ── Ocean (ported from the old hero) ─────────────────────────────────────────
// The surf line runs upper-left to lower-right with open water to the upper
// right, so the swell travels shoreward: down and to the left.
const vec2 SHORE = vec2(-0.707, -0.707);

float swell(vec2 uv, float t) {
  float travel = dot(SHORE, uv);
  float cross = dot(vec2(-SHORE.y, SHORE.x), uv);
  float a = sin(travel * 9.0 - t * 0.55);
  float b = sin(travel * 15.0 + cross * 4.0 - t * 0.42);
  float c = sin(travel * 24.0 - cross * 6.0 - t * 0.80);
  float d = sin(travel * 38.0 - t * 1.05);
  return a * 0.42 + b * 0.30 + c * 0.18 + d * 0.10;
}

// ── Photograph under a flying camera ─────────────────────────────────────────
// cam.xy is the point the drone flies at, cam.z how far in it has flown. The
// photograph is only ever scaled, uniformly, about that point: no pan, no
// warp. The point is held still on screen, so nothing slides sideways, and
// scaling in about a point inside the frame can never reach the image edge.
vec3 shot(sampler2D tex, vec2 cover, vec3 cam, float ocean) {
  // Screen position in image orientation: x right, y down.
  vec2 p = vec2(vUv.x, 1.0 - vUv.y);
  // cover: the fraction of the image a cover-fit shows on each axis.
  vec2 fit = 0.5 + (p - 0.5) * cover;
  // On a narrow (phone) screen the point may sit outside the cover-fit crop;
  // pinning it to the crop keeps the zoom a zoom rather than a drift.
  vec2 focus = clamp(cam.xy, 0.5 - 0.5 * cover, 0.5 + 0.5 * cover);
  vec2 q = focus + (fit - focus) / cam.z;
  vec2 uv = vec2(q.x, 1.0 - q.y);

  if (ocean > 0.5) {
    float wave = swell(vUv, uTime);
    float shoreBand = smoothstep(-1.05, -0.12, dot(SHORE, vUv));
    // Swash: rushes up the sand fast, drains back slowly, every 9 seconds.
    float phase = fract(uTime / 9.0);
    float skewed = phase + 0.6 * sin(PI * phase) / PI;
    float run = sin(PI * skewed);
    float swash = run * run * shoreBand;
    uv += SHORE * wave * 0.008 - SHORE * swash * 0.045;
    vec3 c = texture2D(tex, clamp(uv, 0.001, 0.999)).rgb;
    return c * (1.0 + wave * 0.04) * (1.0 - swash * 0.06);
  }
  return texture2D(tex, clamp(uv, 0.001, 0.999)).rgb;
}

// ── Cloud bank ───────────────────────────────────────────────────────────────
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + 17.1;
    a *= 0.5;
  }
  return v;
}

// Four sheets of cloud at staggered depths. uTravel slides every sheet toward
// the lens; one that reaches it wraps to the back, faded out at both ends so
// nothing pops. Near sheets are sampled at a small scale, so their puffs are
// huge and sweep past; far ones are fine-grained.
vec4 clouds() {
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  // Thin wisps at the edges of the pass, solid cover at its peak.
  float thresh = mix(0.62, 0.05, uCloud);
  float clear = 1.0;
  vec3 col = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float depth = fract(fi * 0.25 - uTravel);
    float scale = mix(0.6, 4.0, depth);
    vec2 q = p * scale + vec2(fi * 5.2, fi * 1.7) + vec2(uTime * 0.015, 0.0);
    float n = fbm(q);
    float dens = smoothstep(thresh, thresh + 0.25, n);
    float fade = smoothstep(0.0, 0.2, depth) * smoothstep(1.0, 0.75, depth);
    float a = dens * fade * 0.85;
    // Denser cores read lighter, like sunlit billows; thin edges stay dim.
    col += a * clear * uSky * (0.7 + 0.45 * n);
    clear *= 1.0 - a;
  }
  float alpha = 1.0 - clear;
  col /= max(alpha, 0.001);
  // A veil at the very peak guarantees the swap underneath is never seen.
  float veil = smoothstep(0.8, 1.0, uCloud);
  col = mix(col, uSky * 0.95, veil * (1.0 - alpha));
  return vec4(col, max(alpha, veil));
}

void main() {
  vec3 col = shot(uTexA, uCoverA, uCamA, uOceanA);
  if (uMix > 0.0) {
    col = mix(col, shot(uTexB, uCoverB, uCamB, uOceanB), uMix);
  }
  if (uCloud > 0.001) {
    vec4 c = clouds();
    col = mix(col, c.rgb, c.a);
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

const UNIFORMS = [
  "uRes", "uTime", "uTexA", "uTexB", "uCoverA", "uCoverB", "uCamA", "uCamB",
  "uOceanA", "uOceanB", "uMix", "uCloud", "uTravel", "uSky",
] as const;

type Shot = { tex: WebGLTexture; aspect: number };

/** Extra zoom at the peak of a cloud pass: the drone at full speed. */
const RUSH = 0.6;

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function FlightBackground({ stops }: { stops: FlightStop[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    // No WebGL: the page keeps its plain abyss glow behind the canvas.
    if (!canvas || !gl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    gl.useProgram(program);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = Object.fromEntries(
      UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
    gl.uniform1i(u.uTexA, 0);
    gl.uniform1i(u.uTexB, 1);

    let disposed = false;
    let raf = 0;
    const request = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(draw);
    };

    // Each stop starts as a 1px swatch of its sky colour, so the flight is
    // usable (if plain) before its photograph lands.
    const shots: Shot[] = stops.map((stop) => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array(rgb(stop.sky)));
      // Photos aren't power-of-two: WebGL 1 needs clamped, mip-less sampling.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      const shot: Shot = { tex, aspect: 16 / 9 };

      const image = new Image();
      image.decoding = "async";
      image.src = stop.src;
      image
        .decode()
        .then(() => {
          if (disposed) return;
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
          shot.aspect = image.naturalWidth / image.naturalHeight;
          request();
        })
        .catch(() => {});
      return shot;
    });

    // ── Layout: where each stop's marker sits in the document ──────────────
    let peaks: number[] = [];
    let end = 1;

    const measure = () => {
      const H = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
      const markers = Array.from(document.querySelectorAll<HTMLElement>("[data-flight]")).slice(0, stops.length);
      const tops = markers.map((el) => el.getBoundingClientRect().top + window.scrollY);
      // peaks[k]: the scroll position where stop k's cloud pass peaks — its
      // marker's top edge at mid-screen. Kept at least 0.3 screens apart so a
      // short section still gets a hold, and pulled back within reach of the
      // bottom of the page so the last stop is always arrived at.
      const gap = 0.3 * H;
      peaks = tops.map((top, k) => (k === 0 ? 0 : top - H / 2));
      for (let k = 1; k < peaks.length; k++) peaks[k] = Math.max(peaks[k], peaks[k - 1] + gap);
      for (let k = peaks.length - 1; k >= 1; k--) {
        const ceiling = k === peaks.length - 1 ? maxScroll - 0.15 * H : peaks[k + 1] - gap;
        peaks[k] = Math.min(peaks[k], ceiling);
      }
      end = Math.max(maxScroll, (peaks[peaks.length - 1] ?? 0) + 1);
      request();
    };

    /** Which stops are on screen, how far through the cloud pass, and how far
     *  through each stop's own camera move. */
    const locate = (s: number, H: number) => {
      const n = peaks.length;
      const stretch = (k: number) => Math.max(1, (k + 1 < n ? peaks[k + 1] : end) - peaks[k]);
      const move = (k: number) => (s - peaks[k]) / stretch(k);
      const hold = (k: number) => ({ a: k, b: k, t: 0, ma: move(k), mb: move(k) });
      if (n === 0) return { a: 0, b: 0, t: 0, ma: 0, mb: 0 };
      for (let j = 1; j < n; j++) {
        const w = Math.min(0.35 * H, 0.45 * stretch(j - 1), 0.45 * stretch(j));
        if (s < peaks[j] - w) return hold(j - 1);
        if (s <= peaks[j] + w) {
          return { a: j - 1, b: j, t: (s - (peaks[j] - w)) / (2 * w), ma: move(j - 1), mb: move(j) };
        }
      }
      return hold(n - 1);
    };

    // ── Sizing ─────────────────────────────────────────────────────────────
    const resize = () => {
      // Phones cap lower: the cloud noise is per-pixel work.
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.75);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      measure();
    };

    const cover = (aspect: number): [number, number] => {
      const view = canvas.width / canvas.height;
      return view > aspect ? [1, aspect / view] : [view / aspect, 1];
    };

    const start = performance.now();

    const draw = () => {
      raf = 0;
      if (disposed || !stops.length) return;
      const H = window.innerHeight;
      const { a, b, t, ma, mb } = locate(window.scrollY, H);
      const A = stops[a];
      const B = stops[b];
      const time = reduceMotion ? 0 : (performance.now() - start) / 1000;

      const cam = (stop: FlightStop, m: number, rush: number) => {
        // Reduced motion: each photo holds one still framing, mid-move.
        const k = reduceMotion ? 0.5 : Math.min(1, Math.max(0, m));
        const [from, to] = stop.zoom;
        return [stop.focus[0], stop.focus[1], (from + (to - from) * k) * (reduceMotion ? 1 : rush)];
      };

      // The drone accelerates into the cloud bank and eases off coming out:
      // the outgoing photo's zoom builds ever faster toward the peak (cubic
      // ease-in), the incoming one arrives pushed in and decelerates to its
      // own framing (cubic ease-out). A uniform scale only, and the steep part
      // happens under the clouds, where the enlargement can't be seen.
      const out = Math.min(1, t / 0.5);
      const arrive = Math.max(0, (t - 0.5) / 0.5);
      const rushA = a === b ? 1 : 1 + RUSH * out ** 3;
      const rushB = a === b ? 1 : 1 + RUSH * (1 - arrive) ** 3;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, shots[a].tex);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, shots[b].tex);

      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, time);
      gl.uniform2fv(u.uCoverA, cover(shots[a].aspect));
      gl.uniform2fv(u.uCoverB, cover(shots[b].aspect));
      gl.uniform3fv(u.uCamA, cam(A, ma, rushA));
      gl.uniform3fv(u.uCamB, cam(B, mb, rushB));
      gl.uniform1f(u.uOceanA, A.ocean ? 1 : 0);
      gl.uniform1f(u.uOceanB, B.ocean ? 1 : 0);
      // The swap happens only while the cloud bank is solid.
      gl.uniform1f(u.uMix, a === b ? 0 : smoothstep(0.42, 0.58, t));
      gl.uniform1f(u.uCloud, a === b ? 0 : Math.sin(Math.PI * t));
      // Cloud sheets stream past slowest at the edges of the pass and fastest
      // in the middle, matching the drone's speed: t - sin(2πt)/2π has zero
      // slope at both ends and its steepest slope at the peak.
      gl.uniform1f(u.uTravel, reduceMotion ? 0 : (t - Math.sin(2 * Math.PI * t) / (2 * Math.PI)) * 1.6);
      // The clouds take on the outgoing light, then the incoming: the change
      // of time of day happens inside the bank.
      const skyA = rgb(A.sky);
      const skyB = rgb(B.sky);
      const k = smoothstep(0.2, 0.8, t);
      // The dark tint follows the same crossfade, so a stop without one (the
      // Home ocean) darkens only once the clouds have closed over it.
      if (tintRef.current) {
        const tint = (A.tint ?? 1) + ((B.tint ?? 1) - (A.tint ?? 1)) * k;
        const value = tint.toFixed(3);
        if (tintRef.current.style.opacity !== value) tintRef.current.style.opacity = value;
      }
      gl.uniform3f(
        u.uSky,
        ((skyA[0] + (skyB[0] - skyA[0]) * k) / 255) * 0.9,
        ((skyA[1] + (skyB[1] - skyA[1]) * k) / 255) * 0.9,
        ((skyA[2] + (skyB[2] - skyA[2]) * k) / 255) * 0.9,
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Keep the loop running only while something moves on its own: the
      // surf, or a cloud bank the drone is parked inside. Otherwise a frame
      // is drawn per scroll event and the GPU idles.
      const surf = (A.ocean && t < 0.5) || (B.ocean && t >= 0.5);
      if (!reduceMotion && (surf || (t > 0 && t < 1))) request();
    };

    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    // Content above can change height (images, fonts, reveals) without the
    // viewport changing: re-measure the markers when the page does.
    const pageObserver = new ResizeObserver(measure);
    pageObserver.observe(document.body);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      sizeObserver.disconnect();
      pageObserver.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", measure);
      shots.forEach((shot) => gl.deleteTexture(shot.tex));
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
      // No loseContext(): StrictMode re-runs this effect on the same canvas,
      // and getContext would hand back the lost context.
    };
  }, [stops]);

  // Both layers are sized to the large viewport so a phone's collapsing URL
  // bar doesn't resize (and re-allocate) the canvas mid-scroll. z-index -1 and
  // later in the document than body::before, so they paint over the abyss
  // glow, and the tint after the canvas paints over the canvas.
  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-lvh w-full"
        style={{ zIndex: -1 }}
      />
      {/* Dark tint over every photograph and cloud, so the page's light type
          always reads: one even abyss wash, no vignette. The scene stays
          recognisable as colour and movement, never as contrast that competes
          with the copy. */}
      <div
        ref={tintRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-lvh w-full bg-abyss/[0.9]"
        style={{ zIndex: -1 }}
      />
    </>
  );
}
