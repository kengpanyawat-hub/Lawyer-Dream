// src/app/(site)/about/page.tsx
'use client'

import Card from '@/components/ui/Card'
import Image from 'next/image'
import { LAWYER } from '@/data/about'
import { CONTACT } from '@/data/contact'
import {
  Mail, Phone, MessageCircle, MapPin, Award, CheckCircle2, ShieldCheck,
  BadgeCheck, Scale, Landmark, BookText, IdCard
} from 'lucide-react'
import React from 'react'

/* ----------------------------------------------------------
   Page
---------------------------------------------------------- */
export default function AboutPage() {
  // เหตุผลที่ลูกค้าเลือกเรา
  const REASONS: string[] = [
    'ประเมินเคสเบื้องต้นชัดเจน พร้อมทางเลือกทางกฎหมาย',
    'ตอบกลับไว ภายใน 24 ชั่วโมงทำการ',
    'โครงค่าบริการโปร่งใส แจ้งก่อนเริ่มดำเนินการ',
    'เชี่ยวชาญคดีแพ่ง–อาญา–ผู้บริโภค–ครอบครัว–บังคับคดี',
    'รายงานความคืบหน้าเป็นระยะ ผ่านโทรศัพท์/LINE/อีเมล',
    'รักษาความลับลูกค้าเป็นสำคัญ ตามจรรยาบรรณวิชาชีพ',
  ]

  // สมาชิกภาพ/ใบอนุญาต (ถ้ามีเลขสมาชิกจริง สามารถเติมใน subtitle ได้)
  const MEMBERSHIPS: { icon: React.ReactNode; title: string; subtitle?: string }[] = [
    { icon: <IdCard className="h-5 w-5 text-primary-600" />, title: 'ทนายความรับอนุญาต', subtitle: 'สังกัดสภาทนายความ' },
    { icon: <Scale className="h-5 w-5 text-primary-600" />, title: 'ที่ปรึกษากฎหมายในศาลเยาวชนและครอบครัว' },
    { icon: <Landmark className="h-5 w-5 text-primary-600" />, title: 'ผ่านหลักสูตรวิชาว่าความ', subtitle: 'สำนักฝึกอบรมวิชาว่าความแห่งสภาทนายความ' },
    { icon: <BookText className="h-5 w-5 text-primary-600" />, title: 'นิติศาสตรบัณฑิต', subtitle: 'มหาวิทยาลัยรามคำแหง' },
  ]

  // FAQ — ปรับแก้ข้อความได้ตามบริการจริง
  const FAQ = [
    {
      q: 'ต้องเตรียมเอกสารอะไรบ้างก่อนปรึกษาทนาย?',
      a: [
        'สำเนาบัตรประชาชน/ทะเบียนบ้าน', 'เอกสารคดี เช่น สัญญา หนังสือทวงถาม หมายศาล',
        'หลักฐานการโอนเงิน/รูปภาพ/แชต/อีเมลที่เกี่ยวข้อง',
      ],
    },
    {
      q: 'ค่าบริการคิดอย่างไร?',
      a: [
        'มีทั้งแบบเหมาเคส/ตามขั้นตอน/รายชั่วโมง ขึ้นกับลักษณะงาน',
        'เราจะแจ้งโครงค่าบริการล่วงหน้าอย่างชัดเจนก่อนเริ่มงาน',
      ],
    },
    {
      q: 'คดีใช้เวลานานแค่ไหน?',
      a: [
        'ขึ้นกับประเภทคดีและปริมาณพยานหลักฐาน',
        'คดีไกล่เกลี่ยมักจบเร็วกว่า ส่วนคดีศาลอาจใช้ตั้งแต่ไม่กี่เดือนถึงมากกว่า 1 ปี',
      ],
    },
    {
      q: 'สามารถนัดหมายปรึกษาออนไลน์ได้หรือไม่?',
      a: [
        'ได้ เรารองรับการปรึกษาทางโทรศัพท์/วิดีโอคอล/LINE',
        `ติดต่อ: โทร ${CONTACT.phone} หรือ LINE ${CONTACT.lineOfficial}`,
      ],
    },
    {
      q: 'รับคดีทั่วประเทศหรือไม่?',
      a: ['ให้บริการทั่วราชอาณาจักร และสามารถมอบหมายทนายท้องถิ่นร่วมดำเนินการตามความเหมาะสม'],
    },
  ]

  return (
    <div className="relative">
      {/* บับเบิลไล่สี */}
      <div aria-hidden className="pointer-events-none absolute -top-20 -left-10 w-[420px] h-[420px] rounded-full blur-3xl opacity-60 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-50 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />

      {/* HERO: แนะนำสำนักงาน + ภาพ */}
      <section className="space-y-6">
        <Card className="relative overflow-hidden ring-1 ring-white/40 glass-deep rounded-3xl">
          <div className="grid gap-10 lg:grid-cols-[1.6fr,1fr] items-start">
            {/* LEFT : text */}
            <div className="p-4 md:p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                <ShieldCheck className="h-4 w-4 text-primary-600" />
                สำนักกฎหมายดลวัฒน์และเพื่อน (ท.ดรีม)
              </div>

              <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                เกี่ยวกับเรา
              </h1>
              <p className="mt-4 text-slate-700 leading-relaxed">
                {LAWYER.bio}
              </p>

              {/* quick stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Stat label="พื้นที่ให้บริการ" value={CONTACT.serviceArea ?? 'ทั่วราชอาณาจักร'} />
                <Stat label="สายด่วน" value={CONTACT.phone} />
                <Stat label="LINE Official" value={CONTACT.lineOfficial ?? '@128rwwqd'} />
              </div>

              {/* Education */}
              <div className="mt-8">
                <SectionTitle icon={<Award className="h-5 w-5 text-primary-600" />} title="ประวัติการศึกษาและประกาศนียบัตร" />
                <ul className="mt-4 space-y-2">
                  {LAWYER.education.map((e: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-800">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-primary-600 shrink-0" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise / Services */}
              <div className="mt-8">
                <SectionTitle icon={<ShieldCheck className="h-5 w-5 text-primary-600" />} title="บริการเฉพาะทาง" />
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {LAWYER.service.map((s: string, i: number) => (
                    <li key={i} className="rounded-xl bg-white/70 ring-1 ring-slate-200 px-3 py-2 text-slate-800">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact bar */}
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <a href={`tel:${CONTACT.phone}`} className="btn-ghost">
                  <Phone className="h-4 w-4" />
                  โทร {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="btn-ghost">
                  <Mail className="h-4 w-4" />
                  {CONTACT.email}
                </a>
                <a
                  href={`https://line.me/R/ti/p/%40${(CONTACT.lineOfficial ?? '@128rwwqd').replace('@','')}`}
                  target="_blank" className="btn-ghost"
                >
                  <MessageCircle className="h-4 w-4" />
                  LINE {CONTACT.lineOfficial}
                </a>
                <a href={CONTACT.mapOpen ?? '#'} target="_blank" className="btn-ghost">
                  <MapPin className="h-4 w-4" />
                  เปิดแผนที่สำนักงาน
                </a>
              </div>
            </div>

            {/* RIGHT : portrait card */}
            <div className="p-4 md:p-6">
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/50 shadow-xl bg-white/60">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 via-transparent to-white/40 pointer-events-none" />
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/lawyer-portrait.jpg"
                    alt="ทนายดลวัฒน์ ไชยศรีหา (ท.ดรีม)"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="rounded-2xl bg-white/85 backdrop-blur-md px-4 py-3 ring-1 ring-slate-200 shadow-lg">
                    <p className="text-base font-semibold text-slate-900">ทนายดลวัฒน์ ไชยศรีหา (ท.ดรีม)</p>
                    <p className="text-xs text-slate-600">ทนายความผู้ว่าความคดีหลากหลายประเภท</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* เหตุผลที่ลูกค้าเลือกเรา */}
      <section className="mt-8">
        <Card className="rounded-3xl glass-soft ring-1 ring-white/40">
          <div className="p-6">
            <SectionTitle icon={<BadgeCheck className="h-5 w-5 text-primary-600" />} title="เหตุผลที่ลูกค้าเลือกเรา" />
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {REASONS.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-primary-600 shrink-0" />
                  <span className="text-slate-800">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      {/* ใบอนุญาต/สมาชิกภาพ */}
      <section className="mt-8">
        <Card className="rounded-3xl glass-soft ring-1 ring-white/40">
          <div className="p-6">
            <SectionTitle icon={<IdCard className="h-5 w-5 text-primary-600" />} title="ใบอนุญาต/สมาชิกภาพทางวิชาชีพ" />
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MEMBERSHIPS.map((m, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/70 ring-1 ring-slate-200 px-4 py-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 ring-1 ring-primary-200">
                    {m.icon}
                  </span>
                  <div>
                    <div className="font-medium text-slate-900">{m.title}</div>
                    {m.subtitle && <div className="text-xs text-slate-600">{m.subtitle}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <Card className="rounded-3xl glass-soft ring-1 ring-white/40">
          <div className="p-6">
            <SectionTitle icon={<BookText className="h-5 w-5 text-primary-600" />} title="คำถามที่พบบ่อย (FAQ)" />
            <div className="mt-4 space-y-3">
              {FAQ.map((f, idx) => (
                <details key={idx} className="group rounded-2xl bg-white/70 ring-1 ring-slate-200 p-4 open:shadow-sm">
                  <summary className="cursor-pointer list-none font-medium text-slate-900 flex items-center justify-between">
                    <span>{f.q}</span>
                    <span className="ml-3 text-slate-500 group-open:rotate-180 transition">⌄</span>
                  </summary>
                  <div className="mt-3 text-slate-700 leading-relaxed">
                    <ul className="list-disc pl-5 space-y-1">
                      {f.a.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Card>

        {/* FAQ Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a.join('<br/>') },
              })),
            }),
          }}
        />
      </section>
    </div>
  )
}

/* ---------- small UI helpers ---------- */
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 ring-1 ring-primary-200">
        {icon}
      </span>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-slate-200 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-base font-semibold text-slate-900">{value}</p>
    </div>
  )
}
