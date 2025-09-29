// src/components/ui/Button.tsx
'use client'

import Link from 'next/link'
import type { Route } from 'next'
import clsx from 'clsx'
import * as React from 'react'

/* ---------- Variants & Sizes ---------- */

type Variant = 'primary' | 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantStyles: Record<Variant, string> = {
  // ไล่เฉด + soft shadow
  primary:
    'bg-gradient-to-b from-primary-500 to-primary-600 text-white shadow-sm hover:from-primary-500/90 hover:to-primary-600/90 active:from-primary-600 active:to-primary-700 shadow-primary-600/30',
  // โทนเข้มอ่านง่าย (สำหรับพื้นหลังสว่าง)
  solid:
    'bg-slate-900 text-white shadow-sm hover:bg-slate-800 active:bg-slate-900/90 shadow-slate-900/20',
  // เส้นขอบเนียน + พื้นหลังจาง
  outline:
    'bg-white/60 text-slate-900 ring-1 ring-slate-300 hover:bg-white focus:ring-2 focus:ring-slate-400',
  // แบบโปร่งสำหรับ secondary action
  ghost:
    'bg-transparent text-slate-800 hover:bg-slate-50',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-[15px]',
}

// โครงสร้างพื้นฐานให้มีฟีลลิ่งที่ดีขึ้น (transition + focus ring + disabled)
const baseStyle =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight ' +
  'transition-all duration-150 focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-primary-300 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-95'

/* ---------- Utils ---------- */

// แปลง href เป็น Route เมื่อเป็นลิงก์ภายใน (รองรับ typedRoutes)
function toRoute(href: string): Route | string {
  return href.startsWith('/') ? (href as Route) : href
}

// สปินเนอร์เล็ก ๆ ตอน loading
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={clsx('h-4 w-4 animate-spin', className)}
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  )
}

/* ---------- Button (เดิม) ---------- */

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  /** ไอคอนด้านซ้าย (เช่น <Phone className="h-4 w-4" />) */
  leadingIcon?: React.ReactNode
  /** ไอคอนด้านขวา */
  trailingIcon?: React.ReactNode
  /** สถานะกำลังโหลด */
  loading?: boolean
  /** กว้างเต็มบรรทัด */
  fullWidth?: boolean
}) {
  return (
    <button
      type={type}
      className={clsx(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      aria-busy={loading || undefined}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="text-white/90" />
          <span className="sr-only">กำลังโหลด…</span>
        </>
      ) : (
        <>
          {leadingIcon}
          {children}
          {trailingIcon}
        </>
      )}
    </button>
  )
}

/* ---------- ButtonLink (เดิม) ---------- */

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  target,
  rel,
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  ...props
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  fullWidth?: boolean
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const _href = toRoute(href)

  const isExternal = typeof _href === 'string' && /^https?:\/\//i.test(_href)
  const safeTarget = target ?? (isExternal ? '_blank' : undefined)
  const safeRel = rel ?? (isExternal ? 'noreferrer noopener' : undefined)

  return (
    <Link
      href={_href as Route}
      target={safeTarget}
      rel={safeRel}
      className={clsx(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  )
}
