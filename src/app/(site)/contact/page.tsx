'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { CONTACT } from '@/data/contact';
import {
  Phone, Mail, MessageCircle, MapPin, Clock, ShieldCheck, ArrowRight, Facebook,
  ImageIcon, CalendarDays
} from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

type ContactLike = {
  email: string;
  phone: string;
  lineOfficial: string;
  serviceArea: string;
  address: string;
  mapEmbed?: string;
  mapOpen?: string;
  officeHours?: string;
  responseSLA?: string;
  officePhotos?: string[];
  facebookPages?: { label: string; url: string }[];
};

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [photoIdx, setPhotoIdx] = useState<number | null>(null);

  const info = useMemo(() => {
    const c = (CONTACT ?? {}) as Partial<ContactLike>;
    return {
      email: c.email ?? '',
      phone: c.phone ?? '',
      line: c.lineOfficial ?? '',
      serviceArea: c.serviceArea ?? 'ทั่วราชอาณาจักร',
      address: c.address ?? '',
      mapEmbed: c.mapEmbed ?? '',
      mapOpen: c.mapOpen ?? 'https://maps.google.com',
      officeHours: c.officeHours ?? 'ทุกวัน 09:00–18:00 (ยืดหยุ่นนัดพิเศษได้)',
      responseSLA: c.responseSLA ?? 'ตอบกลับภายใน 24 ชม.',
      officePhotos: c.officePhotos ?? [],
      facebookPages: c.facebookPages ?? [],
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem('company') as HTMLInputElement)?.value;
    if (honeypot) return;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus('success'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <div className="relative space-y-8">
      {/* แบนเนอร์ไล่สีเนียน ๆ */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(520px 360px at 8% 0%, rgba(59,130,246,.14), transparent 60%), radial-gradient(560px 400px at 96% 8%, rgba(99,102,241,.12), transparent 62%)',
        }}
      />

      {/* HERO */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative"
      >
        <div className="rounded-3xl glass-deep ring-1 ring-white/40 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">ติดต่อเรา</h1>
          <p className="mt-3 text-slate-700 max-w-3xl">
            รับคำปรึกษาเบื้องต้นฟรี นัดหมายพบเพื่อวางแผนคดีหรือเอกสารของท่านอย่างเป็นระบบ
            เราโปร่งใสเรื่องขั้นตอนและค่าบริการตั้งแต่แรก
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <Chip icon={<ShieldCheck className="h-4 w-4 text-primary-600" />}>ข้อมูลลูกค้าเป็นความลับ</Chip>
            <Chip icon={<Clock className="h-4 w-4 text-primary-600" />}>{info.responseSLA}</Chip>
            <Chip>พื้นที่บริการ: {info.serviceArea}</Chip>
          </div>
        </div>
      </motion.header>

      {/* INFO + MAP */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* การ์ดข้อมูลติดต่อ & social */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Card className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">ข้อมูลการติดต่อ</h2>
              <ul className="mt-3 text-sm space-y-1">
                <Item icon={<Phone className="h-4 w-4 text-primary-700" />}>
                  โทรศัพท์:&nbsp;<a className="underline-offset-4 hover:underline" href={`tel:${info.phone}`}>{info.phone}</a>
                </Item>
                <Item icon={<Mail className="h-4 w-4 text-primary-700" />}>
                  อีเมล:&nbsp;<a className="underline-offset-4 hover:underline" href={`mailto:${info.email}`}>{info.email}</a>
                </Item>
                <Item icon={<MessageCircle className="h-4 w-4 text-primary-700" />}>
                  LINE Official: <span className="font-medium">{info.line}</span>
                </Item>
                <Item icon={<Clock className="h-4 w-4 text-primary-700" />}>
                  เวลาทำการ: {info.officeHours}
                </Item>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">พร้อมให้คำปรึกษา</h3>
              <p className="text-sm mt-1">
                ติดต่อได้ 24 ชั่วโมงเพื่อรับคำปรึกษาเบื้องต้นฟรี และนัดหมายพบทนาย
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Action href={`tel:${info.phone}`} primary icon={<Phone className="h-4 w-4" />}>โทรปรึกษาทันที</Action>
                <Action href={`mailto:${info.email}`} icon={<Mail className="h-4 w-4" />}>ส่งอีเมลสอบถาม</Action>
                <Action
                  href={`https://line.me/R/ti/p/%40${info.line.replace('@','')}`}
                  icon={<MessageCircle className="h-4 w-4" />}
                >
                  เพิ่มเพื่อน LINE
                </Action>
                {info.facebookPages.map((fb, idx) => (
                  <Action key={fb.url} href={fb.url} external icon={<Facebook className="h-4 w-4" />}>
                    {fb.label || `Facebook เพจ ${idx + 1}`}
                  </Action>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 ring-1 ring-slate-200 p-4">
              <p className="text-sm text-slate-700">
                เพื่อความรวดเร็ว โปรดเตรียม <span className="font-medium">ชื่อ–เบอร์ติดต่อกลับ</span> และ
                <span className="font-medium">สรุปเหตุการณ์สั้น ๆ</span> พร้อม
                <span className="font-medium">ไฟล์/ภาพหลักฐาน</span> ที่เกี่ยวข้อง (ถ้ามี)
              </p>
            </div>
          </Card>
        </motion.div>

        {/* แผนที่สำนักงาน */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="lg:col-span-2"
        >
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
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm"
                >
                  เปิดใน Google Maps <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* แกลเลอรีภาพหน้าออฟฟิศ */}
      {info.officePhotos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Card>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary-700" /> ภาพออฟฟิศสำนักกฏหมาย
              </h2>
              <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" /> อัปเดตล่าสุด
              </span>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {info.officePhotos.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setPhotoIdx(i)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-white/60 bg-white/60 focus:outline-none"
                  aria-label={`เปิดภาพหน้าออฟฟิศ ${i + 1} แบบขยาย`}
                >
                  <Image
                    src={src}
                    alt={`ภาพหน้าออฟฟิศ ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/0 group-hover:ring-black/5 transition" />
                </button>
              ))}
            </div>
            <p className="img-note">* ภาพสำนักงานเพื่อให้ลูกค้าหาสถานที่ได้สะดวก</p>
          </Card>

          {/* Lightbox ใช้ Modal เดิม */}
          <Modal
            open={photoIdx !== null}
            onClose={() => setPhotoIdx(null)}
            title="ภาพออฟฟิศสำนักกฏหมาย"
          >
            {photoIdx !== null && (
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-slate-200">
                <Image
                  src={info.officePhotos[photoIdx]}
                  alt={`ภาพออฟฟิศสำนักกฏหมาย ${photoIdx + 1}`}
                  fill
                  className="object-contain bg-white"
                  sizes="100vw"
                />
              </div>
              )}
          </Modal>
        </motion.div>
      )}

      {/* ฟอร์มติดต่อ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <Card>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">ฟอร์มติดต่อ</h2>
            <p className="text-sm text-slate-600">* จำเป็นต้องกรอก</p>
          </div>

          <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={onSubmit} aria-describedby="contact-desc">
            <p id="contact-desc" className="sr-only">กรอกชื่อ อีเมล ข้อความ และส่งเพื่อให้เราติดต่อกลับ</p>

            <Field id="name" label="ชื่อ *" required placeholder="ชื่อ–นามสกุล" />
            <Field id="email" type="email" label="อีเมล *" required placeholder="example@email.com" />
            <Field id="phone" label="โทรศัพท์" placeholder="เบอร์ติดต่อกลับ" />
            <Field id="subject" label="หัวข้อ" placeholder="หัวข้อเรื่อง" />
            <FieldTextArea id="message" label="ข้อความ *" required placeholder="เล่าเหตุการณ์ย่อ ๆ และสิ่งที่ต้องการให้ช่วย" />

            {/* honeypot */}
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <div role="status" aria-live="polite" className="text-sm text-slate-600 min-h-[1.25rem]">
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

            <p className="md:col-span-2 text-xs text-slate-500">
              ข้อมูลที่ส่งมาจะใช้เพื่อการติดต่อกลับและประเมินคดีเท่านั้น เราจะเก็บรักษาข้อมูลของท่านเป็นความลับ
            </p>
          </form>
        </Card>
      </motion.div>

      {/* นำทาง */}
      <div className="relative flex flex-wrap gap-3">
        <Link href="/services" className="rounded-xl bg-white text-slate-800 px-4 py-2 ring-1 ring-slate-200">
          ดูบริการทั้งหมด
        </Link>
        <Link href="/" className="rounded-xl bg-white text-slate-800 px-4 py-2 ring-1 ring-slate-200">
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}

/* ---------- mini UI components (สวย+สั้น) ---------- */
function Chip({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">
      {icon} {children}
    </span>
  );
}

function Item({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </li>
  );
}

function Action({
  href, children, icon, external, primary,
}: { href: string; children: React.ReactNode; icon?: React.ReactNode; external?: boolean; primary?: boolean }) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl transition';
  const skin = primary
    ? 'bg-primary-600 text-white hover:bg-primary-700'
    : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-white/90';
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${base} ${skin}`}
    >
      {icon}{children}
    </a>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { id, label, className, ...rest } = props;
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        {...rest}
        className={`rounded-lg ring-1 ring-slate-200 px-3 py-2 bg-white/95 focus:outline-none focus:ring-2 focus:ring-primary-400 ${className ?? ''}`}
      />
    </div>
  );
}

function FieldTextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { id, label, className, ...rest } = props;
  return (
    <div className="md:col-span-2 grid gap-2">
      <label className="text-sm font-medium" htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        {...rest}
        className={`min-h-32 rounded-lg ring-1 ring-slate-200 px-3 py-2 bg-white/95 focus:outline-none focus:ring-2 focus:ring-primary-400 ${className ?? ''}`}
      />
    </div>
  );
}
