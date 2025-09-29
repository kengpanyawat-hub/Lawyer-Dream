'use client'
import Card from '@/components/ui/Card'
import { REVIEWS } from '@/data/reviews'

/**
 * แสดงรีวิว 2 แถวแบบ marquee
 * - แถวบนเลื่อนไปทางซ้าย, แถวล่างเลื่อนไปทางขวา
 * - ใช้ CSS keyframes ภายใน component (ไม่ต้องแก้ tailwind config)
 */
export default function Reviews() {
  const row1 = REVIEWS.slice(0, 10)
  const row2 = REVIEWS.slice(10, 20)

  return (
    <div className="space-y-4">
      <MarqueeRow items={row1} reverse={false} />
      <MarqueeRow items={row2} reverse />
      {/* สไตล์ animation ภายใน component เพื่อไม่กระทบส่วนอื่น */}
      <style jsx global>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 16px;
        }
        .marquee-anim-left  { animation: slideLeft 30s linear infinite; }
        .marquee-anim-right { animation: slideRight 30s linear infinite; }
        @media (max-width: 768px){
          .marquee-anim-left, .marquee-anim-right { animation-duration: 24s; }
        }
      `}</style>
    </div>
  )
}

function MarqueeRow({ items, reverse }: { items: typeof REVIEWS; reverse?: boolean }) {
  // ทำซ้ำ 2 ชุดเพื่อเลื่อนวนต่อเนื่อง
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden">
      <div className={`marquee-track ${reverse ? 'marquee-anim-right' : 'marquee-anim-left'}`}>
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} name={r.name} text={r.text} />
        ))}
      </div>
      {/* gradient mask ขอบซ้าย-ขวาให้เนียน */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/70 to-transparent" />
    </div>
  )
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <Card className="min-w-[280px] max-w-[320px]">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-9 w-9 rounded-full bg-primary-100 text-primary-700 grid place-items-center font-semibold">
          {name.replace('คุณ ', '').slice(0,1)}
        </div>
        <div className="text-sm font-medium">{name}</div>
      </div>
      <p className="text-sm text-slate-700">{text}</p>
    </Card>
  )
}
