'use client'

import Card from '@/components/ui/Card'
import { CONTACT } from '@/data/contact'
import { useMemo, useState } from 'react'
import { Phone, Mail, MessageCircle, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')

  // ป้องกัน crash หากไม่มี field บางตัวใน CONTACT
  const info = useMemo(() => ({
    phone: CONTACT?.phone ?? '085-0005009',
    email: CONTACT?.email ?? 'donlawatlaw@gmail.com',
    line: CONTACT?.lineOfficial ?? '@128rwwqd',
    serviceArea: CONTACT?.serviceArea ?? 'ทั่วราชอาณาจักร',
    address: CONTACT?.address ?? '—',
    mapEmbed: CONTACT?.mapEmbed ?? '',
    mapOpen: CONTACT?.mapOpen ?? 'https://maps.google.com',
    officeHours: CONTACT?.officeHours ?? 'ทุกวัน 09:00–18:00 (ยืดหยุ่นนัดพิเศษได้)',
    responseSLA: CONTACT?.responseSLA ?? 'ตอบกลับภายใน 24 ชม.',
  }), [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    // honeypot: ถ้าช่อง company ถูกกรอกให้ยกเลิก
    const honeypot = (form.elements.namedItem('company') as HTMLInputElement)?.value
    if (honeypot) return

    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) { setStatus('success'); form.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative space-y-8">
      {/* ฟองไล่สีพื้นหลัง */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-10 w-[460px] h-[460px] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 right-0 w-[560px] h-[560px] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />

      {/* HERO */}
      <header className="relative">
        <div className="rounded-3xl glass-deep ring-1 ring-white/40 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">ติดต่อเรา</h1>
          <p className="mt-3 text-slate-700 max-w-3xl">
            รับคำปรึกษาเบื้องต้นฟรี นัดหมายพบเพื่อวางแผนคดีหรือเอกสารของท่านอย่างเป็นระบบ
            เราให้ข้อมูลค่าบริการและขั้นตอนอย่างโปร่งใสตั้งแต่แรก
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">
              <ShieldCheck className="h-4 w-4 text-primary-600" /> ข้อมูลลูกค้าเป็นความลับ
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">
              <Clock className="h-4 w-4 text-primary-600" /> {info.responseSLA}
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">
              พื้นที่บริการ: {info.serviceArea}
            </span>
          </div>
        </div>
      </header>

      {/* INFO + MAP */}
      <div className="relative grid gap-6 md:grid-cols-2">
        {/* ช่องทางติดต่อด่วน */}
        <Card className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold">ข้อมูลการติดต่อ</h2>
            <ul className="mt-3 text-sm space-y-1">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-700" />
                โทรศัพท์:&nbsp;<a className="underline-offset-4 hover:underline" href={`tel:${info.phone}`}>{info.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-700" />
                อีเมล:&nbsp;<a className="underline-offset-4 hover:underline" href={`mailto:${info.email}`}>{info.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary-700" />
                LINE Official: <span className="font-medium">{info.line}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-700" />
                เวลาทำการ: {info.officeHours}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">พร้อมให้คำปรึกษา</h3>
            <p className="text-sm mt-1">
              ติดต่อได้ตลอด 24 ชั่วโมง เพื่อรับคำปรึกษาเบื้องต้นฟรี และนัดหมายพบทนายเพื่อหารือรายละเอียดคดีของท่าน
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white"
                 href={`tel:${info.phone}`}>
                <Phone className="h-4 w-4" /> โทรปรึกษาทันที
              </a>
              <a className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-800 ring-1 ring-slate-200"
                 href={`mailto:${info.email}`}>
                <Mail className="h-4 w-4" /> ส่งอีเมลสอบถาม
              </a>
              <a className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-800 ring-1 ring-slate-200"
                 target="_blank"
                 href={`https://line.me/R/ti/p/%40${info.line.replace('@', '')}`}>
                <MessageCircle className="h-4 w-4" /> เพิ่มเพื่อน LINE
              </a>
            </div>
          </div>

          {/* ข้อแนะนำก่อนติดต่อ */}
          <div className="rounded-2xl bg-white/80 ring-1 ring-slate-200 p-4">
            <p className="text-sm text-slate-700">
              เพื่อความรวดเร็ว โปรดเตรียม <span className="font-medium">ชื่อ–เบอร์ติดต่อกลับ</span> และ
              <span className="font-medium">สรุปเหตุการณ์สั้น ๆ</span> รวมถึง
              <span className="font-medium">ไฟล์/ภาพหลักฐาน</span> ที่เกี่ยวข้อง (ถ้ามี)
            </p>
          </div>
        </Card>

        {/* แผนที่สำนักงาน */}
        <Card>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-700" /> ที่อยู่สำนักงานกฎหมาย
          </h2>

          <div className="mt-3 rounded-2xl glass p-3">
            <div className="relative rounded-xl overflow-hidden bg-white/60" style={{ height: 380 }}>
              {info.mapEmbed ? (
                <iframe
                  src={info.mapEmbed}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label={`แผนที่: ${info.address}`}
                />
              ) : (
                <div className="grid h-full place-items-center text-sm text-slate-600">
                  ไม่พบลิงก์แผนที่
                </div>
              )}
            </div>

            <div className="mt-3 flex items-start justify-between gap-4">
              <p className="text-sm text-slate-700">{info.address}</p>
              <a
                href={info.mapOpen}
                target="_blank"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm"
              >
                เปิดใน Google Maps <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Card>
      </div>

      {/* FORM */}
      <Card>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">ฟอร์มติดต่อ</h2>
          <p className="text-sm text-slate-600">* จำเป็นต้องกรอก</p>
        </div>

        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={onSubmit} aria-describedby="contact-desc">
          <p id="contact-desc" className="sr-only">
            กรอกชื่อ อีเมล ข้อความ และส่งเพื่อให้เราติดต่อกลับ
          </p>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="name">ชื่อ *</label>
            <input id="name" name="name" required placeholder="ชื่อ–นามสกุล"
                   className="rounded-lg ring-1 ring-slate-200 px-3 py-2 bg-white/95 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="email">อีเมล *</label>
            <input id="email" name="email" type="email" required placeholder="example@email.com"
                   className="rounded-lg ring-1 ring-slate-200 px-3 py-2 bg-white/95 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="phone">โทรศัพท์</label>
            <input id="phone" name="phone" placeholder="เบอร์ติดต่อกลับ"
                   className="rounded-lg ring-1 ring-slate-200 px-3 py-2 bg-white/95 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="subject">หัวข้อ</label>
            <input id="subject" name="subject" placeholder="หัวข้อเรื่อง"
                   className="rounded-lg ring-1 ring-slate-200 px-3 py-2 bg-white/95 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          <div className="md:col-span-2 grid gap-2">
            <label className="text-sm font-medium" htmlFor="message">ข้อความ *</label>
            <textarea id="message" name="message" required placeholder="เล่าเหตุการณ์ย่อ ๆ และสิ่งที่ต้องการให้ช่วย"
                      className="min-h-32 rounded-lg ring-1 ring-slate-200 px-3 py-2 bg-white/95 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          {/* honeypot */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
            <div role="status" aria-live="polite" className="text-sm text-slate-600">
              {status === 'success' ? 'ส่งข้อความสำเร็จ ขอบคุณครับ/ค่ะ' :
               status === 'error'   ? 'ส่งไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' : ''}
            </div>
            <button
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary-600 text-white disabled:opacity-50"
              disabled={status === 'loading'}
            >
              ส่งข้อความ
            </button>
          </div>

          {/* แจ้งการใช้ข้อมูล */}
          <p className="md:col-span-2 text-xs text-slate-500">
            ข้อมูลที่ส่งมาจะใช้เพื่อการติดต่อกลับและประเมินคดีเท่านั้น เราจะเก็บรักษาข้อมูลของท่านเป็นความลับ
          </p>
        </form>
      </Card>

      {/* คำถามพบบ่อย (เสริมความน่าเชื่อถือ/SEO) */}
      <Card className="space-y-4">
        <h2 className="text-lg font-semibold">คำถามที่พบบ่อย</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <FAQ q="ปรึกษาเบื้องต้นมีค่าใช้จ่ายหรือไม่?" a="ไม่มีค่าใช้จ่าย เราประเมินเบื้องต้นและเสนอแนวทาง/ขั้นตอนพร้อมโครงค่าบริการก่อนเริ่มงาน" />
          <FAQ q="รับงานต่างจังหวัดไหม?" a={`รับครับ/ค่ะ ให้บริการทั่วประเทศ (${info.serviceArea}) และสามารถนัดหมายออนไลน์ได้`} />
          <FAQ q="ต้องเตรียมเอกสารอะไร?" a="สำเนาบัตร/ทะเบียนบ้าน เอกสารสัญญาหรือหลักฐานที่เกี่ยวข้อง รูป/แชต/สลิปโอน และรายละเอียดเหตุการณ์" />
          <FAQ q="ใช้เวลานานแค่ไหน?" a="ขึ้นกับประเภทคดีและดุลพินิจศาล เราจะแจ้งระยะเวลาประมาณการให้ทราบก่อนเริ่มทุกครั้ง" />
        </div>
      </Card>

      {/* ปุ่มกลับไปหน้าบริการ/หน้าแรก */}
      <div className="relative flex flex-wrap gap-3">
        <Link href="/services" className="rounded-xl bg-white text-slate-800 px-4 py-2 ring-1 ring-slate-200">
          ดูบริการทั้งหมด
        </Link>
        <Link href="/" className="rounded-xl bg-white text-slate-800 px-4 py-2 ring-1 ring-slate-200">
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-xl bg-white/80 ring-1 ring-slate-200 p-4">
      <summary className="font-medium cursor-pointer">{q}</summary>
      <p className="mt-2 text-sm text-slate-700">{a}</p>
    </details>
  )
}
