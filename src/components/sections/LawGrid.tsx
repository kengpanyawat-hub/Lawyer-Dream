'use client'

import { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import { motion } from 'framer-motion'
import {
  ShieldCheck, Home, FileSignature, Siren, Users, Landmark,
  Info, Scale, Tag
} from 'lucide-react'

type LawTopic = {
  slug: string
  title: string
  badge?: string
  lead: string
  icon?: any
  sections: Array<{
    title: string
    items?: string[]
    note?: string
  }>
}

const TOPICS: LawTopic[] = [
  {
    slug: 'consumer-rights',
    title: 'สิทธิของผู้บริโภค',
    badge: 'ข้อมูลทั่วไป—ไม่ใช่คำปรึกษาเฉพาะกรณี',
    lead:
      'สิทธิที่จะได้รับข่าวสารที่ถูกต้อง ปลอดภัย และเป็นธรรมจากสินค้า/บริการ รวมถึงการร้องเรียนและเรียกค่าเสียหายเมื่อถูกละเมิดสิทธิ',
    icon: ShieldCheck,
    sections: [
      {
        title: 'สิทธิสำคัญ',
        items: [
          'สิทธิได้รับข้อมูลที่ถูกต้องครบถ้วนและไม่หลอกลวง',
          'สิทธิเลือกซื้ออย่างเสรีและเป็นธรรม',
          'สิทธิได้รับความปลอดภัยจากสินค้า/บริการ',
          'สิทธิร้องเรียน/ฟ้องคดีผู้บริโภคเพื่อเยียวยาอย่างรวดเร็ว',
        ],
      },
      {
        title: 'หลักฐานที่ควรเก็บ',
        items: [
          'ใบเสร็จ/สลิปการชำระเงิน สัญญา ใบเสนอราคา',
          'รูป/วิดีโอแสดงความบกพร่อง แชต/อีเมลโต้ตอบ',
          'เอกสารรับประกัน/คู่มือการใช้งาน',
        ],
      },
      {
        title: 'แนวทางเบื้องต้น',
        items: [
          'ติดต่อผู้ขาย/ผู้ให้บริการเพื่อแก้ปัญหาโดยสุจริต (ซ่อม/เปลี่ยน/คืนเงิน)',
          'ร้องเรียนหน่วยงานกำกับที่เกี่ยวข้อง',
          'ฟ้องคดีผู้บริโภคเพื่อเรียกค่าเสียหาย ดอกเบี้ย และค่าใช้จ่ายที่จำเป็น',
        ],
        note: 'คดีผู้บริโภคมีกระบวนพิเศษที่ช่วยให้พิจารณาคดีรวดเร็วและลดภาระพิสูจน์ของผู้บริโภคในบางประเด็น',
      },
    ],
  },
  {
    slug: 'house-sale',
    title: 'สัญญาซื้อขายบ้าน',
    badge: 'ข้อมูลทั่วไป—ไม่ใช่คำปรึกษาเฉพาะกรณี',
    lead:
      'สัญญาซื้อขายบ้านควรกำหนดทรัพย์ รายละเอียดความชำรุดบกพร่อง งวดชำระ เงื่อนไขโอนกรรมสิทธิ์ ค่าธรรมเนียม ภาษี และการรับประกัน',
    icon: Home,
    sections: [
      {
        title: 'หัวใจของสัญญา',
        items: [
          'ระบุทรัพย์อย่างชัดเจน (เลขที่โฉนด เลขที่บ้าน/ห้องชุด พื้นที่)',
          'ราคาซื้อขาย เงื่อนไขงวดชำระ และเบี้ยปรับเมื่อผิดนัด',
          'วันที่โอนกรรมสิทธิ์ ผู้รับผิดชอบค่าธรรมเนียม/ภาษี',
          'การรับประกันความชำรุดบกพร่อง และการโอนมิเตอร์สาธารณูปโภค',
        ],
      },
      {
        title: 'เอกสารที่ควรตรวจ',
        items: [
          'โฉนด/น.ส.3 ก + หนังสือรับรอง สผผ./ภาระผูกพัน',
          'ใบปลอดภาระ/หนังสือยินยอมจากสถาบันการเงิน (ถ้ามีจำนอง)',
          'แบบบ้าน/รายการวัสดุ ใบรับประกันงานระบบ',
        ],
      },
      {
        title: 'ข้อควรระวัง',
        items: [
          'ตรวจสอบสิทธิครอบครองและภาระจำยอม/สิทธิผ่านของบุคคลอื่น',
          'กำหนดการตรวจรับบ้านและรายการแก้ไขให้ชัดเจน',
          'ระบุกรณีบอกเลิกและการคืนเงินอย่างเป็นธรรม',
        ],
      },
    ],
  },
  {
    slug: 'crime-prevention',
    title: 'การป้องกันอาชญากรรม',
    badge: 'ข้อมูลทั่วไป—ไม่ใช่คำปรึกษาเฉพาะกรณี',
    lead:
      'รู้สิทธิเมื่อพบเหตุฉุกเฉินและการแจ้งความ รวมถึงความรับผิดเมื่อป้องกันตัวเอง และแนวทางเก็บพยานหลักฐานให้ถูกต้อง',
    icon: Siren,
    sections: [
      {
        title: 'เมื่อเกิดเหตุ',
        items: [
          'แจ้งสายด่วน/ตำรวจ 191 บันทึกเหตุเวลา–สถานที่',
          'เก็บวิดีโอ/ภาพถ่าย/บันทึกกล้อง พร้อมรายชื่อพยาน',
          'ไปตรวจร่างกายและเก็บใบรับรองแพทย์ทันทีในคดีทำร้าย/คดีเพศ',
        ],
      },
      {
        title: 'สิทธิพื้นฐาน',
        items: [
          'สิทธิแจ้งความร้องทุกข์และติดตามคดี',
          'สิทธิผู้เสียหายได้รับการคุ้มครอง/เยียวยาบางกรณี',
          'กรณีป้องกันตัว ต้องเป็น “จำเป็นพอสมควรแก่เหตุ” เพื่อละเว้นความผิด',
        ],
      },
    ],
  },
  {
    slug: 'labour-rights',
    title: 'สิทธิแรงงาน',
    badge: 'ข้อมูลทั่วไป—ไม่ใช่คำปรึกษาเฉพาะกรณี',
    lead:
      'สิทธิค่าจ้าง วันหยุด ลากิจ ลาป่วย ลาคลอด ค่าชดเชยเลิกจ้าง รวมถึงกระบวนการร้องเรียนและฟ้องศาลแรงงาน',
    icon: Users,
    sections: [
      {
        title: 'สิทธิหลัก',
        items: [
          'ได้รับค่าจ้างไม่น้อยกว่าค่าจ้างขั้นต่ำและตรงตามเวลาทำงาน',
          'วันหยุดประจำสัปดาห์ ลาพักร้อน ลาป่วย ลาคลอดตามกฎหมาย',
          'ค่าชดเชยเมื่อเลิกจ้างโดยไม่มีเหตุอันสมควร และค่าบอกกล่าวล่วงหน้า',
        ],
      },
      {
        title: 'เมื่อถูกละเมิดสิทธิ',
        items: [
          'รวบรวมหลักฐานการทำงาน/สลิป/สัญญาจ้าง/ใบลงเวลาทำงาน',
          'ร้องเรียนพนักงานตรวจแรงงาน/ไกล่เกลี่ย',
          'ฟ้องคดีแรงงานเพื่อเรียกค่าจ้าง/ค่าชดเชย/ดอกเบี้ย',
        ],
      },
    ],
  },
  {
    slug: 'will',
    title: 'การทำพินัยกรรม',
    badge: 'ข้อมูลทั่วไป—ไม่ใช่คำปรึกษาเฉพาะกรณี',
    lead:
      'การกำหนดผู้รับทรัพย์สินและผู้จัดการมรดกอย่างชัดเจน ช่วยลดข้อพิพาทภายหลังและเร่งรัดการแบ่งมรดก',
    icon: Landmark,
    sections: [
      {
        title: 'รูปแบบที่พบบ่อย',
        items: [
          'พินัยกรรมทำเป็นหนังสือ ลงลายมือชื่อผู้ทำและพยานครบถ้วน',
          'พินัยกรรมเอกสารฝ่ายเมือง (ทำต่อหน้าเจ้าพนักงาน)',
          'พินัยกรรมทำเองทั้งฉบับด้วยลายมือ (ไม่มีพยานแต่ต้องถูกต้องตามแบบ)',
        ],
      },
      {
        title: 'ข้อควรระวัง',
        items: [
          'ระบุทรัพย์สิน/ผู้รับทรัพย์/ผู้จัดการมรดกให้ชัด',
          'หลีกเลี่ยงข้อกำหนดขัดต่อกฎหมาย/ศีลธรรม',
          'หากมีทายาทโดยธรรม ควรพิจารณาสิทธิขั้นต่ำและผลกระทบ',
        ],
      },
    ],
  },
  {
    slug: 'family-law',
    title: 'กฎหมายครอบครัว',
    badge: 'ข้อมูลทั่วไป—ไม่ใช่คำปรึกษาเฉพาะกรณี',
    lead:
      'หลัก ๆ ครอบคลุมการสมรส หย่า อำนาจปกครองบุตร ค่าอุปการะเลี้ยงดู และทรัพย์สินระหว่างสมรส',
    icon: Scale,
    sections: [
      {
        title: 'ประเด็นสำคัญ',
        items: [
          'การหย่าสามารถทำได้โดยความยินยอมหรือโดยคำพิพากษา',
          'ทรัพย์สินระหว่างสมรสแบ่งตามส่วนที่เหมาะสม',
          'อำนาจปกครองบุตรและค่าอุปการะเลี้ยงดูพิจารณาตามประโยชน์สูงสุดของบุตร',
        ],
      },
      {
        title: 'เอกสารที่มักต้องใช้',
        items: [
          'ทะเบียนสมรส/สูติบุตร/หลักฐานรายได้-ค่าใช้จ่าย',
          'หลักฐานการเลี้ยงดูและความผูกพันกับบุตร',
          'หลักฐานทรัพย์สินร่วม เช่น โฉนด/บัญชีเงินฝาก',
        ],
      },
    ],
  },
]

const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-200/80 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-yellow-300">
    <Info size={14} /> {text}
  </span>
)

