// frontend/app/api/contact/route.ts
export const runtime = "edge"; // ★必須（next-on-pagesはEdge前提）

export async function POST(req: Request) {
  // ひとまずスタブ：200だけ返す（後でSendGrid処理を足す）
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
