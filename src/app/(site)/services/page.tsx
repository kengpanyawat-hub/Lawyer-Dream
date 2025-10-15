'use client'

import ServicesGrid from '@/components/sections/ServicesGrid'

export default function ServicesPage(){
  return (
    <div className="relative space-y-8">
      {/* background bubbles */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-10 w-[460px] h-[460px] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 right-0 w-[560px] h-[560px] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />

      {/* page header */}
      <header className="relative">
        <div className="rounded-3xl glass-deep ring-1 ring-white/40 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">บริการของเรา</h1>
          <p className="mt-3 text-slate-700 max-w-3xl">
            ให้คำปรึกษาและว่าความอย่างมืออาชีพ ครอบคลุมคดีแพ่ง อาญา ครอบครัว ผู้บริโภค แรงงาน บังคับคดี คดีปกครอง เป็นทนายความให้ผู้ต้องหาในชั้นสอบสวน ประกันตัวผู้ต้องหารหรือจำเลย ในคดีอาญา เจรจาไกล่เกลี่ย ประนอมข้อพิพาท ดำเนินคดีในชั้นสอบสอบศาลชั้นต้น ศาลอุทธรณ์ และศาลฎีกา
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">คุยเบื้องต้นฟรี</span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">ค่าบริการโปร่งใส</span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1 ring-1 ring-slate-200">พื้นที่บริการ: ทั่วราชอาณาจักร</span>
          </div>
        </div>
      </header>

      {/* grid */}
      <ServicesGrid />
    </div>
  )
}
