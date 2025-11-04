// import { NextResponse } from "next/server";

// const TO_EMAIL = "contact@dekkaman.jp"; // ← 受信したい宛先
// const ALLOW_ORIGIN = "https://dekkaman.jp"; // ← フォームを設置しているサイト

// function corsHeaders(origin: string | null) {
//   const allowed = origin === ALLOW_ORIGIN ? origin : "";
//   return {
//     "Access-Control-Allow-Origin": allowed,
//     "Access-Control-Allow-Methods": "POST, OPTIONS",
//     "Access-Control-Allow-Headers": "content-type",
//   };
// }

// export async function OPTIONS(req: Request) {
//   return new NextResponse(null, { headers: corsHeaders(req.headers.get("origin")) });
// }

// export async function POST(req: Request) {
//   const origin = req.headers.get("origin");
//   const headers = corsHeaders(origin);

//   const data = await req.json().catch(() => null);
//   if (!data) {
//     return NextResponse.json({ error: "bad request" }, { status: 400, headers });
//   }

//   // 簡易バリデーション
//   if (!data.name || !data.email || !data.message) {
//     return NextResponse.json({ error: "missing fields" }, { status: 422, headers });
//   }

//   // メール本文（JSONを整形）
//   const textBody = Object.entries(data)
//     .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
//     .join("\n");

//   // Resend経由で送信
//   const res = await fetch("https://api.resend.com/emails", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       from: "no-reply@dekkaman.jp", // Resendで認証済みドメイン
//       to: [TO_EMAIL],
//       reply_to: data.email,          // お客様への返信用
//       subject: "【DEKKAMAN】お問い合わせを受け付けました。担当者よりご連絡いたします。",
//       text: textBody,
//     }),
//   });

//   if (!res.ok) {
//     const err = await res.text().catch(() => "");
//     console.error("Resend error:", err);
//     return NextResponse.json({ error: "send failed" }, { status: 500, headers });
//   }

//   return NextResponse.json({ ok: true }, { headers });
// }
// frontend/app/api/contact/route.ts
export const runtime = 'edge';          // ★ 必須：Edge Runtime
export const dynamic = 'force-dynamic'; // 念のため（常に動的）

import { NextResponse } from "next/server";

/** どのサイト→どの宛先に送るかのマップ（本番は必要な分だけ） */
const ROUTE_MAP: Record<string, { to: string[]; subjectPrefix: string }> = {
  "dekkaman.jp": { to: [process.env.CONTACT_TO || "contact@dekkaman.jp"], subjectPrefix: "[MAIN]" },
  "app.dekkaman.jp": { to: [process.env.APP_CONTACT_TO || "app-inquiry@dekkaman.jp"], subjectPrefix: "[APP]" },
};

const ALLOW_ORIGINS = [
  "https://dekkaman.jp",
  "https://app.dekkaman.jp",
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOW_ORIGINS.includes(origin) ? origin : "";
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
  const host = req.headers.get("host") || ""; // 例: dekkaman.jp, app.dekkaman.jp
  const headers = corsHeaders(origin);

  // 1) 送信元ドメインを判定
  const siteKey = ROUTE_MAP[host] ? host : (origin ? new URL(origin).host : "dekkaman.jp");
  const route = ROUTE_MAP[siteKey] ?? ROUTE_MAP["dekkaman.jp"];

  // 2) ボディ取得・最低限のバリデーション
  const data = await req.json().catch(() => null);
  if (!data) return NextResponse.json({ error: "bad request" }, { status: 400, headers });

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "missing fields" }, { status: 422, headers });
  }

  // 3) Resend でメール送信
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "missing RESEND_API_KEY" }, { status: 500, headers });
  }

  const textBody = Object.entries(data)
    .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
    .join("\n");

  const from = process.env.CONTACT_FROM || "no-reply@dekkaman.jp";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,                       // 送信元（認証済みドメイン）
      to: route.to,               // 送信先（ドメインごとに分岐）
      reply_to: data.email,       // 返信先にユーザーのメール
      subject: `${route.subjectPrefix} お問い合わせ（${siteKey}）`,
      text: textBody,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    // console.error は Edge でもOK（ログに出る）
    console.error("Resend error:", err);
    return NextResponse.json({ error: "send failed" }, { status: 500, headers });
  }

  return NextResponse.json({ ok: true }, { headers });
}
