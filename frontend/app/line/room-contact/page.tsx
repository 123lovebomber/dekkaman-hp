"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ROOM_CONTACT_ID;

export default function RoomContactPage() {
    const [roomId, setRoomId] = useState("");
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // --- URL から room_id を取得 ---
        try {
            const url = new URL(window.location.href);
            const id = url.searchParams.get("room_id") ?? "";
            setRoomId(id);
            console.log("[RoomContact] location.search =", url.search, "room_id =", id);
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
                setError("LINE の起動に失敗しました。時間をおいて再度お試しください。");
            }
        })();
    }, []);

    const handleSend = async () => {
        if (!roomId) {
            setError("物件IDが取得できませんでした。物件ページからアクセスし直してください。");
            return;
        }

        try {
            const text = `物件ID：${roomId} について問い合わせ希望です。（初期費用の確認・内見予約・お申し込みの相談をしたいです）`;

            await liff.sendMessages([
                {
                    type: "text",
                    text,
                },
            ]);

            liff.closeWindow();
        } catch (e) {
            console.error("sendMessages error", e);
            setError("メッセージの送信に失敗しました。時間をおいて再度お試しください。");
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
                    「物件ID：{roomId || "（不明）"} について問い合わせ希望です。」という
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
