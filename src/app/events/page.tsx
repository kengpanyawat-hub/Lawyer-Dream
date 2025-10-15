import Link from 'next/link';
import Card from '@/components/ui/Card';
import { EVENTS, formatThaiDate } from '@/data/events';

/** ใช้ชนิดแบบยืดหยุ่นเฉพาะไฟล์นี้ เพื่อไม่ไปแก้ type กลางของโปรเจ็กต์ */
type LooseEvent = Record<string, any>;

export const metadata = { title: 'ข่าวสารและกิจกรรม' };

export default function EventsPage() {
  // แปลงเป็นชนิดยืดหยุ่น เพื่อให้รองรับฟิลด์เสริม (เช่น cover หรือ images)
  const list = EVENTS as unknown as LooseEvent[];

  return (
    <div className="space-y-6">
      <header className="rounded-3xl glass-deep ring-1 ring-white/40 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">ข่าวสารและกิจกรรม</h1>
        <p className="mt-3 text-slate-700">
          รวมอัปเดตงาน กิจกรรม และผลงานที่น่าสนใจของทีมงาน เพื่อให้คุณติดตามความเคลื่อนไหวได้อย่างต่อเนื่อง
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((ev: LooseEvent) => {
          // รองรับทั้ง ev.cover, ev.image, ev.images[0]
          const cover: string | null =
            (ev?.cover as string | undefined) ??
            (ev?.image as string | undefined) ??
            (Array.isArray(ev?.images) ? (ev.images[0] as string | undefined) : undefined) ??
            null;

          return (
            <Card key={ev.slug} className="flex flex-col overflow-hidden">
              {/* รูปปก (ถ้ามี) */}
              {cover && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={cover}
                    alt={ev.title ?? 'cover'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                {/* วันที่ */}
                <div className="text-xs text-slate-500">
                  {ev.date ? formatThaiDate(ev.date) : null}
                </div>

                {/* ชื่อเรื่อง */}
                <h3 className="mt-1 text-lg font-semibold text-slate-900 line-clamp-2">
                  {ev.title}
                </h3>

                {/* คำโปรย (ถ้ามี) */}
                {ev.summary && (
                  <p className="mt-2 text-sm text-slate-700 line-clamp-3">{ev.summary}</p>
                )}

                {/* แท็ก (ถ้ามี) */}
                {Array.isArray(ev.tags) && ev.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ev.tags.map((t: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    href={`/events/${ev.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-primary-700"
                  >
                    อ่านรายละเอียด
                    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90">
                      <path
                        fill="currentColor"
                        d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
