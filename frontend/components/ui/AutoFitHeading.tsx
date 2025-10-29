"use client";
import { useLayoutEffect, useRef } from "react";

type Props = {
    text: string;
    className?: string;
    /** px 単位：PCでの上限フォントサイズ */
    maxPx?: number;
    /** px 単位：最小フォントサイズ（スマホでの保険） */
    minPx?: number;
};

export default function AutoFitHeading({
    text,
    className = "",
    maxPx = 56,   // 例: 56px ≒ 3.5rem
    minPx = 22,   // 例: 22px
}: Props) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    useLayoutEffect(() => {
        const wrap = wrapRef.current;
        const span = spanRef.current;
        if (!wrap || !span) return;

        const fit = () => {
            // まず最大サイズでセットしてから測る
            span.style.fontSize = `${maxPx}px`;
            // 1 行固定なので scrollWidth で幅を取得
            const targetW = wrap.clientWidth;
            const actualW = span.scrollWidth;

            if (targetW <= 0 || actualW <= 0) return;

            // 余白を少し残してフィット（-2%）
            const ratio = (targetW * 0.98) / actualW;
            const next = Math.max(minPx, Math.min(maxPx, Math.floor(maxPx * Math.min(1, ratio))));
            span.style.fontSize = `${next}px`;
        };

        // 初回
        fit();
        // リサイズ監視（親幅変化にも追従）
        const ro = new ResizeObserver(fit);
        ro.observe(wrap);

        // フォント読み込み後の揺れ対策
        const fontsReady = (document as any)?.fonts?.ready;
        fontsReady?.then?.(fit).catch(() => { });

        return () => ro.disconnect();
    }, [maxPx, minPx]);

    return (
        <div ref={wrapRef} className="w-full overflow-hidden">
            <span
                ref={spanRef}
                className={`block whitespace-nowrap leading-tight tracking-tight ${className}`}
                aria-label={text}
            >
                {text}
            </span>
        </div>
    );
}
