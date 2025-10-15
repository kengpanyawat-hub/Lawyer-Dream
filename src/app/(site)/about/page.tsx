'use client';

import Card from '@/components/ui/Card';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { LAWYER } from '@/data/about';
import { CONTACT } from '@/data/contact';
import { EVENTS, formatThaiDate } from '@/data/events';
import {
  Mail, Phone, MessageCircle, MapPin, Award, CheckCircle2, ShieldCheck,
  BadgeCheck, Scale, Landmark, BookText, IdCard, ArrowRight
} from 'lucide-react';

/* ---------- helpers ---------- */
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 ring-1 ring-primary-200">{icon}</span>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-slate-200 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}

/* ---------- กริดข่าว: แยกเป็นคอมโพเนนต์เพื่อใช้ useInView ได้ถูกต้อง ---------- */
function AutoLoadGrid({ items }: { items: typeof EVENTS }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <div ref={ref} className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((ev, i) => (
        <Card key={ev.slug} className="overflow-hidden">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
            <Image
              src={ev.image}
              alt={ev.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 360px"
              priority={inView && i < 6}        // เห็นบล็อกแล้ว ดัน 6 ใบแรกให้โหลดทันที
              loading={inView ? 'eager' : 'lazy'}
            />
          </div>
          <div className="mt-3 space-y-2">
            <h3 className="font-semibold line-clamp-2">{ev.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-2">{ev.excerpt}</p>
            <div className="text-xs text-slate-500">{formatThaiDate(ev.date)}</div>
            <Link href={`/events/${ev.slug}`} className="inline-flex text-primary-700 hover:underline text-sm">อ่านต่อ</Link>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */
export default function AboutPage() {
  // คอนเทนต์เดิม (สรุปให้สั้นเพื่อโฟกัสที่บล็อกข่าว)
  const REASONS: string[] = [
    'ประเมินเคสเบื้องต้นชัดเจน พร้อมทางเลือกทางกฎหมาย',
    'ตอบกลับไว ภายใน 24 ชั่วโมงทำการ',
    'โครงค่าบริการโปร่งใส แจ้งก่อนเริ่มดำเนินการ',
    'เชี่ยวชาญคดีแพ่ง–อาญา–ผู้บริโภค–ครอบครัว–บังคับคดี',
    'รายงานความคืบหน้าเป็นระยะ ผ่านโทรศัพท์/LINE/อีเมล',
    'รักษาความลับลูกค้าเป็นสำคัญ ตามจรรยาบรรณวิชาชีพ',
  ];
  const MEMBERSHIPS = [
    { icon: <IdCard className="h-5 w-5 text-primary-600" />, title: 'ทนายความรับอนุญาต', subtitle: 'สังกัดสภาทนายความ' },
    { icon: <Scale className="h-5 w-5 text-primary-600" />, title: 'ที่ปรึกษากฎหมายในศาลเยาวชนและครอบครัว' },
    { icon: <Landmark className="h-5 w-5 text-primary-600" />, title: 'ผ่านหลักสูตรวิชาว่าความ', subtitle: 'สำนักฝึกอบรมวิชาว่าความแห่งสภาทนายความ' },
    { icon: <BookText className="h-5 w-5 text-primary-600" />, title: 'นิติศาสตรบัณฑิต', subtitle: 'มหาวิทยาลัยรามคำแหง' },
  ];

  /* ---------- ข่าวสารและกิจกรรม ---------- */
  const CATEGORIES = useMemo(() => ([
    'กิจกรรม','ข่าวนิติ','ประชุม/สัมมนา/อบรม','การศึกษา','จัดซื้อจัดจ้าง','รับสมัครบุคลากร'
  ] as const), []);
  // ✅ ตั้งค่าเริ่มต้นเป็นหมวดแรก
  const [activeCat, setActiveCat] = useState<(typeof CATEGORIES)[number]>(() => CATEGORIES[0]);
  const filtered = useMemo(
    () => EVENTS.filter(e => e.category === activeCat).slice(0, 8),
    [activeCat]
  );

  return (
    <div className="relative">
      {/* บับเบิลพื้นหลังเดิม */}
      <div aria-hidden className="pointer-events-none absolute -top-20 -left-10 w-[420px] h-[420px] rounded-full blur-3xl opacity-60 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-50 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />

      {/* HERO (คงโครงเดิมให้สั้น) */}
      <section className="space-y-6">
        <Card className="relative overflow-hidden ring-1 ring-white/40 glass-deep rounded-3xl">
          <div className="grid gap-10 lg:grid-cols-[1.6fr,1fr] items-start">
            <div className="p-4 md:p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                <ShieldCheck className="h-4 w-4 text-primary-600" />
                สำนักกฎหมายดลวัฒน์และเพื่อน
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">เกี่ยวกับเรา</h1>
              <p className="mt-4 text-slate-700 leading-relaxed">{LAWYER.bio}</p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Stat label="พื้นที่ให้บริการ" value={CONTACT.serviceArea ?? 'ทั่วราชอาณาจักร'} />
                <Stat label="สายด่วน" value={CONTACT.phone} />
                <Stat label="LINE Official" value={CONTACT.lineOfficial ?? '@128rwwqd'} />
              </div>

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

              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <a href={`tel:${CONTACT.phone}`} className="btn-ghost"><Phone className="h-4 w-4" />โทร {CONTACT.phone}</a>
                <a href={`mailto:${CONTACT.email}`} className="btn-ghost"><Mail className="h-4 w-4" />{CONTACT.email}</a>
                <a href={`https://line.me/R/ti/p/%40${(CONTACT.lineOfficial ?? '@128rwwqd').replace('@','')}`} target="_blank" className="btn-ghost"><MessageCircle className="h-4 w-4" />LINE {CONTACT.lineOfficial}</a>
                <a href={CONTACT.mapOpen ?? '#'} target="_blank" className="btn-ghost"><MapPin className="h-4 w-4" />เปิดแผนที่สำนักงาน</a>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/50 shadow-xl bg-white/60">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 via-transparent to-white/40 pointer-events-none" />
                <div className="relative aspect-[4/5]">
                  <Image src="/images/lawyer-portrait2.jpg" alt="ทนายดลวัฒน์ ไชยศรีหา (ท.ดรีม)" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" priority />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* เหตุผล/สมาชิกภาพ (ย่อ) */}
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

      {/* ✅ ข่าวสารและกิจกรรม — แสดงหมวดแรกทันที */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">ข่าวสารและกิจกรรม</h2>
          <Link href="/events" className="inline-flex items-center gap-2 text-sm text-primary-700 hover:underline">
            ข่าวทั้งหมด <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-xl text-sm ring-1 ring-slate-200 ${activeCat === c ? 'bg-primary-600 text-white' : 'bg-white/70 hover:bg-white'}`}
                aria-pressed={activeCat === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* กริดข่าว: ใช้คอมโพเนนต์ที่ทำ eager เมื่อเห็น */}
        <AutoLoadGrid items={filtered} />
      </section>
    </div>
  );
}
