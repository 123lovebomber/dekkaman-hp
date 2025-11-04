import { NextResponse } from "next/server";

const TO_EMAIL = "contact@dekkaman.jp"; // ← 受信したい宛先
const ALLOW_ORIGIN = "https://dekkaman.jp"; // ← フォームを設置しているサイト

function corsHeaders(origin: string | null) {
  const allowed = origin === ALLOW_ORIGIN ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  const data = await req.json().catch(() => null);
  if (!data) {
    return NextResponse.json({ error: "bad request" }, { status: 400, headers });
  }

  // 簡易バリデーション
  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "missing fields" }, { status: 422, headers });
  }

  // メール本文（JSONを整形）
  const textBody = Object.entries(data)
    .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
    .join("\n");

  // Resend経由で送信
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "no-reply@dekkaman.jp", // Resendで認証済みドメイン
      to: [TO_EMAIL],
      reply_to: data.email,          // お客様への返信用
      subject: "【DEKKAMAN】お問い合わせを受け付けました。担当者よりご連絡いたします。",
      text: textBody,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error("Resend error:", err);
    return NextResponse.json({ error: "send failed" }, { status: 500, headers });
  }

  return NextResponse.json({ ok: true }, { headers });
}
