// src/lib/seo.ts
import type { Metadata } from 'next'

/** ตั้งค่าพื้นฐานของเว็บ */
export const SITE = {
  name: 'สำนักกฎหมายดลวัฒน์และเพื่อน',
  shortName: 'ท.ดรีม',
  domain: 'lawyer-dream.vercel.app',
  url: 'https://lawyer-dream.vercel.app',
  description: 'ให้คำปรึกษาและว่าความ อย่างมืออาชีพ ทั่วราชอาณาจักร',
  locale: 'th_TH',
  ogImage: '/og.jpg', // ใส่รูป 1200x630 ใน public/ ชื่อ og.jpg
}

/** SEO กลางสำหรับทั้งเว็บ (ใช้ใน layout.tsx) */
export const DEFAULT_SEO: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} (${SITE.shortName})`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} (${SITE.shortName})`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} (${SITE.shortName})`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

/** helper สำหรับสร้าง meta รายหน้า */
export function pageMeta(
  title: string,
  options?: {
    description?: string
    path?: string
    image?: string
  }
): Metadata {
  const description = options?.description ?? SITE.description
  const url = options?.path ? new URL(options.path, SITE.url).toString() : SITE.url
  const image = options?.image ?? SITE.ogImage

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${title} | ${SITE.name}`,
      description,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: SITE.name }],
      type: 'website',
      locale: SITE.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [image],
    },
  }
}
