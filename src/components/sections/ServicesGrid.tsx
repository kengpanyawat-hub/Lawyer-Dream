'use client'
import { useMemo, useState } from 'react'
import { CONTACT } from '@/data/contact'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import { motion } from 'framer-motion'
import {
  Scale, Gavel, Users, Landmark, FileBadge2, Building2, Hammer,
  ClipboardList, BadgeCheck, Phone, MessageCircle
} from 'lucide-react'

/* =========================
   Types
========================= */
type Service = {
  slug: string
  title: string
  excerpt: string
  bullets?: string[]
}
type DetailSection = { title: string; items?: string[]; note?: string }

/* =========================
   Base services (fallback)
========================= */
let RAW: Service[]
try {
  // ถ้ามีไฟล์ data/services ของโปรเจ็กต์จะใช้ข้อมูลนั้นแทน
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  RAW = require('@/data/services').SERVICES as Service[]
} catch {
  RAW = [
    {
      slug: 'civil',
      title: 'คดีแพ่ง',
      excerpt:
        'ว่าความและรับคำปรึกษาคดีแพ่งทุกประเภท เช่น ผิดสัญญา เรียกค่าเสียหาย จำนอง–จำนำ สิทธิครอบครอง และทรัพย์สินทางปัญญา',
      bullets: ['ฟ้อง/แก้ต่างคดีผิดสัญญา', 'คดีละเมิด เรียกค่าสินไหม', 'คดีที่ดิน/อาคาร', 'บังคับคดี ยึด–อายัด–ขายทอดตลาด'],
    },
    {
      slug: 'criminal',
      title: 'คดีอาญา',
      excerpt:
        'ดูแลตั้งแต่ชั้นสอบสวน ประกันตัว สู้คดีทุกชั้น และจัดทำอุทธรณ์–ฎีกา โดยคำนึงถึงสิทธิของผู้ต้องหา/ผู้เสียหายอย่างเคร่งครัด',
      bullets: ['เข้าร่วมสอบสวน/เตรียมพยาน', 'ปล่อยชั่วคราว', 'ฉ้อโกง ยักยอก ทำร้าย ยาเสพติด ฯลฯ', 'อุทธรณ์–ฎีกา'],
    },
    {
      slug: 'family',
      title: 'คดีครอบครัว',
      excerpt: 'หย่า แบ่งสินสมรส อำนาจปกครองบุตร ค่าอุปการะเลี้ยงดู รับรองบุตร และคำสั่งศาลที่เกี่ยวข้อง',
      bullets: ['หย่าด้วยดี/หย่าฟ้อง', 'อำนาจปกครองบุตร', 'แบ่งสินสมรส', 'รับรองบุตร'],
    },
    {
      slug: 'inheritance',
      title: 'คดีมรดก',
      excerpt: 'ตั้งผู้จัดการมรดก แบ่งทรัพย์มรดก ตรวจสอบทรัพย์–หนี้ และจัดทำพินัยกรรม',
      bullets: ['ตั้งผู้จัดการมรดก', 'ตรวจสอบทรัพย์–หนี้', 'ยกร่าง/เพิกถอนพินัยกรรม'],
    },
    {
      slug: 'consumer',
      title: 'คดีผู้บริโภค',
      excerpt: 'คุ้มครองสิทธิผู้บริโภคจากสินค้า/บริการ รวมถึงออนไลน์และสัญญาไม่เป็นธรรม',
      bullets: ['เรียกเงินคืน–ค่าเสียหาย', 'ซื้อขายออนไลน์–ฉ้อโกงคอมพิวเตอร์', 'ดอกเบี้ยเกินกฎหมาย–ค่าธรรมเนียมไม่เป็นธรรม'],
    },
    {
      slug: 'special-courts',
      title: 'คดีในศาลชำนัญพิเศษ',
      excerpt: 'ศาลแรงงาน ศาลภาษีอากร ศาลทรัพย์สินทางปัญญาและการค้าระหว่างประเทศ รวมถึงมาตรการคุ้มครองชั่วคราว',
      bullets: ['แรงงาน: เลิกจ้างไม่เป็นธรรม', 'ภาษีอากร: อุทธรณ์คำประเมิน', 'ทรัพย์สินทางปัญญา: คุ้มครองชั่วคราว'],
    },
    {
      slug: 'contract',
      title: 'นิติกรรมและสัญญา',
      excerpt: 'ร่าง/ตรวจสัญญาทุกประเภท เพื่อคุ้มครองผลประโยชน์และลดความเสี่ยงทางกฎหมาย',
      bullets: ['ซื้อขาย รับเหมา เช่า เช่าซื้อ', 'SHA/ข้อตกลงผู้ถือหุ้น NDA/NCNDA', 'เงื่อนไขค่าปรับ SLA/การบอกเลิก'],
    },
    {
      slug: 'business-reg',
      title: 'จดทะเบียนธุรกิจ',
      excerpt: 'จดทะเบียนบริษัท/ห้างหุ้นส่วน แก้ไขวัตถุประสงค์ กรรมการ ทุน และจัดทำเอกสารประชุม/มติ',
      bullets: ['จัดตั้ง/แก้ไข บริคณห์สนธิ', 'เปลี่ยนกรรมการ/ที่ตั้ง/เพิ่มทุน', 'เอกสารประชุม/มติ/วาระ'],
    },
  ]
}
const SERVICES: Service[] = RAW.map((s) => ({ ...s, bullets: s.bullets ?? [] }))

