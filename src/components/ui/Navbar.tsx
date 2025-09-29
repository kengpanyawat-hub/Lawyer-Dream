'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
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
  { href: '/contact',    label: 'ติดต่อเรา' }, // จะถูกทำเป็น CTA
]

// ไอคอนตามชื่อเมนู
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

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const NAV: Item[] = useMemo(() => RAW.map((i) => ({
    ...i,
    Icon: iconOf(i.label),
    cta: i.href === '/contact',
  })), [])

  return (
    <header className="sticky top-4 z-40">
      <div className="container-max">
        {/* แถบแก้วโทนฟ้า */}
        <div className="rounded-2xl px-3 md:px-4 py-2 md:py-3
                        bg-blue-500 backdrop-blur-xl ring-1 ring-primary-300/30 shadow-[0_10px_30px_rgba(0,0,0,.25)]">
          <div className="flex items-center gap-3">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src="/images/logo.jpg" alt="โลโก้" width={36} height={36} className="rounded-lg" />
              <span className="hidden sm:block font-semibold text-white/90">
                สำนักกฎหมายดลวัฒน์และเพื่อน (ท.ดรีม)
              </span>
            </Link>

            {/* Desktop menu (ไม่รวม CTA) */}
            <nav className="hidden md:flex mx-auto items-center gap-2">
              {NAV.filter(x=>!x.cta).map(({href,label,Icon})=>{
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      'group flex items-center gap-2 rounded-2xl px-4 py-2 text-sm',
                      'ring-1 ring-white/10',
                      active
                        ? 'text-white bg-gradient-to-r from-primary-500 to-primary-400'
                        : 'text-white/90 bg-white/10 hover:bg-white/15'
                    ].join(' ')}
                  >
                    <Icon size={18} className="opacity-90" />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* CTA ขวาสุด (Desktop) */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm
                         text-white bg-gradient-to-r from-primary-500 to-primary-400 shadow-md"
            >
              <MessageCircle size={18} />
              <span>ติดต่อเรา</span>
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden ml-auto rounded-xl px-3 py-2 text-white/90 hover:bg-white/10"
              onClick={()=>setOpen(v=>!v)} aria-label="เปิดเมนู"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                <rect x="3" y="5" width="18" height="2" rx="1"></rect>
                <rect x="3" y="11" width="18" height="2" rx="1"></rect>
                <rect x="3" y="17" width="18" height="2" rx="1"></rect>
              </svg>
            </button>
          </div>

          {/* Mobile menu + CTA ล่างสุด */}
          {open && (
            <div className="md:hidden mt-3 space-y-2">
              {NAV.filter(x=>!x.cta).map(({href,label,Icon})=>{
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={()=>setOpen(false)}
                    className={[
                      'flex items-center gap-2 rounded-2xl px-4 py-3 text-base',
                      'ring-1 ring-white/10',
                      active
                        ? 'text-white bg-gradient-to-r from-primary-500 to-primary-400'
                        : 'text-white/90 bg-white/10'
                    ].join(' ')}
                  >
                    <Icon size={20}/>
                    <span>{label}</span>
                  </Link>
                )
              })}
              {/* CTA (Mobile) */}
              <Link
                href="/contact"
                onClick={()=>setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-base
                           text-white bg-gradient-to-r from-primary-500 to-primary-400 shadow-md"
              >
                <MessageCircle size={20} />
                <span>ติดต่อเรา</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
