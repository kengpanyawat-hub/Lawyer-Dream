'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  // ปิดด้วย Esc
  useEffect(() => {
    function onKey(e: KeyboardEvent){ if(e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // 🔒 ล็อกสกอร์ลพื้นหลัง + กัน layout shift จากสกอร์ลบาร์
  useEffect(() => {
    if (!open) return
    const body = document.body
    const html = document.documentElement
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    const scrollbarW = window.innerWidth - html.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`

    // ⛔️ หยุด Lenis ถ้ามี และป้องกัน scroll พื้นหลัง
    const anyWin = window as any
    const lenis = anyWin.lenis || anyWin.__lenis
    try { lenis?.stop?.() } catch {}

    // block wheel/touch ที่นอก panel (กัน scroll ทะลุ)
    const blockIfOutside = (e: Event) => {
      const target = e.target as Node
      if (panelRef.current && !panelRef.current.contains(target)) {
        e.preventDefault()
      }
    }
    document.addEventListener('wheel', blockIfOutside, { passive: false })
    document.addEventListener('touchmove', blockIfOutside, { passive: false })

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
      try { lenis?.start?.() } catch {}
      document.removeEventListener('wheel', blockIfOutside as EventListener)
      document.removeEventListener('touchmove', blockIfOutside as EventListener)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          aria-modal="true" role="dialog"
          // ป้องกัน Lenis scroll ที่ overlay ทั้งหมด
          data-lenis-prevent
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
            data-lenis-prevent
          />

          {/* Panel */}
          <motion.div
            role="document"
            className="relative w-full max-w-3xl"
            initial={{ y: 16, scale: .98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: .98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            ref={panelRef}
            data-lenis-prevent
          >
            <div className="rounded-2xl bg-white/95 text-slate-800 shadow-2xl ring-1 ring-slate-200 overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 bg-white/95 ring-1 ring-slate-100">
                {title && (
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h3>
                )}
                <button
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                  onClick={onClose} aria-label="ปิด"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body: เลื่อนเฉพาะในโมดัล + กัน scroll chaining */}
              <div className="max-h-[75vh] overflow-y-auto overscroll-contain px-5 pb-5 pt-3" data-lenis-prevent>
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
