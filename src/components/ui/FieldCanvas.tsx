"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Newton — Field Generator export · field=5 (Ledger) seed=41.42
const FRAG = `precision highp float;


uniform vec2  uRes;
uniform float uTime;
uniform vec3  uBg, uMark, uTint;
uniform float uCols, uRowScale, uLen, uWeight, uJitter;
uniform float uFreq, uAmp, uContrast, uBias, uTintMix, uGrain, uSeed, uQuant;
uniform int   uField;
uniform vec2  uMouse;        // x:[0,1], y:[0,H] — eased cursor in field space
uniform float uMouseOn;      // 0..1 presence (fades on leave)
uniform int   uMouseMode;    // 0 off · 1 ripple · 2 spotlight · 3 push
uniform float uMouseRadius, uMouseStrength;

float hash21(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash21(i), b=hash21(i+vec2(1,0)), c=hash21(i+vec2(0,1)), d=hash21(i+vec2(1,1));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*vnoise(p); p*=2.03; a*=0.5;} return s; }

// scalar field in normalized space: x in [0,1], y in [0,H]
float field(vec2 p, float H, float t){
  float f = uFreq;
  if(uField==0){                                   // Ribbon — flowing bands
    float v = 0.0;
    for(int i=0;i<3;i++){
      float fi = float(i);
      float ph = uSeed + fi*2.4;
      float y  = H*0.5 + H*0.22*uAmp*sin(p.x*f*(0.6+fi*0.28) + t + ph)
                       + (fi-1.0)*H*0.17;
      v = max(v, 1.0 - smoothstep(0.0, H*0.30, abs(p.y-y)));
    }
    return v;
  }
  if(uField==1){                                   // Interference — layered sinusoids
    float a = sin(p.x*f + sin(p.y*f*0.8 + t)*1.6*uAmp + t);
    float b = sin(p.y*f*1.3 - t*0.7 + uSeed);
    return 0.5 + 0.25*a + 0.25*b;
  }
  if(uField==2){                                   // Flow — advected fbm
    vec2 q = p*f*0.35 + vec2(uSeed);
    vec2 w = vec2(fbm(q + t*0.10), fbm(q + vec2(5.2,1.3) - t*0.08));
    return fbm(q + w*1.6*uAmp);
  }
  if(uField==3){                                   // Signal — radial emission
    vec2 c = vec2(0.5, H*0.5);
    float d = length((p-c)*vec2(1.0,1.15));
    float r = 0.5 + 0.5*sin(d*f*2.2 - t*1.8 + uSeed);
    return r * (1.0 - smoothstep(0.15, 0.75*uAmp+0.25, d));
  }
  if(uField==4){                                   // Gate — quantized modules
    vec2 q = floor(p*f*1.2 + uSeed) / (f*1.2);
    float n = fbm(q*3.0 + t*0.15);
    return smoothstep(0.35, 0.65, n)*uAmp;
  }
  if(uField==5){                                   // Ledger — stepped columns
    float col = floor(p.x*f*2.0 + uSeed);
    float n = vnoise(vec2(col*0.31, t*0.25));
    return smoothstep(0.0, 1.0, 1.0 - abs(p.y/H - (0.15 + 0.7*n))*3.2*(2.0-uAmp));
  }
  if(uField==6){                                   // Market — price walk + volatility
    float price = H*0.5 + H*0.30*uAmp*(fbm(vec2(p.x*f*0.30 + uSeed, t*0.12))*2.0 - 1.0);
    float vol   = 0.05 + 0.26*fbm(vec2(p.x*f*0.85 + 11.0, t*0.10));
    return 1.0 - smoothstep(0.0, H*vol, abs(p.y - price));
  }
  if(uField==7){                                   // Volatility — expanding envelope
    float band = H*0.5*uAmp*(0.18 + 0.52*(0.5 + 0.5*sin(p.x*f*0.35 + t + uSeed)));
    float d = abs(p.y - H*0.5);
    return smoothstep(band, band*0.55, d);
  }
  if(uField==8){                                   // Order book — depth ladder at mid
    float mid = H*0.5;
    float d = abs(p.y - mid) / (H*0.5);
    float depth = 1.0 - smoothstep(0.0, uAmp, d);
    float side = sign(p.y - mid);
    float lad = 0.5 + 0.5*sin(p.x*f*1.4 + side*t*1.2 + uSeed);
    return depth * mix(0.45, 1.0, lad);
  }
  // 9 — Lanes — horizontal throughput streams
  float lane = 0.5 + 0.5*sin(p.y*f*1.1 + uSeed);
  float pass = fbm(vec2(p.x*f*0.30 - t*0.9, floor(p.y*f*1.1)*0.7));
  return smoothstep(0.42, 0.95, lane) * smoothstep(0.30, 0.70, pass) * uAmp;
}

float sdBox(vec2 q, vec2 b){ vec2 d = abs(q) - b; return length(max(d,0.0)) + min(max(d.x,d.y),0.0); }

float sdMark(vec2 q, float halfLen, float r){
  // Newton candle — body + wick. The brand mark. No variants.
  float body = sdBox(q, vec2(r, halfLen));
  float wick = sdBox(q, vec2(r*0.15, halfLen*1.85 + 0.05));
  return min(body, wick);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  float H = uRes.y / uRes.x;
  vec2 p = frag / uRes.x;                      // x:[0,1], y:[0,H]
  float t = uTime;

  vec2 cells = vec2(uCols, uCols/uRowScale * (uRes.y/uRes.x) / H);
  cells.y = uCols * H / uRowScale;             // square-ish cells scaled by aspect
  vec2 g  = vec2(p.x*uCols, p.y*uCols/uRowScale);
  vec2 id = floor(g);
  vec2 fq = fract(g) - 0.5;

  vec2 cp = vec2((id.x+0.5)/uCols, (id.y+0.5)*uRowScale/uCols);

  // ---- cursor: distance from this cell centre to the eased pointer ----
  float mAmt = uMouseOn * uMouseStrength;
  float mDist = distance(cp, uMouse);
  float mFall = exp(-mDist / max(uMouseRadius, 0.001));   // 1 at pointer → 0 away

  // Push (mode 3) warps the sample point outward before the field is read
  if(uMouseMode==3){
    vec2 dir = cp - uMouse;
    cp += (mDist > 1e-4 ? dir/mDist : vec2(0.0)) * mFall * 0.10 * mAmt;
  }

  float v = field(cp, H, t);

  // Ripple (mode 1) sends a concentric wave out from the pointer
  if(uMouseMode==1){
    v += sin(mDist*38.0 - t*5.0) * mFall * 0.9 * mAmt;
  }

  float h = hash21(id + uSeed*13.0);

  float amt = clamp((v - uBias) * uContrast, 0.0, 1.0);
  amt = pow(amt, 1.15);
  amt *= 0.55 + 0.45*hash21(id*1.7 + 3.1);     // organic variance

  // Spotlight (mode 2) reveals marks under the pointer
  if(uMouseMode==2){
    amt = max(amt, mFall * mAmt);
  }

  float halfLen = 0.5 * uLen * amt;
  if(uQuant > 0.5) halfLen = floor(halfLen*uQuant + 0.5) / uQuant;
  float r       = 0.5 * uWeight * mix(0.35, 1.0, amt);

  fq.y += (hash21(id + 7.7) - 0.5) * uJitter;

  float d  = sdMark(fq, halfLen, r);
  float aa = 1.2 / (uRes.x / uCols);
  float a  = 1.0 - smoothstep(-aa, aa, d);
  a *= step(0.02, amt);

  vec3 markCol = (h < uTintMix) ? uTint : uMark;
  vec3 col = mix(uBg, markCol, a);

  col += (hash21(frag + fract(t)) - 0.5) * uGrain;
  gl_FragColor = vec4(col, 1.0);
}`;

