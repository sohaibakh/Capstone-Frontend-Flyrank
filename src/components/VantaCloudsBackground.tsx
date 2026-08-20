"use client";

import { useEffect, useRef } from "react";

type VantaEffect = {
  destroy: () => void;
};

type VantaWindow = Window & {
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
const desktopCloudsQuery = "(min-width: 768px)";

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
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia(desktopCloudsQuery);
    let effect: VantaEffect | null = null;
    let cancelled = false;
    let isLoading = false;

    const destroyEffect = () => {
      effect?.destroy();
      effect = null;
    };

    const shouldRunVanta = () => desktopQuery.matches && !reducedMotionQuery.matches;

    const startEffect = () => {
      if (!shouldRunVanta() || effect || isLoading) return;

      isLoading = true;
      loadVantaScripts()
        .then(() => {
          const vantaWindow = window as VantaWindow;

          isLoading = false;

          if (cancelled || !shouldRunVanta() || !containerRef.current || !vantaWindow.VANTA?.CLOUDS) return;

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
          isLoading = false;
          scriptLoadPromise = null;
        });
    };

    const syncEffectToViewport = () => {
      if (shouldRunVanta()) {
        startEffect();
      } else {
        destroyEffect();
      }
    };

    syncEffectToViewport();
    desktopQuery.addEventListener("change", syncEffectToViewport);
    reducedMotionQuery.addEventListener("change", syncEffectToViewport);

    return () => {
      cancelled = true;
      desktopQuery.removeEventListener("change", syncEffectToViewport);
      reducedMotionQuery.removeEventListener("change", syncEffectToViewport);
      destroyEffect();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={`vanta-clouds-fallback ${className}`} />;
}
