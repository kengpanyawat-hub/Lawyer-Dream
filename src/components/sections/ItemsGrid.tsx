'use client'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { CalendarDays, Tag, Banknote } from 'lucide-react'
import React from 'react'

/** รองรับฟิลด์เนื้อหาหลายแบบที่อาจพบในฐานข้อมูลจริง */
type AnyItem = {
  slug: string
  title: string
  date: string
  tags?: string[]
  image?: string
  excerpt?: string

  // เนื้อหาหลัก (ชุดเดิม)
  content?: string
  contentHtml?: string

  // ฟิลด์ที่พบบ่อยในบางรายการ
  body?: string
  description?: string
  details?: string
  longContent?: string
  fullText?: string

  // โครงแบบเป็น array/sections
  sections?: Array<{ title?: string; content?: string; items?: string[] }>
  points?: string[]
  bullets?: string[]
  contentBlocks?: Array<string | { heading?: string; text?: string; list?: string[] }>
}

export default function ItemsGrid({
  items,
  kind
}: {
  items: AnyItem[]
  kind: 'blog' | 'portfolio'
}) {
  const [open, setOpen] = useState<AnyItem | null>(null)

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <Card key={it.slug} className="rounded-3xl glass-soft ring-1 ring-white/40 hover:shadow-xl transition">
          <div className="flex flex-col gap-3 p-4">
            {/* ภาพหน้าการ์ด — แสดงเฉพาะภายนอก */}
            {it.image && (
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />
              </div>
            )}

            {/* meta */}
            <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
              <CalendarDays size={14} />
              <span>{it.date}</span>
              {!!it.tags?.length && (
                <>
                  <span className="opacity-40">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Tag size={12} /> {it.tags.join(', ')}
                  </span>
                </>
              )}
            </div>

            {/* title & excerpt */}
            <div>
              <h3 className="text-lg font-semibold leading-snug">{it.title}</h3>
              {it.excerpt && <p className="mt-1 text-sm text-slate-700 line-clamp-3">{it.excerpt}</p>}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <button
                className="w-full rounded-xl bg-primary-600 text-white px-3 py-2 text-sm"
                onClick={() => setOpen(it)}
              >
                ดูรายละเอียด
              </button>
            </div>
          </div>
        </Card>
      ))}

      {/* ป็อปอัป: ไม่มีรูป เพื่อให้เนื้อหาเต็มอ่านง่ายและ “ไม่ถูกตัด” */}
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ''}>
        {open && (
          <article className="space-y-6">
            {/* แถบข้อมูลสรุป */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-primary-700 ring-1 ring-primary-200">
                <CalendarDays size={14} /> {open.date}
              </span>
              {open.tags?.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 ring-1 ring-slate-200"
                >
                  <Tag size={12} /> {t}
                </span>
              ))}
            </div>

            {/* คำนำ (ถ้ามี) */}
            {open.excerpt && (
              <p className="text-slate-800 leading-relaxed bg-white/90 ring-1 ring-slate-200 rounded-xl px-4 py-3">
                {open.excerpt}
              </p>
            )}

            {/* กล่องจำนวนเงิน (ถ้ามี "จำนวนเงิน: ...") */}
            {(() => {
              const amt = inferAmount(coerceText(open))
              if (!amt) return null
              return (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Banknote size={16} className="text-primary-600" />
                    จำนวนเงิน: <span className="font-semibold">{amt}</span>
                  </div>
                </div>
              )
            })()}

            {/* เนื้อหาเต็ม: แสดงให้ครบ */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm px-5 py-5 max-h-[70vh] overflow-y-auto overscroll-contain">
              <FullContent item={open} />
            </div>

            {/* หมายเหตุ */}
            <p className="text-xs text-slate-600">
              * ข้อมูลนี้เผยแพร่เพื่อให้ความรู้ทั่วไป ไม่ใช่คำปรึกษาทางกฎหมายเฉพาะกรณี
            </p>
          </article>
        )}
      </Modal>
    </div>
  )
}

/* =========================
   Utilities & Renderers
========================= */

function inferAmount(txt?: string) {
  if (!txt) return null
  const m = txt.match(/^\s*จำนวนเงิน\s*[:：]\s*(.+)$/im)
  return m?.[1]?.trim() ?? null
}

/** รวมทุกฟิลด์ที่น่าจะเป็น “ข้อความ” เข้าเป็น content เดียว (สำหรับค้นหา/ตรวจจำนวนเงิน) */
function coerceText(i?: AnyItem) {
  if (!i) return ''
  const chunks: string[] = []

  // 1) ถ้ามี HTML แยกแท็กออกให้เหลือข้อความ (สำหรับค้นหา/แสดงจำนวนเงิน)
  if (i.contentHtml) {
    const noTag = i.contentHtml.replace(/<[^>]*>/g, ' ')
    chunks.push(noTag)
  }

  // 2) ฟิลด์ข้อความดิบที่เป็นสตริง
  ;['content', 'body', 'description', 'details', 'longContent', 'fullText'].forEach((k) => {
    const v = (i as any)[k]
    if (typeof v === 'string' && v.trim()) chunks.push(v)
  })

  // 3) sections / points / bullets / contentBlocks
  if (Array.isArray(i.sections)) {
    i.sections.forEach((s) => {
      if (s.title) chunks.push(`# ${s.title}`)
      if (s.content) chunks.push(s.content)
      if (Array.isArray(s.items)) chunks.push(...s.items.map((x) => `- ${x}`))
    })
  }
  if (Array.isArray(i.points)) chunks.push(...i.points.map((x) => `- ${x}`))
  if (Array.isArray(i.bullets)) chunks.push(...i.bullets.map((x) => `- ${x}`))
  if (Array.isArray(i.contentBlocks)) {
    i.contentBlocks.forEach((b) => {
      if (typeof b === 'string') chunks.push(b)
      else {
        if (b.heading) chunks.push(`# ${b.heading}`)
        if (b.text) chunks.push(b.text)
        if (Array.isArray(b.list)) chunks.push(...b.list.map((x) => `- ${x}`))
      }
    })
  }

  return chunks.join('\n').trim()
}

