'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => { /* Lenis cleans up internally */ }
  }, [])
}
