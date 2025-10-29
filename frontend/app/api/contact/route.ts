import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    // honeypot（hiddenのtokenに何か入ってたらbot扱い）
    if (token && token.length > 0) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    await sgMail.send({
      to: process.env.CONTACT_TO!,
      from: process.env.CONTACT_FROM!,
      subject: `【デッカマンHP】${name} さんからのお問い合わせ`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("SendGrid error:", e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
