'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

type Props = { children: React.ReactNode };

export default function LenisProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // ปิดบน reduced-motion หรือถ้าเป็น iOS/มือถือบางรุ่นที่หน่วง
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      // ค่าที่ลื่นแต่ไม่หน่วง touchpad
      duration: 0.9,      // 0.8–1.0 กำลังพอดี
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false, // true จะนุ่มแต่หน่วงบนมือถือ
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
      // syncTouch: false (ค่าดีฟอลต์), infinite: false
    });
    lenisRef.current = lenis;

    let running = true;
    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // หยุดเมื่อแท็บไม่โฟกัส ลดภาระ CPU/GPU
    const onVisibility = () => {
      const visible = document.visibilityState === 'visible';
      running = visible;
      if (visible) {
        rafRef.current = requestAnimationFrame(raf);
      } else if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    document.addEventListener('visibilitychange', onVisibility, { passive: true });

    // ปิดเมื่อ unmount
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