/* =========================
   Details per category
========================= */
const DETAILS: Record<string, DetailSection[]> = {
  civil: [
    {
      title: 'ครอบคลุมงาน',
      items: [
        'ผิดสัญญา ซื้อขาย เช่า เช่าซื้อ จ้างทำของ เช็คเด้ง',
        'ละเมิด–เรียกค่าสินไหม (อุบัติเหตุ/ทรัพย์สินเสียหาย/หมิ่นประมาท)',
        'ที่ดิน–อาคาร สิทธิครอบครอง รังวัด แนวเขต ภาระจำยอม',
        'บังคับคดี: ยึด–อายัด–ขายทอดตลาด ตั้งค่า–งด/เพิกถอนการอายัด',
      ],
    },
    {
      title: 'ขั้นตอนโดยสรุป',
      items: ['รับฟังข้อเท็จจริงและประเมินโอกาส', 'ทำหนังสือทวงถาม/เจรจาไกล่เกลี่ย', 'ยื่นฟ้อง/คำให้การ', 'สืบพยาน–พิพากษา–บังคับคดี'],
    },
    {
      title: 'เอกสารที่ควรเตรียม',
      items: ['สัญญา/ใบเสร็จ/หลักฐานโอนเงิน', 'รูป/แชต/อีเมล/คลิปเสียง', 'สำเนาบัตร/ทะเบียนบ้าน', 'เอกสารสิทธิที่ดิน/โฉนด (ถ้ามี)'],
    },
    { title: 'ระยะเวลาโดยประมาณ', items: ['3–12 เดือน (ขึ้นกับคดีและจำนวนพยาน)'] },
    {
      title: 'ค่าใช้จ่าย (แนวทาง)',
      items: ['คิดตามขั้นตอน/เหมาเคส/รายชั่วโมง', 'ค่าสืบพยาน/ค่าธรรมเนียมศาลตามจริง'],
      note: 'จะแจ้งโครงค่าบริการชัดเจนก่อนเริ่มงาน',
    },
  ],
  criminal: [
    {
      title: 'ครอบคลุมงาน',
      items: ['เข้าร่วมสอบสวน แจ้งข้อหา', 'ปล่อยชั่วคราว/ประกันตัว', 'ว่าความชั้นพิจารณา', 'จัดทำคำอุทธรณ์–ฎีกา'],
    },
    {
      title: 'ขั้นตอนโดยสรุป',
      items: ['รับนัดสอบสวน–เตรียมพยานหลักฐาน', 'ยื่นปล่อยชั่วคราว', 'สืบพยานโจทก์–จำเลย', 'พิพากษา/อุทธรณ์–ฎีกา'],
    },
    {
      title: 'เอกสารที่ควรเตรียม',
      items: ['เอกสารหมายเรียก/หมายจับ (ถ้ามี)', 'หลักฐานเหตุการณ์ รูป/คลิป/แชต', 'สำเนาบัตร/ทะเบียนบ้าน', 'หลักทรัพย์ค้ำประกัน'],
    },
    { title: 'สิทธิสำคัญ', items: ['มีทนายได้ทุกชั้น', 'ให้การ/ไม่ให้การได้', 'สิทธิขอปล่อยชั่วคราว'] },
  ],
  family: [
    {
      title: 'ครอบคลุมงาน',
      items: ['หย่าด้วยดีพร้อมข้อตกลง/หย่าฟ้อง', 'อำนาจปกครองบุตร/ค่าอุปการะเลี้ยงดู', 'แบ่งสินสมรส', 'รับรองบุตร/เพิกถอนอำนาจปกครอง'],
    },
    {
      title: 'เอกสารเบื้องต้น',
      items: ['ทะเบียนสมรส/สูติบัตรบุตร', 'หลักฐานทรัพย์สินร่วม เช่น โฉนด/บัญชีธนาคาร', 'หลักฐานการเลี้ยงดู/ค่าใช้จ่าย'],
    },
  ],
  inheritance: [
    {
      title: 'ครอบคลุมงาน',
      items: ['ตั้งผู้จัดการมรดก', 'สำรวจ/ตรวจสอบทรัพย์–หนี้', 'แบ่งทรัพย์มรดก', 'ยกร่าง/เพิกถอนพินัยกรรม'],
    },
    { title: 'เอกสารเบื้องต้น', items: ['มรณะบัตร/สำเนาทะเบียนบ้านผู้ตาย', 'ข้อมูลทรัพย์สิน/หนี้สิน', 'พินัยกรรม (ถ้ามี)'] },
  ],
  consumer: [
    {
      title: 'ครอบคลุมงาน',
      items: ['ซื้อสินค้า/บริการไม่ได้มาตรฐาน', 'บริการทางการเงิน/สินเชื่อ/ดอกเบี้ยเกินกฎหมาย', 'ซื้อขายออนไลน์/ฉ้อโกงคอมพิวเตอร์'],
    },
    {
      title: 'แนวทางดำเนินการ',
      items: ['หนังสือร้องเรียน–ทวงถาม', 'ไกล่เกลี่ย/ร้องเรียนหน่วยงานกำกับ', 'ฟ้องคดีผู้บริโภคเพื่อเยียวยาอย่างรวดเร็ว'],
    },
  ],
  'special-courts': [
    {
      title: 'ครอบคลุมงาน',
      items: ['แรงงาน: เลิกจ้างไม่เป็นธรรม/ค่าเสียหาย', 'ภาษีอากร: อุทธรณ์คำประเมิน–ฟ้องคดี', 'ทรัพย์สินทางปัญญา: คำสั่งคุ้มครองชั่วคราว'],
    },
  ],
  contract: [
    {
      title: 'บริการ',
      items: ['ร่าง/ตรวจสัญญา ซื้อขาย–รับเหมา–เช่า–จ้างทำของ', 'ข้อตกลงผู้ถือหุ้น (SHA)', 'NDA/NCNDA/Non-Compete', 'เงื่อนไขค่าปรับ SLA/การบอกเลิก'],
    },
    { title: 'จุดเน้น', items: ['ลดความเสี่ยงทางกฎหมาย', 'เงื่อนไขคุ้มครองผลประโยชน์ ฝ่ายลูกค้า', 'กลไกระงับข้อพิพาทชัดเจน'] },
  ],
  'business-reg': [
    {
      title: 'บริการ',
      items: ['จดทะเบียนบริษัท/ห้างหุ้นส่วน', 'แก้ไขวัตถุประสงค์/ที่ตั้ง/ทุน/กรรมการ', 'จัดทำเอกสารประชุม/หนังสือเชิญ/มติ'],
    },
    { title: 'เอกสารเบื้องต้น', items: ['สำเนาบัตร/ทะเบียนบ้านผู้ก่อตั้ง', 'ชื่อบริษัทที่ต้องการ', 'ที่ตั้งสำนักงานและวัตถุประสงค์'] },
  ],
}

