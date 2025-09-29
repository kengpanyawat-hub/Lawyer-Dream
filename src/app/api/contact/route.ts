import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// บังคับให้รันบน Node.js (ไม่ใช่ Edge)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)

  // ป้องกันกรณี payload ว่าง
  if (!data) {
    return NextResponse.json({ ok: false, message: 'Invalid payload' }, { status: 400 })
  }

  // ใช้ dynamic import เพื่อหลีกเลี่ยงปัญหา type/bundle
  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  const html = `
    <h3>ข้อความจากฟอร์มติดต่อ</h3>
    <p><b>ชื่อ:</b> ${data.name ?? '-'}</p>
    <p><b>อีเมล:</b> ${data.email ?? '-'}</p>
    <p><b>โทรศัพท์:</b> ${data.phone ?? '-'}</p>
    <p><b>หัวข้อ:</b> ${data.subject ?? '-'}</p>
    <p><b>ข้อความ:</b><br/>${(data.message ?? '').toString().replace(/\n/g, '<br/>')}</p>
  `

  try {
    await transporter.sendMail({
      from: `"Website" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? process.env.SMTP_USER,
      subject: `New contact: ${data.subject ?? 'ข้อความจากเว็บไซต์'}`,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('sendMail error:', err)
    return NextResponse.json({ ok: false, message: 'Email failed' }, { status: 500 })
  }
}
