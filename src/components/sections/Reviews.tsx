'use client';

import { Star, ShieldCheck, Quote } from 'lucide-react';
import Card from '@/components/ui/Card';
import { REVIEWS } from '@/data/reviews';
import React from 'react';

// ดาวให้ screen reader อ่านได้
function Stars({ count }: { count: number }) {
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`ให้คะแนน ${count} จาก 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function BadgeVerified() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
      <ShieldCheck className="h-3.5 w-3.5" /> ยืนยันตัวตนแล้ว
    </span>
  );
}

export default function ReviewsSection() {
  // คำนวณคะแนนเฉลี่ยภายในไฟล์ (เลี่ยงการ import ฟังก์ชันที่ไม่มี export)
  const avg =
    REVIEWS.length > 0
      ? Math.round(
          (REVIEWS.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / REVIEWS.length) * 10
        ) / 10
      : 5;

  return (
    <section className="container-max my-10">
      {/* Header (เผื่อไว้ขยายในอนาคต) */}
      <div className="mb-4 flex items-end justify-between gap-4" />

      {/* Grid */}
      <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REVIEWS.map((r) => (
          <Card key={r.id} className="relative overflow-hidden">
            {/* quote deco */}
            <Quote className="absolute -right-2 -top-2 h-10 w-10 text-slate-200" aria-hidden />

            <div className="flex items-start gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-slate-900">{r.nameMasked}</p>
                  {r.verified && <BadgeVerified />}
                </div>
              </div>
              <Stars count={r.rating} />
            </div>

            <p className="mt-3 leading-relaxed text-slate-700">{r.content}</p>
          </Card>
        ))}
      </div>

      {/* JSON-LD เพื่อ SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product', // ใช้เป็นบริการของสำนักงาน
            name: 'บริการให้คำปรึกษากฎหมายและว่าความ',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: avg || 5,
              reviewCount: REVIEWS.length,
              bestRating: 5,
              worstRating: 1,
            },
            review: REVIEWS.map((r) => ({
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: r.rating,
                bestRating: 5,
                worstRating: 1,
              },
              author: { '@type': 'Person', name: r.nameMasked },
              reviewBody: r.content,
              datePublished: r.date,
            })),
          }),
        }}
      />
    </section>
  );
}
