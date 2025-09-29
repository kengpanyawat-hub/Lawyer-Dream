'use client'

import ExpertiseGrid from '@/components/sections/ExpertiseGrid'
import Link from 'next/link'
import { BadgeCheck, Phone, MessageCircle } from 'lucide-react'
import { CONTACT } from '@/data/contact'

export default function ExpertisePage() {
  return (
    <div className="relative space-y-8">
      {/* ฟองไล่สีพื้นหลังให้ดูเป็น glassmorphism */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-10 w-[440px] h-[440px] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 right-0 w-[540px] h-[540px] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />

      {/* HERO */}
      <section className="relative rounded-3xl glass-deep ring-1 ring-white/40 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
          <BadgeCheck className="h-4 w-4 text-primary-600" />
          ทีมทนายเฉพาะทาง • กลยุทธ์ชัดเจน • รายงานคืบหน้าสม่ำเสมอ
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">ความเชี่ยวชาญ</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          ครอบคลุมกฎหมายแพ่ง–อาญา–ธุรกิจ–แรงงาน–ภาษี รวมถึงงานนิติกรรมสัญญาและทรัพย์สินทางปัญญา
          เราวิเคราะห์ข้อเท็จจริงและกฎหมายเพื่อวางแผนดำเนินคดีหรือเอกสารให้ตรงเป้าหมายที่สุด
        </p>

        {/* CTA bar */}
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`tel:${CONTACT.phone}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 text-white px-4 py-2"
          >
            <Phone className="h-4 w-4" /> โทร {CONTACT.phone}
          </a>
          <a
            href={`https://line.me/R/ti/p/%40${(CONTACT.lineOfficial ?? '@128rwwqd').replace('@','')}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-800 px-4 py-2 ring-1 ring-slate-200"
          >
            <MessageCircle className="h-4 w-4" /> เพิ่มเพื่อน LINE
          </a>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-800 px-4 py-2 ring-1 ring-slate-200"
          >
            ดูบริการทั้งหมด
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="relative">
        <ExpertiseGrid />
      </section>

      {/* NOTE/SEO block */}
      <section className="relative rounded-2xl bg-white/80 ring-1 ring-slate-200 p-5 md:p-6">
        <h2 className="text-lg font-semibold">หมายเหตุ</h2>
        <p className="mt-2 text-slate-700 leading-relaxed">
          หากไม่แน่ใจว่ากรณีของท่านอยู่ในหมวดใด สามารถส่งรายละเอียดเบื้องต้นมาให้เราพิจารณาได้
          ทีมทนายจะช่วยวิเคราะห์ลักษณะคดีและแนะนำแนวทางที่เหมาะสม รวมถึงประเมินเวลาและค่าใช้จ่ายคร่าว ๆ
          ก่อนเริ่มดำเนินการเสมอ
        </p>
      </section>
    </div>
  )
}
