'use client'

import { motion } from 'framer-motion'
import {
  Gavel,
  Scale,
  Briefcase,
  FileSignature,
  ScrollText,
  Users,
  Percent,
  Copyright,
} from 'lucide-react'
import { EXPERTISE } from '@/data/expertise'

/** fallback ปลอดภัยในกรณีไอคอนไม่มีในเวอร์ชันนั้น */
function safeIcon(Icon: any) { return Icon ?? ScrollText }

/** เลือกไอคอนตามชื่อหมวด */
function pickIcon(label: string) {
  if (label.includes('อาญา')) return safeIcon(Gavel)
  if (label.includes('แพ่ง') || label.includes('พาณิชย์')) return safeIcon(Scale)
  if (label.includes('ธุรกิจ')) return safeIcon(Briefcase)
  if (label.includes('นิติกรรม') || label.includes('สัญญา')) return safeIcon(FileSignature)
  if (label.includes('ทรัพย์สินทางปัญญา')) return safeIcon(Copyright)
  if (label.includes('แรงงาน')) return safeIcon(Users)
  if (label.includes('ภาษี')) return safeIcon(Percent)
  return ScrollText
}

export default function ExpertiseGrid() {
  return (
    <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {EXPERTISE.map((label, i) => {
        const Icon = pickIcon(label)
        return (
          <motion.div
            key={label}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: .25 }}
            transition={{ duration: .35, delay: i * 0.03 }}
            className="group relative rounded-[22px] bg-white/90 ring-1 ring-white/70
                       shadow-[0_12px_40px_rgba(2,6,23,.08)] hover:shadow-[0_18px_60px_rgba(2,6,23,.12)]
                       p-7 md:p-8 transition-transform hover:-translate-y-0.5"
          >
            {/* วงกลมเน้นไอคอน */}
            <div className="mx-auto h-20 w-20 grid place-items-center rounded-2xl bg-gradient-to-b from-[#eaf2ff] to-[#dfeaff] ring-1 ring-white">
              <Icon size={48} className="text-[#1e3a8a]" aria-hidden />
            </div>

            {/* ชื่อหมวด */}
            <div className="mt-6 text-center">
              <h3 className="text-lg md:text-xl font-semibold text-[#1e3a8a] leading-tight">
                {label}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                ทีมเราดูแลงานในหมวดนี้อย่างครบวงจร ทั้งให้คำปรึกษา ว่าความ และงานเอกสาร
              </p>
            </div>

            {/* แถบขอบล่างไฮไลต์เมื่อโฮเวอร์ */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-px h-1
                            bg-gradient-to-r from-transparent via-blue-300/60 to-transparent
                            translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition" />
          </motion.div>
        )
      })}
    </div>
  )
}
