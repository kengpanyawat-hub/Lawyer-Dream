'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import {
  Home, Info, Briefcase, Scale, Newspaper, Images, MessageCircle
} from 'lucide-react'

type Item = { href: string; label: string; Icon: any; cta?: boolean }

const RAW = [
  { href: '/',           label: 'หน้าแรก' },
  { href: '/about',      label: 'เกี่ยวกับเรา' },
  { href: '/services',   label: 'บริการ' },
  { href: '/expertise',  label: 'ความเชี่ยวชาญ' },
  { href: '/blog',       label: 'บทความ' },
  { href: '/portfolio',  label: 'ผลงาน' },
  { href: '/contact',    label: 'ติดต่อเรา' },
]

// map icon per menu
const iconOf = (label: string) => {
  if (label.includes('หน้าแรก')) return Home
  if (label.includes('เกี่ยวกับ')) return Info
  if (label.includes('บริการ')) return Briefcase
  if (label.includes('เชี่ยวชาญ')) return Scale
  if (label.includes('บทความ')) return Newspaper
  if (label.includes('ผลงาน')) return Images
  if (label.includes('ติดต่อ')) return MessageCircle
  return Home
}

// cast href เป็น Route เฉพาะลิงก์ภายใน (เริ่มด้วย '/')
function toRoute(href: string): Route {
  return href as Route
}

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const NAV: Item[] = useMemo(() => RAW.map((i) => ({
    ...i,
    Icon: iconOf(i.label),
    cta: i.href === '/contact', // CTA
  })), [])

  return (
    <header className="sticky top-4 z-40">
      <div className="container-max">
        {/* glass bar */}
        <div className="rounded-2xl px-3 md:px-4 py-2 md:py-3
                        bg-blue-500 backdrop-blur-xl ring-1 ring-blue shadow-[0_10px_30px_rgba(0,0,0,.25)]">
          <div className="flex items-center gap-3">
            {/* Brand */}
            <Link href={toRoute('/')} className="flex items-center gap-3 shrink-0">
              <Image src="/images/logo.jpg" alt="โลโก้" width={36} height={36} className="rounded-lg" />
              <span className="hidden sm:block font-semibold text-white/90">
                สำนักกฎหมายดลวัฒน์และเพื่อน
              </span>
            </Link>

            {/* Desktop nav center */}
            <nav className="hidden md:flex mx-auto items-center gap-2">
              {NAV.filter(x=>!x.cta).map(({href,label,Icon})=>{
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={toRoute(href)}
                    className={[
                      'group flex items-center gap-2 rounded-2xl px-4 py-2 text-sm',
                      'ring-1 ring-white/10',
                      active
                        ? 'text-white bg-gradient-to-r from-white/90 to-blue/60'
                        : 'text-white bg-white/5 hover:bg-white/10'
                    ].join(' ')}
                  >
                    <Icon size={18} className="opacity-90" />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href={toRoute('/contact')}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm
                           bg-white text-blue-700 hover:bg-white/90"
              >
                <MessageCircle size={18} />
                ติดต่อเรา
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden ml-auto rounded-xl px-3 py-2 text-white hover:bg-blue/60"
              onClick={()=>setOpen(v=>!v)} aria-label="เปิดเมนู"
            >
              {/* menu icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                <rect x="3" y="5" width="18" height="2" rx="1"></rect>
                <rect x="3" y="11" width="18" height="2" rx="1"></rect>
                <rect x="3" y="17" width="18" height="2" rx="1"></rect>
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden mt-3 space-y-2">
              {NAV.filter(x=>!x.cta).map(({href,label,Icon})=>{
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={toRoute(href)}
                    onClick={()=>setOpen(false)}
                    className={[
                      'flex items-center gap-2 rounded-2xl px-4 py-3 text-base',
                      'ring-1 ring-white/10',
                      active
                        ? 'text-white bg-gradient-to-r from-blue/60 to-black/10'
                        : 'text-white bg-white/5'
                    ].join(' ')}
                  >
                    <Icon size={20}/>
                    <span>{label}</span>
                  </Link>
                )
              })}

              {/* Mobile CTA */}
              <Link
                href={toRoute('/contact')}
                onClick={()=>setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3
                           bg-white text-blue-700"
              >
                <MessageCircle size={20} />
                ติดต่อเรา
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