/** คืนค่า HTML เต็มถ้ามี (ใช้เรนเดอร์ตรง) */
function pickHtml(i?: AnyItem) {
  if (!i) return ''
  // เผื่อบางรายการฝัง HTML ไว้ใน description/details
  const candidates = [i.contentHtml, (i as any).html, i.description, i.details, i.longContent, i.fullText]
  return candidates.find((x) => typeof x === 'string' && /<\/?[a-z][\s\S]*>/i.test(x)) || ''
}

/** ถ้าไม่มี HTML ให้สร้าง rich text จากฟิลด์ต่าง ๆ */
function pickPlain(i?: AnyItem) {
  if (!i) return ''
  const t = coerceText(i)
  if (t) return t
  // สุดท้ายจริง ๆ: ไม่มีอะไรเลย
  return ''
}

/** เรนเดอร์เนื้อหาเต็ม: ให้ความสำคัญกับ HTML ก่อน จากนั้น rich text และสุดท้ายคือ RAW */
function FullContent({ item }: { item: AnyItem }) {
  const html = useMemo(() => pickHtml(item), [item])
  const text = useMemo(() => pickPlain(item), [item])

  if (html) {
    return (
      <div
        className="prose prose-slate max-w-none prose-headings:scroll-mt-24"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  if (text) {
    return <RichText text={text} />
  }

  // RAW fallback — เพื่อให้มั่นใจว่า “ไม่หาย”
  return (
    <pre className="text-xs whitespace-pre-wrap text-slate-700">
      — ไม่มีเนื้อหาในรายการนี้ —
    </pre>
  )
}

/**
 * RichText:
 * - เคารพบรรทัดเดิม (ไม่ตัด)
 * - รองรับหัวข้อ #, ##, ### / คีย์:ค่า / ลิสต์ -,•,* และ 1. 2.
 */
function RichText({ text }: { text: string }) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  const blocks: React.ReactNode[] = []
  let ulist: string[] = []
  let olist: string[] = []

  const flushU = () => {
    if (!ulist.length) return
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc pl-5 space-y-1">
        {ulist.map((l, i) => <li key={i}>{l.replace(/^[-•*]\s+/, '')}</li>)}
      </ul>
    )
    ulist = []
  }
  const flushO = () => {
    if (!olist.length) return
    blocks.push(
      <ol key={`ol-${blocks.length}`} className="list-decimal pl-5 space-y-1">
        {olist.map((l, i) => <li key={i}>{l.replace(/^\d+[.)]\s+/, '')}</li>)}
      </ol>
    )
    olist = []
  }
  const flushLists = () => { flushU(); flushO() }

  lines.forEach((raw) => {
    const l = raw.trim()

    // lists
    if (/^[-•*]\s+/.test(l)) { flushO(); ulist.push(l); return }
    if (/^\d+[.)]\s+/.test(l)) { flushU(); olist.push(l); return }

    // blank line
    if (l === '') { flushLists(); blocks.push(<div key={`sp-${blocks.length}`} className="h-2" />); return }

    // headings
    if (/^###\s+/.test(l)) { flushLists(); blocks.push(<h4 key={`h4-${blocks.length}`} className="text-base font-semibold">{l.replace(/^###\s+/, '')}</h4>); return }
    if (/^##\s+/.test(l))  { flushLists(); blocks.push(<h3 key={`h3-${blocks.length}`} className="text-lg font-semibold">{l.replace(/^##\s+/, '')}</h3>); return }
    if (/^#\s+/.test(l))   { flushLists(); blocks.push(<h2 key={`h2-${blocks.length}`} className="text-xl font-bold">{l.replace(/^#\s+/, '')}</h2>); return }

    // key: value
    const kv = l.match(/^(.+?)\s*[:：]\s*(.+)$/)
    if (kv) {
      flushLists()
      blocks.push(
        <p key={`kv-${blocks.length}`} className="leading-relaxed">
          <span className="font-semibold">{kv[1]}:</span> {kv[2]}
        </p>
      )
      return
    }

    // normal paragraph — preserve as-is
    flushLists()
    blocks.push(<p key={`p-${blocks.length}`} className="leading-relaxed whitespace-pre-wrap">{l}</p>)
  })

  flushLists()
  return <div className="prose prose-slate max-w-none">{blocks}</div>
}
