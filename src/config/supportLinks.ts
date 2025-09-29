// ลิงก์ด่วนของสำนักกฎหมาย (ใช้ในวิดเจ็ต)
// ดึงข้อมูลติดต่อจาก data กลาง
import { CONTACT } from '@/data/contact'

export type SupportLinkKind = 'tel' | 'mail' | 'line' | 'map' | 'web' | 'cta'
export type SupportLink = {
  label: string
  href: string
  kind: SupportLinkKind
  external?: boolean
}

export const SUPPORT_LINKS: ReadonlyArray<SupportLink> = [
  { label: 'โทรปรึกษา', href: `tel:${CONTACT.phone}`, kind: 'tel' },
  { label: 'ส่งอีเมล', href: `mailto:${CONTACT.email}`, kind: 'mail', external: true },
  { label: 'LINE Official',  href: `https://line.me/R/ti/p/%40${CONTACT.lineOfficial.replace('@','')}`, kind: 'line', external: true },
  { label: 'แผนที่', href: 'https://share.google/Iz2olPPWHrFsNQInr', kind: 'map', external: true },
  { label: 'บริการทั้งหมด', href: '/services', kind: 'web' },
  { label: 'นัดหมาย', href: '/contact', kind: 'cta' },
]
