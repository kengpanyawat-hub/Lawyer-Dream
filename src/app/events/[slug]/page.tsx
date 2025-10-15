import Image from 'next/image';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { EVENTS, formatThaiDate } from '@/data/events';

export async function generateStaticParams() {
  return EVENTS.map(e => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = EVENTS.find(e => e.slug === params.slug);
  return {
    title: item ? `${item.title}` : 'กิจกรรม',
    description: item?.excerpt ?? 'ข่าวสารและกิจกรรม',
  };
}

export default function EventDetail({ params }: { params: { slug: string } }) {
  const ev = EVENTS.find(e => e.slug === params.slug);
  if (!ev) return <div className="container-max my-10">ไม่พบข้อมูลกิจกรรม</div>;

  return (
    <div className="container-max my-10">
      <Link href="/events" className="text-sm text-primary-700 hover:underline">← กลับหน้าข่าวสารและกิจกรรม</Link>

      <div className="mt-3 grid gap-8 lg:grid-cols-[1.4fr,.9fr]">
        <article>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{ev.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{ev.category} • {formatThaiDate(ev.date)}</p>

          <Card className="mt-4 overflow-hidden">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
              <Image src={ev.image} alt={ev.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 720px" />
            </div>
          </Card>

          <div className="prose prose-slate max-w-none mt-6" dangerouslySetInnerHTML={{ __html: ev.contentHtml }} />
        </article>

        <aside className="space-y-3">
          <h2 className="text-lg font-semibold">กิจกรรมล่าสุด</h2>
          <div className="space-y-3">
            {EVENTS.slice(0, 6).filter(e => e.slug !== ev.slug).map(e => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="block rounded-2xl bg-white/70 ring-1 ring-slate-200 p-3 hover:bg-white">
                <div className="text-sm font-medium line-clamp-2">{e.title}</div>
                <div className="text-xs text-slate-500">{formatThaiDate(e.date)}</div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