/**
 * Tunable knobs for one field render. Mirrors the "Copy React" export from the
 * Newton Field Generator: the fragment shader is shared, only these uniform
 * values differ between placements. Colors are raw sRGB hex mirroring our
 * design tokens (a WebGL uniform can't consume a Tailwind class).
 */
export type FieldConfig = {
  colors: { bg: string; mark: string; tint: string };
  field: number;
  cols: number;
  rowScale: number;
  len: number;
  weight: number;
  jitter: number;
  quant: number;
  freq: number;
  amp: number;
  contrast: number;
  bias: number;
  tintMix: number;
  grain: number;
  seed: number;
  mouse: { mode: number; radius: number; strength: number };
  /** Multiplier on elapsed seconds feeding uTime (tool's first time factor). */
  timeScale: number;
  /** Faster time scale on phones so the slow drift stays perceptible on small
   *  screens (where cursor interaction is also disabled). */
  mobileTimeScale?: number;
  /** Fixed frame used under prefers-reduced-motion (no ongoing animation). */
  reducedTime: number;
};

// CTA banner — Ledger (field 5) on brand blue, cursor "push". bg mirrors
// --color-accent (--blue-500).
export const CTA_FIELD: FieldConfig = {
  colors: { bg: "#3D6FE8", mark: "#E7E4DB", tint: "#A8BEF5" },
  field: 5,
  cols: 80,
  rowScale: 2,
  len: 0.87,
  weight: 0.36,
  jitter: 0.32,
  quant: 7,
  freq: 10.3,
  amp: 1.41,
  contrast: 1.9,
  bias: 0.18,
  tintMix: 0.22,
  grain: 0.012,
  seed: 41.417,
  mouse: { mode: 3, radius: 0.22, strength: 0.83 },
  timeScale: 0.5,
  mobileTimeScale: 0.35,
  reducedTime: 3.9,
};

