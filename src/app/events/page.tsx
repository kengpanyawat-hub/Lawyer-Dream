import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { EVENTS, formatThaiDate } from '@/data/events';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const metadata = { title: 'ข่าวสารและกิจกรรม' };

const CATEGORIES = [
  'กิจกรรม',
  'ข่าวนิติ',
  'ประชุม/สัมมนา/อบรม',
  'การศึกษา',
  'จัดซื้อจัดจ้าง',
  'รับสมัครบุคลากร',
] as const;

function CategoryGrid({ list }: { list: typeof EVENTS }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((ev, i) => (
        <Card key={ev.slug} className="overflow-hidden">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
            <Image
              src={ev.image}
              alt={ev.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 360px"
              priority={inView && i < 4}         // เลื่อนถึงแล้วรูป 4 ใบแรกจะโหลดทันที
              loading={inView ? 'eager' : 'lazy'}
            />
          </div>
          <div className="mt-3 space-y-2">
            <h3 className="font-semibold line-clamp-2">{ev.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-2">{ev.excerpt}</p>
            <div className="text-xs text-slate-500">{formatThaiDate(ev.date)}</div>
            <Link href={`/events/${ev.slug}`} className="inline-flex text-primary-700 hover:underline text-sm">อ่านต่อ</Link>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function EventsIndex() {
  return (
    <div className="relative container-max my-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">ข่าวสารและกิจกรรม</h1>

      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map(c => (
          <a key={c} href={`#${encodeURIComponent(c)}`} className="btn-ghost">{c}</a>
        ))}
      </div>

      {CATEGORIES.map((cat) => {
        const list = EVENTS.filter(e => e.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} id={encodeURIComponent(cat)} className="space-y-4 mb-10">
            <h2 className="text-xl font-semibold">{cat}</h2>
            <CategoryGrid list={list} />
          </section>
        );
      })}
    </div>
  );
}
