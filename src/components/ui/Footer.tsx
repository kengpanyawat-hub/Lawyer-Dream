'use client'

import Link from 'next/link'
import type { Route } from 'next'
import Image from 'next/image'
import { Phone, Facebook } from 'lucide-react'
import { CONTACT } from '@/data/contact'

const menu: { label: string; href: string }[] = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'เกี่ยวกับเรา', href: '/about' },
  { label: 'บริการของเรา', href: '/services' },
  { label: 'ความเชี่ยวชาญ', href: '/expertise' },
  { label: 'กฎหมายที่ควรรู้', href: '/law' },
  { label: 'บทความ', href: '/blog' },
  { label: 'ผลงาน', href: '/portfolio' },
  { label: 'ติดต่อเรา', href: '/contact' },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: <Facebook className="h-5 w-5" />,
    newTab: true,
  },
  {
    label: 'LINE',
    href: `https://line.me/R/ti/p/%40${CONTACT.lineOfficial?.replace('@', '') ?? ''}`,
    // โลโก้ไลน์แบบเรียบง่าย (SVG)
    icon: (
      <svg viewBox="0 0 48 48" className="h-5 w-5" fill="currentColor">
        <path d="M39.6 8.4C36.8 5.6 32.6 4 28 4H20C11.2 4 4 10 4 17.6c0 5.5 3.9 10.2 9.6 12.5-.2.8-1.2 4.4-1.3 5-.2.9.3 1.1 1 1 .8-.1 5.1-3.4 5.9-3.9 2.4.4 4.8.5 7.3.2 8.8-1.2 15.5-7.9 15.5-15.8 0-4.3-1.8-7.9-5.4-10.2z"/>
      </svg>
    ),
    newTab: true,
  },
  {
    label: 'โทร',
    href: `tel:${CONTACT.phone ?? ''}`,
    icon: <Phone className="h-5 w-5" />,
    newTab: false,
  },
]

function isInternal(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export default function Footer() {
  return (
    <footer className="relative mt-16">
      {/* พื้นหลังไล่เฉดฟ้าเดียวกัน */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* โลโก้/ชื่อ */}
          <div className="flex flex-col items-center">
            <div className="rounded-xl overflow-hidden ring-1 ring-white/20 shadow">
              <Image
                src="/images/logo.jpg"
                alt="โลโก้สำนักกฎหมายดลวัฒน์และเพื่อน"
                width={56}
                height={56}
              />
            </div>
            <p className="mt-4 text-center text-white/90">
              สำนักกฎหมายดลวัฒน์และเพื่อน (ท.ดรีม) · ให้คำปรึกษาและว่าความทั่วราชอาณาจักร
            </p>

            {/* โซเชียล */}
            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.newTab ? '_blank' : undefined}
                  rel={s.newTab ? 'noopener noreferrer' : undefined}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* เมนู */}
            <nav
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px]"
              aria-label="เมนูส่วนท้าย"
            >
              {menu.map((l) =>
                isInternal(l.href) ? (
                  <Link
                    key={l.label}
                    href={l.href as Route}
                    className="font-medium text-white/90 hover:text-white"
                    prefetch={false}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    className="font-medium text-white/90 hover:text-white"
                  >
                    {l.label}
                  </a>
                ),
              )}
            </nav>

            {/* ข้อมูลติดต่อบรรทัดล่าง */}
            <p className="mt-6 text-sm text-white/80">
              โทร. {CONTACT.phone ?? '-'} · อีเมล {CONTACT.email ?? '-'} · LINE {CONTACT.lineOfficial ?? '-'}
            </p>

            <p className="mt-2 text-xs text-white/70">
              © {new Date().getFullYear()} สำนักกฎหมายดลวัฒน์และเพื่อน — สงวนลิขสิทธิ์
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