export default function LawGrid() {
  const topics = useMemo(() => TOPICS, [])
  const [open, setOpen] = useState<LawTopic | null>(null)

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((t, i) => {
          const Icon = (t.icon ?? Info) as any
          return (
            <motion.div
              key={t.slug}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ duration: .35, delay: i * .03 }}
            >
              <Card className="rounded-3xl glass-soft ring-1 ring-white/40">
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-b from-primary-50 to-sky-50 ring-1 ring-white">
                      <Icon className="h-6 w-6 text-primary-800" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-tight">{t.title}</h3>
                      {t.badge && <div className="mt-2"><Badge text={t.badge} /></div>}
                    </div>
                  </div>

                  <button
                    className="w-full rounded-xl bg-primary-600 text-white px-4 py-2 text-sm"
                    onClick={() => setOpen(t)}
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title}>
        {open && (
          <div className="space-y-5">
            {/* บทนำ */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm px-5 py-4">
              <p className="text-slate-700">{open.lead}</p>
              {open.badge && (
                <div className="mt-3">
                  <Badge text={open.badge} />
                </div>
              )}
            </div>

            {/* Sections */}
            {open.sections.map((s, idx) => (
              <div key={idx} className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm px-5 py-4">
                <h4 className="font-semibold text-slate-900">{s.title}</h4>
                {!!s.items?.length && (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                    {s.items.map((it, i) => <li key={i}>{it}</li>)}
                  </ul>
                )}
                {s.note && <p className="mt-2 text-sm text-slate-600">{s.note}</p>}
              </div>
            ))}

            {/* Disclaimer */}
            <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 px-4 py-3 text-xs text-slate-600">
              ข้อมูลนี้จัดทำเพื่อความเข้าใจเบื้องต้น ไม่ใช่คำปรึกษากฎหมายเฉพาะกรณี
              โปรดตรวจสอบกฎหมาย/ประกาศที่ใช้บังคับล่าสุดก่อนดำเนินการ หรือปรึกษาทนายเพื่อประเมินกรณีของท่าน
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
