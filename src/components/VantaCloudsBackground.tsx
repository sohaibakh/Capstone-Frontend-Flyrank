"use client";

import { useEffect, useRef } from "react";

type VantaEffect = {
  destroy: () => void;
};

type VantaWindow = Window & {
  THREE?: unknown;
  VANTA?: {
    CLOUDS?: (options: {
      el: HTMLElement;
      mouseControls: boolean;
      touchControls: boolean;
      gyroControls: boolean;
      minHeight: number;
      minWidth: number;
      backgroundColor: number;
      skyColor: number;
      cloudColor: number;
      cloudShadowColor: number;
      sunColor: number;
      sunGlareColor: number;
      sunlightColor: number;
      speed: number;
    }) => VantaEffect;
  };
};

const threeUrl = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const vantaUrl = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.clouds.min.js";

let scriptLoadPromise: Promise<void> | null = null;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

    if (existingScript?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = existingScript || document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Unable to load ${src}`));

    if (!existingScript) {
      document.body.appendChild(script);
    }
  });
}

function loadVantaScripts() {
  if (!scriptLoadPromise) {
    scriptLoadPromise = loadScript(threeUrl).then(() => loadScript(vantaUrl));
  }

  return scriptLoadPromise;
}

export default function VantaCloudsBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let effect: VantaEffect | null = null;
    let cancelled = false;

    if (reduceMotion) return;

    loadVantaScripts()
      .then(() => {
        const vantaWindow = window as VantaWindow;

        if (cancelled || !containerRef.current || !vantaWindow.VANTA?.CLOUDS) return;

        effect = vantaWindow.VANTA.CLOUDS({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          backgroundColor: 0xffffff,
          skyColor: 0x68b8d7,
          cloudColor: 0xadc1de,
          cloudShadowColor: 0x183550,
          sunColor: 0xff9919,
          sunGlareColor: 0xff6633,
          sunlightColor: 0xff9933,
          speed: 0.6,
        });
      })
      .catch(() => {
        scriptLoadPromise = null;
      });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={`vanta-clouds-fallback ${className}`} />;
}