// Hero — Ledger (field 5) on the page surface, cursor "push". bg mirrors
// --color-surface (--bone-50) so the field blends into the website background;
// marks are the brand blue over the near-white surface.
export const HERO_FIELD: FieldConfig = {
  colors: { bg: "#FBFCFE", mark: "#3D6FE8", tint: "#A8BEF5" },
  field: 5,
  cols: 80,
  rowScale: 2,
  len: 0.87,
  weight: 0.36,
  jitter: 0.32,
  quant: 7,
  freq: 17.7,
  amp: 1.09,
  contrast: 1.9,
  bias: 0.18,
  tintMix: 0.22,
  grain: 0.012,
  seed: 41.417,
  mouse: { mode: 3, radius: 0.22, strength: 1.44 },
  timeScale: 0.17,
  mobileTimeScale: 0.35,
  reducedTime: 1.51,
};

// A config's `cols` is the column count at this reference (desktop) width. The
// live count scales with the canvas width so each mark cell keeps a roughly
// constant physical size instead of shrinking to a cramped mesh on mobile.
const COLS_REF_WIDTH = 1440;
const MIN_COLS = 18;

function responsiveCols(widthPx: number, refCols: number): number {
  const scaled = Math.round((widthPx / COLS_REF_WIDTH) * refCols);
  return Math.max(MIN_COLS, Math.min(refCols, scaled));
}

type FieldCanvasProps = {
  config: FieldConfig;
  className?: string;
};

