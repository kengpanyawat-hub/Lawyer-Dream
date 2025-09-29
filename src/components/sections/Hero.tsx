'use client'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import Image from 'next/image'

export default function Hero(){
  return (
    <div className="relative">
      {/* ฉาก blob ไล่สีด้านหลัง */}
      <div className="absolute -top-10 -left-10 w-[380px] h-[380px] rounded-full blob" />
      <div className="absolute -bottom-16 right-0 w-[420px] h-[420px] rounded-full blob" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5, ease: 'easeOut' }}
      >
        <Card className="relative overflow-hidden glass-deep rounded-3xl">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            {/* Copy */}
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
                ให้คำปรึกษาและว่าความ อย่างมืออาชีพ ทั่วราชอาณาจักร
              </h1>
              <p className="mt-3 text-slate-700 text-lg">
                เราพร้อมให้บริการในคดีหลากหลายประเภท ด้วยความซื่อสัตย์ รวดเร็ว และมีประสิทธิภาพ
              </p>
              <div className="mt-6 flex gap-3">
                <ButtonLink href="/contact" className="min-w-44">ปรึกษาเราตอนนี้</ButtonLink>
                <ButtonLink href="/services" variant="outline">ดูบริการ</ButtonLink>
              </div>
            </div>

            {/* Visual */}
			<motion.div
			  className="relative aspect-[16/9] md:aspect-[5/3] rounded-3xl overflow-hidden"
			  initial={{ opacity: 0, scale: .98 }}
			  animate={{ opacity: 1, scale: 1 }}
			  transition={{ duration: .6, delay: .1 }}
			>
			  <Image
				src="/images/hero.jpg"          // วางไฟล์จริงไว้ที่ /public/images/hero.jpg
				alt="สำนักกฎหมายดลวัฒน์และเพื่อน (ท.ดรีม)"
				fill
				priority
				sizes="(max-width: 768px) 100vw, 50vw"
				className="object-cover"
			  />
			  {/* เลเยอร์แก้วบางๆ ให้ฟีล glass บนภาพ */}
			  <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-[0px]" />
			</motion.div>

          </div>
        </Card>
      </motion.div>
    </div>
  )
}
