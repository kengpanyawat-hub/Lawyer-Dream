'use client'

import LawGrid from '@/components/sections/LawGrid'
import { BadgeCheck } from 'lucide-react'

export default function LawPage() {
  return (
    <div className="relative space-y-8">
      {/* ฟองไล่สีพื้นหลัง */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-10 w-[440px] h-[440px] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 right-0 w-[540px] h-[540px] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />

      {/* HERO */}
      <section className="relative rounded-3xl glass-deep ring-1 ring-white/40 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
          <BadgeCheck className="h-4 w-4 text-primary-600" />
          บทความความรู้กฎหมายทั่วไป • ไม่ใช่คำปรึกษาเฉพาะกรณี
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">กฎหมายที่ควรรู้</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          สรุปหัวข้อกฎหมายสำคัญที่ประชาชนควรทราบ จัดรูปแบบให้อ่านง่าย เป็นขั้นตอน และ
          มี “หมายเหตุ/ข้อควรระวัง” เพื่อให้ใช้งานได้จริงในชีวิตประจำวัน
        </p>
      </section>

      {/* GRID */}
      <section className="relative">
        <LawGrid />
      </section>
    </div>
  )
}
