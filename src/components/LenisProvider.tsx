'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

type Props = { children: React.ReactNode };

export default function LenisProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // ปิดเอฟเฟกต์ถ้าผู้ใช้ตั้งค่าลดแอนิเมชัน
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // แทนที่ smoothTouch ด้วยตัวเลือกที่มีจริงใน type ปัจจุบัน
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    let running = true;
    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // หยุด/เริ่ม animation เมื่อแท็บโฟกัส/ไม่โฟกัส
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

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
