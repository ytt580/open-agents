import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body } = await req.json()

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'Campos obrigatorios: to, subject, body' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'yttzinkkj@gmail.com',
        pass: process.env.EMAIL_PASS || '',
      },
    })

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'yttzinkkj@gmail.com',
      to,
      subject,
      html: body,
    })

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json({ error: 'Falha ao enviar email' }, { status: 500 })
  }
}
