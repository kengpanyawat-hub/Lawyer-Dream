'use client'
import { useMemo } from 'react'

/**
 * พื้นหลังแบบฟองกลมเบลอ ไล่สีฟ้า
 * - วางแบบ absolute เต็มหน้าจอ
 * - ใช้ pointer-events-none เพื่อไม่บดบังการคลิก
 * - มีแอนิเมชันลอยช้า ๆ (pure CSS)
 */
export default function BubblesBG() {
  const bubbles = useMemo(() => ([
    { x:'-10%', y:'-8%',  size:380, delay:0  },
    { x:'72%',  y:'-6%',  size:420, delay:2  },
    { x:'8%',   y:'40%',  size:360, delay:4  },
    { x:'78%',  y:'58%',  size:440, delay:6  },
    { x:'45%',  y:'80%',  size:500, delay:8  },
  ]), [])

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* พื้นหลัง gradient หลัก */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#eaf2ff_0%,#f6f9ff_100%)]" />
      {/* ฟองเบลอ */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: b.x, top: b.y, width: b.size, height: b.size,
            animationDelay: `${b.delay}s`
          }}
        />
      ))}
    </div>
  )
}
