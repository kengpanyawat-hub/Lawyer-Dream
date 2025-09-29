import { NextRequest, NextResponse } from 'next/server'
  import nodemailer from 'nodemailer'

  export async function POST(req: NextRequest){
    const data = await req.json().catch(()=>null)
    if(!data || (data.company && data.company !== '')){ // honeypot
      return NextResponse.json({ ok: true })
    }
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
    try{
      if(!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO){
        // Demo mode: log only (avoid runtime crash without SMTP)
        console.log('Contact form (demo):', data)
        return NextResponse.json({ ok: true })
      }
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      })
      await transporter.sendMail({
        from: `"Website Contact" <${SMTP_USER}>`,
        to: CONTACT_TO,
        subject: `[ติดต่อจากเว็บ] ${data.subject || 'ไม่มีหัวข้อ'}`,
        text: `ชื่อ: ${data.name}
อีเมล: ${data.email}
โทร: ${data.phone}

ข้อความ:
${data.message}`
      })
      return NextResponse.json({ ok: true })
    }catch(e){
      console.error(e)
      return NextResponse.json({ ok: false }, { status: 500 })
    }
  }