export default function FieldCanvas({ config, className = "" }: FieldCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const wrapEl = wrap.current;
    if (!el) return;

    // The shader authors colors as raw sRGB hex (matching our design tokens) and
    // writes them straight to the framebuffer. Disable three's color management so
    // it doesn't sRGB→linear the uniforms — otherwise the field renders darker than
    // `blue-500` and stops matching `bg-accent` / the readability scrim.
    THREE.ColorManagement.enabled = false;

    // Bail cleanly if a WebGL context can't be created — unsupported/blocked
    // devices, or non-DOM environments like jsdom (unit tests). The section's
    // bg-surface / bg-accent stays as the visual fallback.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: el,
        antialias: true,
        alpha: false,
      });
    } catch {
      return;
    }
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // On phones there's no cursor to drive the field, so disable interaction and
    // run a faster time scale so the drift reads clearly on a small screen.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const mouseMode = isMobile ? 0 : config.mouse.mode;
    const timeScale =
      isMobile && config.mobileTimeScale != null
        ? config.mobileTimeScale
        : config.timeScale;

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uBg: { value: new THREE.Color(config.colors.bg) },
      uMark: { value: new THREE.Color(config.colors.mark) },
      uTint: { value: new THREE.Color(config.colors.tint) },
      uCols: { value: config.cols },
      uRowScale: { value: config.rowScale },
      uLen: { value: config.len },
      uWeight: { value: config.weight },
      uJitter: { value: config.jitter },
      uQuant: { value: config.quant },
      uFreq: { value: config.freq },
      uAmp: { value: config.amp },
      uContrast: { value: config.contrast },
      uBias: { value: config.bias },
      uTintMix: { value: config.tintMix },
      uGrain: { value: config.grain },
      uSeed: { value: config.seed },
      uField: { value: config.field },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseOn: { value: 0 },
      uMouseMode: { value: mouseMode },
      uMouseRadius: { value: config.mouse.radius },
      uMouseStrength: { value: config.mouse.strength },
    };
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ fragmentShader: FRAG, uniforms })
    );
    scene.add(mesh);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(
        w * renderer.getPixelRatio(),
        h * renderer.getPixelRatio()
      );
      // Keep mark cell size ~constant across breakpoints (see responsiveCols).
      uniforms.uCols.value = responsiveCols(w, config.cols);
    };
    resize();
    window.addEventListener("resize", resize);

    // Eased cursor follow. The canvas sits behind the banner content (z-0), so the
    // overlaid text/buttons would swallow pointer events if we listened on the canvas
    // directly. Listen on window instead and map into canvas space, toggling presence
    // by whether the pointer is within the canvas bounds.
    let mx = 0.5;
    let my = 0.5;
    let mtx = 0.5;
    let mty = 0.5;
    let mtOn = 0;
    const interactive = mouseMode !== 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      mtx = nx;
      mty = 1 - ny;
      mtOn = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1 ? 1 : 0;
    };
    if (interactive) window.addEventListener("pointermove", onMove);

    let raf = 0;
    const t0 = performance.now();
    let tp = t0;
    const tick = (now: number) => {
      const dt = Math.min((now - tp) / 1000, 0.05);
      tp = now;
      const k = 1 - Math.pow(0.001, dt);
      mx += (mtx - mx) * k;
      my += (mty - my) * k;
      uniforms.uMouseOn.value += (mtOn - uniforms.uMouseOn.value) * k;
      const H = uniforms.uRes.value.y / uniforms.uRes.value.x;
      uniforms.uMouse.value.set(mx, my * H);
      uniforms.uTime.value =
        reduce || timeScale === 0
          ? config.reducedTime
          : ((now - t0) / 1000) * timeScale * 2;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(tick);
    };
    tick(t0);
    requestAnimationFrame(() => {
      if (wrapEl) wrapEl.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (interactive) window.removeEventListener("pointermove", onMove);
      renderer.dispose();
    };
  }, [config]);

  return (
    <div className={`h-full w-full ${className}`} aria-hidden>
      <div
        ref={wrap}
        className="h-full w-full"
        style={{ opacity: 0, transition: "opacity .4s ease-in-out" }}
      >
        <canvas ref={ref} className="block h-full w-full" />
      </div>
    </div>
  );
}
