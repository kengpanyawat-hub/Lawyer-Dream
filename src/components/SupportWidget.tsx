'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { QUICK_REPLIES, getBotReply } from '@/config/botFaq'
import { SUPPORT_LINKS, SupportLinkKind } from '@/config/supportLinks'
import { CONTACT } from '@/data/contact'
import {
  MessageCircle, Phone, Mail, MapPin, Globe, SendHorizonal, Sparkles
} from 'lucide-react'

/** ไอคอนตามชนิดลิงก์ */
function LinkIcon({ kind, className }: { kind: SupportLinkKind; className?: string }) {
  const common = 'h-4 w-4'
  if (kind === 'tel')  return <Phone className={clsx(common, className)} />
  if (kind === 'mail') return <Mail  className={clsx(common, className)} />
  if (kind === 'map')  return <MapPin className={clsx(common, className)} />
  if (kind === 'web')  return <Globe className={clsx(common, className)} />
  if (kind === 'line') {
    return (
      <svg viewBox="0 0 48 48" fill="currentColor" className={clsx(common, className)}>
        <path d="M39.6 8.4C36.8 5.6 32.6 4 28 4H20C11.2 4 4 10 4 17.6c0 5.5 3.9 10.2 9.6 12.5-.2.8-1.2 4.4-1.3 5-.2.9.3 1.1 1 1 .8-.1 5.1-3.4 5.9-3.9 2.4.4 4.8.5 7.3.2 8.8-1.2 15.5-7.9 15.5-15.8 0-4.3-1.8-7.9-5.4-10.2z"/>
      </svg>
    )
  }
  // CTA
  return <MessageCircle className={clsx(common, className)} />
}

type Msg = { role: 'user'|'bot'; text: string }

export default function SupportWidget(){
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'links'|'bot'>('links')
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState<Msg[]>([{
    role: 'bot',
    text: 'ต้องการความช่วยเหลือด้านกฎหมายเรื่องใด? เลือก “ลิงก์ด่วน” หรือพิมพ์คำถาม เช่น “ค่าบริการ”, “นัดหมายพบทนาย”, “เอกสารที่ต้องเตรียม”'
  }])
  const panelRef = useRef<HTMLDivElement>(null)

  // คลิกนอกกล่องเพื่อปิด
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  async function sendText(text: string){
    const t = text.trim()
    if(!t) return
    setMessages(m => [...m, { role: 'user', text: t }])
    setMsg('')
    await new Promise(r => setTimeout(r, 160))
    const reply = getBotReply(t)
    setMessages(m => [...m, { role: 'bot', text: reply }])
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={()=>setOpen(v=>!v)}
        className="fixed z-[9999] bottom-5 right-5 h-14 w-14 rounded-full
                   bg-primary-600 hover:bg-primary-700 text-white shadow-lg
                   flex items-center justify-center transition"
        aria-label="เปิดวิดเจ็ตช่วยเหลือ"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          onWheelCapture={(e)=>e.stopPropagation()}
          className="fixed z-[9999] bottom-24 right-5 w-[360px] max-w-[88vw]
                     rounded-2xl overflow-hidden border border-white/30
                     bg-white/90 backdrop-blur-xl shadow-2xl"
        >
          {/* Header */}
          <div className="relative p-4 bg-gradient-to-r from-primary-600/20 to-primary-400/10 border-b border-white/40">
            <div className="text-lg font-semibold flex items-center gap-2 text-primary-900">
              <Sparkles className="h-5 w-5 text-primary-600" />
              สำนักกฎหมายดลวัฒน์และเพื่อน
            </div>
            <div className="text-xs text-slate-600">
              โทร {CONTACT.phone} · LINE {CONTACT.lineOfficial}
            </div>
            <button
              onClick={()=>setOpen(false)}
              className="absolute right-3 top-3 p-1 rounded-md hover:bg-black/5"
              aria-label="ปิด"
            >
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="px-2 pt-2">
            <div className="mx-2 bg-white/60 rounded-full p-1 flex border border-white/70">
              <button
                onClick={()=>setTab('links')}
                className={clsx('flex-1 rounded-full py-2 text-sm font-medium',
                  tab==='links' ? 'bg-primary-600 text-white' : 'text-primary-800 hover:text-primary-900')}
              >ลิงก์ด่วน</button>
              <button
                onClick={()=>setTab('bot')}
                className={clsx('flex-1 rounded-full py-2 text-sm font-medium',
                  tab==='bot' ? 'bg-primary-600 text-white' : 'text-primary-800 hover:text-primary-900')}
              >แชตบอท</button>
            </div>
          </div>

          {/* Body */}
          <div className="p-3">
            {tab==='links' ? (
              <div className="grid grid-cols-2 gap-3">
                {SUPPORT_LINKS.map((l)=>(
                  <Link
                    key={l.href+l.label}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    className="group rounded-xl p-3 border border-white/60 bg-white/70 hover:bg-white
                               inline-flex items-center gap-2 transition"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <LinkIcon kind={l.kind} />
                    </span>
                    <span className="font-medium text-primary-900">{l.label}</span>
                  </Link>
                ))}
                <div className="col-span-2 text-xs text-slate-600 mt-1">
                  * ข้อมูลติดต่ออย่างเป็นทางการของสำนักกฎหมาย
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-[400px]" onWheelCapture={(e)=>e.stopPropagation()}>
                <div className="flex gap-2 flex-wrap mb-2">
                  {QUICK_REPLIES.map((q)=>(
                    <button key={q} onClick={()=>sendText(q)}
                            className="text-xs rounded-full px-3 py-1 bg-white/70 hover:bg-white border border-white/60">
                      {q}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {messages.map((m,i)=>(
                    <div key={i}
                         className={clsx('max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap',
                           m.role==='user'
                             ? 'ml-auto bg-primary-600 text-white'
                             : 'bg-white/70 border border-white/60 text-slate-800')}>
                      {m.text}
                    </div>
                  ))}
                </div>

                <form className="mt-2 flex items-center gap-2"
                      onSubmit={(e)=>{ e.preventDefault(); void sendText(msg) }}>
                  <input
                    value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="พิมพ์คำถาม…"
                    className="flex-1 rounded-xl bg-white/70 border border-white/60 px-3 py-2 text-sm outline-none focus:border-primary-500/60"
                  />
                  <button type="submit"
                          className="rounded-xl bg-primary-600 hover:bg-primary-700 px-3 py-2 text-sm font-medium inline-flex items-center gap-1 text-white">
                    ส่ง <SendHorizonal className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
