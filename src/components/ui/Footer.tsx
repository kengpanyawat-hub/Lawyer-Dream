// components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Facebook, Phone } from "lucide-react";

/* ===== LINE Icon ===== */
function LineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden {...props}>
      <path d="M39.6 8.4C36.8 5.6 32.6 4 28 4H20C11.2 4 4 10 4 17.6c0 5.5 3.9 10.2 9.6 12.5-.2.8-1.2 4.4-1.3 5-.2.9.3 1.1 1 1 .8-.1 5.1-3.4 5.9-3.9 2.4.4 4.8.5 7.3.2 8.8-1.2 15.5-7.9 15.5-15.8 0-4.3-1.8-7.9-5.4-10.2z" />
    </svg>
  );
}

/* ===== Types (optional) ===== */
type CmsSiteSettings = {
  footer?: {
    logoUrl?: string;
    socials?: { facebook?: string; line?: string; tel?: string };
    menu?: { label: string; href: string; external?: boolean }[];
  };
};

/* ===== Defaults ===== */
const FALLBACK_LOGO = "/images/logo.jpg";
const FALLBACK_SOCIALS = {
  facebook: "https://facebook.com/",                // เปลี่ยนเป็นเพจจริงได้
  line: "https://line.me/R/ti/p/%40128rwwqd",      // LINE Official: @128rwwqd
  tel: "tel:+66850005009",                          // 085-0005009
};
const FALLBACK_MENU = [
  { label: "หน้าแรก", href: "/" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "บริการของเรา", href: "/services" },
  { label: "ความเชี่ยวชาญ", href: "/expertise" },
  { label: "กฎหมายที่ควรรู้", href: "/laws" },
  { label: "บทความ", href: "/blog" },
  { label: "ผลงานของเรา", href: "/portfolio" },
  { label: "ติดต่อเรา", href: "/contact" },
];

export default function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  const [cms, setCms] = useState<CmsSiteSettings | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/cms/site-settings", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as CmsSiteSettings;
        if (alive) setCms(data);
      } catch {}
    })();
    return () => { alive = false };
  }, []);

  const logoSrc = cms?.footer?.logoUrl || FALLBACK_LOGO;
  const socials = { ...FALLBACK_SOCIALS, ...(cms?.footer?.socials || {}) };
  const menu = useMemo(() => (cms?.footer?.menu?.length ? cms.footer.menu : FALLBACK_MENU), [cms]);

  return (
    <footer
      className="
        relative mt-16 text-white
        border-t border-sky-200/30
        bg-gradient-to-b from-blue-500 to-blue-400
        backdrop-blur-sm
      "
      aria-labelledby="site-footer"
    >
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                   bg-[radial-gradient(90%_75%_at_65%_0%,rgba(255,255,255,.10),transparent_65%),radial-gradient(30%_35%_at_35%_10%,rgba(255,255,255,.08),transparent_65%)]"
      />

      <div className="container-max px-6 py-12">
        <h2 id="site-footer" className="sr-only">ส่วนท้ายเว็บไซต์</h2>

        {/* Brand */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative h-12 w-[240px]">
            <Image
              src={logoSrc}
              alt="สำนักกฎหมายดลวัฒน์และเพื่อน (ท.ดรีม)"
              fill sizes="240px" className="object-contain drop-shadow"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
          </div>
          <p className="text-white/90 text-sm">
            สำนักกฎหมายดลวัฒน์และเพื่อน (ท.ดรีม) • ให้คำปรึกษาและว่าความทั่วราชอาณาจักร
          </p>
        </div>

        {/* Socials */}
        <ul className="mt-6 flex items-center justify-center gap-4">
          <Social href={socials.facebook} label="Facebook">
            <Facebook className="h-5 w-5" />
          </Social>
          <Social href={socials.line} label="LINE">
            <LineIcon className="h-5 w-5" />
          </Social>
          <Social href={socials.tel} label="โทรศัพท์" tel>
            <Phone className="h-5 w-5" />
          </Social>
        </ul>

        {/* Menu */}
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px]" aria-label="เมนูส่วนท้าย">
          {menu.map((l) =>
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                 className="font-medium text-white/90 hover:text-white">
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href} className="font-medium text-white/90 hover:text-white">
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* Contact line */}
        <div className="mt-6 text-center text-sm text-white/95">
          โทร. <a className="underline decoration-white/40 hover:decoration-white" href="tel:+66850005009">085-0005009</a> •
          อีเมล <a className="underline decoration-white/40 hover:decoration-white" href="mailto:donlawatlaw@gmail.com">donlawatlaw@gmail.com</a> •
          LINE: <a className="underline decoration-white/40 hover:decoration-white" href="https://line.me/R/ti/p/%40128rwwqd">@128rwwqd</a>
        </div>

        {/* Copyright */}
        <div className="mt-5 text-center text-xs text-white/80">
          © {year} สำนักกฎหมายดลวัฒน์และเพื่อน — สงวนลิขสิทธิ์
        </div>
      </div>
    </footer>
  );
}

/* ---- Social Button ---- */
function Social({
  href, label, tel = false, children,
}: { href: string; label: string; tel?: boolean; children: React.ReactNode }) {
  const isTel = tel || href?.startsWith("tel:");
  return (
    <li>
      <a
        href={href}
        {...(isTel ? {} : { target: "_blank", rel: "noreferrer" })}
        aria-label={label}
        className="
          group inline-flex h-11 w-11 items-center justify-center
          rounded-full border border-white/25
          bg-white/10 hover:bg-white/15
          hover:border-white/40 transition
          text-white
        "
      >
        {children}
      </a>
    </li>
  );
}
