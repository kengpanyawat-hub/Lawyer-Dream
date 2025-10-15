import './globals.css'
import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import { SITE } from '@/lib/seo'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import React from 'react'
import LenisProvider from '@/components/LenisProvider'
import SupportWidget from '@/components/SupportWidget'

const prompt = Prompt({ subsets: ['thai'], weight: ['300','400','500','600','700'] })

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  openGraph: { title: SITE.name, description: SITE.description, type: 'website', url: SITE.url },
  twitter: { card: 'summary_large_image', title: SITE.name, description: SITE.description }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={prompt.className}>
        <LenisProvider>
          <Navbar />
          <main id="content" className="container-max py-8">{children}</main>
          <Footer />
		  <SupportWidget />   {/* << วิดเจ็ตช่วยเหลือ */}
        </LenisProvider>
      </body>
    </html>
  )
}
