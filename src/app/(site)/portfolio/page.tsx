'use client'

import { useMemo, useState } from 'react'
import ItemsGrid from '@/components/sections/ItemsGrid'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'
import { Search, Tag, CalendarDays, Filter } from 'lucide-react'
import Link from 'next/link'

type Item = any; // คงโครงเดิมทุกฟิลด์ ลดการตัดข้อมูล

const getYear = (d: string) => {
  const y = new Date(d).getFullYear()
  return isNaN(y) ? null : y
}

export default function PortfolioPage(){
  const items: Item[] = PORTFOLIO_ITEMS as Item[]

  const allYears = useMemo(() => {
    const s = new Set<number>()
    for (const it of items){ const y = getYear(it?.date); if (y) s.add(y) }
    return [...s].sort((a,b)=>b-a)
  }, [items])

  const allTags = useMemo(() => {
    const s = new Set<string>()
    for (const it of items){ (it?.tags || []).forEach((t:string)=>s.add(t)) }
    return [...s].sort()
  }, [items])

  const total = items.length
  const thisYear = new Date().getFullYear()
  const totalThisYear = items.filter(i => getYear(i?.date) === thisYear).length

  const [q, setQ] = useState('')
  const [year, setYear] = useState<'all'|number>('all')
  const [tag, setTag]   = useState<'all'|string>('all')
  const [sort, setSort] = useState<'new'|'old'>('old')

  const filteredIdx = useMemo(() => {
    const idxs = items.map((_, i) => i)

    const qq = q.trim().toLowerCase()
    let after = idxs
    if (qq) {
      after = after.filter(i => {
        const it = items[i]
        const hay = [
          it?.title, it?.excerpt, it?.content, it?.body, it?.description,
          it?.details, it?.longContent, it?.fullText,
          typeof it?.contentHtml === 'string' ? it.contentHtml.replace(/<[^>]*>/g,' ') : ''
        ].filter(Boolean).join(' ').toLowerCase()
        return hay.includes(qq)
      })
    }

    if (year !== 'all') after = after.filter(i => getYear(items[i]?.date) === year)
    if (tag  !== 'all') after = after.filter(i => Array.isArray(items[i]?.tags) && items[i].tags.includes(tag))

    after = [...after].sort((ai, bi) => {
      const a = new Date(items[ai]?.date).getTime()
      const b = new Date(items[bi]?.date).getTime()
      return sort === 'new' ? b - a : a - b
    })

    return after
  }, [items, q, year, tag, sort])

  const filteredItems = useMemo(() => filteredIdx.map(i => items[i]), [filteredIdx, items])

  return (
    <div className="relative space-y-8">
      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-10 w-[460px] h-[460px] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 right-0 w-[560px] h-[560px] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />

      {/* HERO */}
      <section className="relative rounded-3xl glass-deep ring-1 ring-white/40 p-6 md:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <div className="grow">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">ผลงานของเรา</h1>
            <p className="mt-3 max-w-3xl text-slate-700">
              ตัวอย่างคดีและงานกฎหมายที่ได้ดำเนินการให้ลูกค้า — สรุปอ่านง่าย พร้อมตัวกรองตามปี/หมวด
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">รวม {total} งาน</span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">ปี {thisYear}: {totalThisYear} งาน</span>
            </div>
          </div>
          <div className="shrink-0 self-start">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 text-white px-4 py-2">
              ปรึกษาคดีของคุณ
            </Link>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="relative rounded-2xl bg-white/85 ring-1 ring-slate-200 shadow-sm p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {/* search */}
          <label className="group grid">
            <span className="text-xs font-medium text-slate-600 mb-1">ค้นหา</span>
            <div className="flex items-center gap-2 rounded-xl ring-1 ring-slate-200 bg-white px-3 py-2">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="ยึดทรัพย์, อาญา, ผู้บริโภค ..."
                className="w-full outline-none bg-transparent"
              />
            </div>
          </label>

          {/* tag */}
          <label className="group grid">
            <span className="text-xs font-medium text-slate-600 mb-1">หมวด/แท็ก</span>
            <div className="flex items-center gap-2 rounded-xl ring-1 ring-slate-200 bg-white px-3 py-2">
              <Tag className="h-4 w-4 text-slate-500" />
              <select value={tag} onChange={(e)=>setTag(e.target.value as any)} className="w-full bg-transparent outline-none">
                <option value="all">ทั้งหมด</option>
                {allTags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </label>

          {/* year */}
          <label className="group grid">
            <span className="text-xs font-medium text-slate-600 mb-1">ปี</span>
            <div className="flex items-center gap-2 rounded-xl ring-1 ring-slate-200 bg-white px-3 py-2">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              <select
                value={year as any}
                onChange={(e)=>setYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full bg-transparent outline-none"
              >
                <option value="all">ทั้งหมด</option>
                {allYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </label>

          {/* sort */}
          <label className="group grid">
            <span className="text-xs font-medium text-slate-600 mb-1">เรียงลำดับ</span>
            <div className="flex items-center gap-2 rounded-xl ring-1 ring-slate-200 bg-white px-3 py-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <select value={sort} onChange={(e)=>setSort(e.target.value as any)} className="w-full bg-transparent outline-none">
                <option value="new">ใหม่ล่าสุด → เก่าสุด</option>
                <option value="old">เก่าสุด → ใหม่ล่าสุด</option>
              </select>
            </div>
          </label>
        </div>
      </section>

      {/* GRID */}
      <ItemsGrid items={filteredItems} kind="portfolio" />
    </div>
  )
}
