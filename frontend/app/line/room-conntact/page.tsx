"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

type PageProps = {
    searchParams: {
        room_id?: string;
    };
};

const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ROOM_CONTACT_ID;

export default function RoomContactPage({ searchParams }: PageProps) {
    const roomId = searchParams.room_id ?? "";
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!liffId) {
            setError("LIFF ID が設定されていません。");
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

        try {
            const text = `物件ID：${roomId} に問い合わせ希望です。`;

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
                    <p className="text-sm text-zinc-800 mb-4">
                        <span className="font-medium">物件ID：</span>
                        {roomId} に問い合わせます。
                    </p>
                ) : (
                    <p className="text-sm text-red-600 mb-4">
                        物件IDが取得できませんでした。物件ページからアクセスし直してください。
                    </p>
                )}

                <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                    下のボタンを押すと、
                    <br />
                    「物件ID：{roomId || "（不明）"} に問い合わせ希望です。」
                    <br />
                    というメッセージがLINEトークに送信されます。
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
