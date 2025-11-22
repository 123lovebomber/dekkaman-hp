"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ROOM_CONTACT_ID;

// LINE公式アカウントのベーシックID
const OA_BASIC_ID_BASIC = "@293emdcg";
const OA_BASIC_ID_PREMIUM = "@dekkaman"; // 今回はこちらをフォールバック先として使用

export default function RoomContactPage() {
    const [roomId, setRoomId] = useState("");
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // --- URL から room_id を取得 ---
        try {
            const url = new URL(window.location.href);

            // ① まずは普通に ?room_id= を見る
            let id = url.searchParams.get("room_id") ?? "";

            // ② なければ liff.state から頑張って拾う
            if (!id) {
                const rawState = url.searchParams.get("liff.state");
                if (rawState) {
                    try {
                        // 1段階 decode
                        let decoded = decodeURIComponent(rawState);
                        // 例: "?room_id=2309" / "room_id=2309" / "?liff.state=%3Froom_id%3D2309" など

                        // 中にさらに "liff.state=" がいる場合は、そこから先を再度 decode
                        if (decoded.includes("liff.state=")) {
                            const idx = decoded.indexOf("liff.state=");
                            let inner = decoded.substring(idx + "liff.state=".length);
                            inner = decodeURIComponent(inner); // "?room_id=2309" を想定
                            decoded = inner;
                        }

                        const qp = new URLSearchParams(
                            decoded.startsWith("?") ? decoded.slice(1) : decoded
                        );
                        const fromState = qp.get("room_id");
                        if (fromState) {
                            id = fromState;
                        }
                    } catch (e) {
                        console.error("[RoomContact] liff.state parse error", e);
                    }
                }
            }

            setRoomId(id);
            console.log("[RoomContact] final roomId =", id);
        } catch (e) {
            console.error("[RoomContact] URL parse error", e);
            setRoomId("");
        }

        // --- LIFF 初期化 ---
        if (!liffId) {
            setError("LIFF ID が設定されていません。管理者にお問い合わせください。");
            return;
        }

        (async () => {
            try {
                await liff.init({ liffId });
                setReady(true);
            } catch (e) {
                console.error("LIFF init error", e);
                setError("LINE の起動に失敗しました。時間をおいてお試しください。");
            }
        })();
    }, []);

    const handleSend = async () => {
        if (!roomId) {
            setError("物件IDが取得できませんでした。物件ページからアクセスし直してください。");
            return;
        }

        const text = `物件ID：${roomId} について問い合わせ希望です。（初期費用の確認・内見予約・お申し込みの相談をしたいです）`;

        try {
            // ① 通常ルート：LIFF からそのままメッセージ送信
            await liff.sendMessages([
                {
                    type: "text",
                    text,
                },
            ]);
            liff.closeWindow();
        } catch (e) {
            console.error("sendMessages error, fallback to OA chat link", e);

            // ② 失敗したら OA のトーク画面に飛ばしてしまう（テキストプリセット付き）
            const basicIdToUse = OA_BASIC_ID_PREMIUM; // 運用上ここを切り替えればOK
            const encodedText = encodeURIComponent(text);
            const url = `https://line.me/R/oaMessage/${encodeURIComponent(
                basicIdToUse
            )}/?${encodedText}`;

            window.location.href = url;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-md p-6">
                <h1 className="text-lg font-semibold mb-3">この物件に問い合わせる</h1>

                {roomId ? (
                    <p className="text-sm text-zinc-800 mb-3">
                        <span className="font-medium">物件ID：</span>
                        {roomId} についてお問い合わせいただけます。
                    </p>
                ) : (
                    <p className="text-sm text-red-600 mb-3">
                        物件IDが取得できませんでした。物件ページからアクセスし直してください。
                    </p>
                )}

                <p className="text-xs text-zinc-700 mb-4 leading-relaxed">
                    初期費用の確認・内見のご予約・お申し込みの手続きについて
                    <br />
                    このLINEトークでまとめてご相談いただけます。
                </p>

                <p className="text-[11px] text-zinc-500 mb-6 leading-relaxed">
                    下のボタンを押すと、
                    <br />
                    「物件ID：{roomId || "（不明）"} について問い合わせ希望です。
                    （初期費用の確認・内見予約・お申し込みの相談をしたいです）」という
                    メッセージが弊社公式LINEに送信されます。
                </p>

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={!ready || !roomId}
                    className="w-full rounded-lg bg-emerald-500 text-white text-sm font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    この内容で送信する
                </button>

                {error && (
                    <p className="mt-4 text-xs text-red-600 whitespace-pre-line">{error}</p>
                )}

                <p className="mt-4 text-[10px] text-zinc-400">
                    ※うまく画面が閉じない場合は、左上の「×」ボタンで閉じてください。
                </p>
            </div>
        </div>
    );
}
