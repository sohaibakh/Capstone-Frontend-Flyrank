"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

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

export default function VantaCloudsBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const [canUseVanta, setCanUseVanta] = useState(false);
  const [threeReady, setThreeReady] = useState(false);
  const [vantaReady, setVantaReady] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia(desktopCloudsQuery);

    const syncScriptEligibility = () => {
      const shouldRun = desktopQuery.matches && !reducedMotionQuery.matches;
      setCanUseVanta(shouldRun);

      if (!shouldRun) {
        effectRef.current?.destroy();
        effectRef.current = null;
      }
    };

    syncScriptEligibility();
    desktopQuery.addEventListener("change", syncScriptEligibility);
    reducedMotionQuery.addEventListener("change", syncScriptEligibility);

    return () => {
      desktopQuery.removeEventListener("change", syncScriptEligibility);
      reducedMotionQuery.removeEventListener("change", syncScriptEligibility);
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!canUseVanta || !vantaReady || effectRef.current || !containerRef.current) return;

    const vantaWindow = window as VantaWindow;

    if (!vantaWindow.VANTA?.CLOUDS) return;

    effectRef.current = vantaWindow.VANTA.CLOUDS({
      el: containerRef.current,
      mouseControls: true,
      touchControls: false,
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

    return () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [canUseVanta, vantaReady]);

  return (
    <>
      <div ref={containerRef} aria-hidden="true" className={`vanta-clouds-fallback ${className}`} />
      {canUseVanta && (
        <Script id="three-clouds" src={threeUrl} strategy="lazyOnload" onReady={() => setThreeReady(true)} />
      )}
      {canUseVanta && threeReady && (
        <Script id="vanta-clouds" src={vantaUrl} strategy="lazyOnload" onReady={() => setVantaReady(true)} />
      )}
    </>
  );
}