/* =========================
   Icons
========================= */
const ICONS: Record<string, any> = {
  civil: Scale,
  criminal: Gavel,
  family: Users,
  inheritance: Landmark,
  consumer: FileBadge2,
  'special-courts': Hammer,
  contract: ClipboardList,
  'business-reg': Building2,
}

/* =========================
   Component
========================= */
export default function ServicesGrid() {
  const [open, setOpen] = useState<Service | null>(null)
  const list = useMemo(() => SERVICES, [])

  return (
    <div className="relative">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => {
          const Icon = ICONS[s.slug] ?? BadgeCheck
          return (
            <motion.div
              key={s.slug}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.03, duration: 0.35, ease: 'easeOut' }}
            >
              <Card className="rounded-3xl glass-soft ring-1 ring-white/40 hover:shadow-xl transition">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 ring-1 ring-primary-200 shrink-0">
                      <Icon className="h-5 w-5 text-primary-700" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                      <p className="mt-1 text-sm text-slate-700">{s.excerpt}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      className="rounded-xl bg-primary-600 text-white px-3 py-2 text-sm"
                      onClick={() => setOpen(s)}
                    >
                      ดูรายละเอียด
                    </button>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="rounded-xl bg-white text-slate-800 ring-1 ring-slate-200 px-3 py-2 text-sm"
                    >
                      โทรสอบถาม
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Modal */}
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ''}>
        {open && (
          <div className="space-y-5">
            {/* สรุปสั้น */}
            {open.excerpt && <p className="text-slate-700">{open.excerpt}</p>}

            {/* บล็อกรายละเอียดตามหมวด */}
            {(DETAILS[open.slug] ?? []).map((sec, idx) => (
              <div key={idx} className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm px-5 py-4">
                <h4 className="font-semibold text-slate-900">{sec.title}</h4>
                {!!sec.items?.length && (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                    {sec.items.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                )}
                {sec.note && <p className="mt-2 text-sm text-slate-600">{sec.note}</p>}
              </div>
            ))}

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 text-white px-4 py-2"
              >
                <Phone className="h-4 w-4" /> โทร {CONTACT.phone}
              </a>
              <a
                href={`https://line.me/R/ti/p/%40${(CONTACT.lineOfficial ?? '@128rwwqd').replace('@', '')}`}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-800 px-4 py-2 ring-1 ring-slate-200"
              >
                <MessageCircle className="h-4 w-4" /> เพิ่มเพื่อน LINE
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
