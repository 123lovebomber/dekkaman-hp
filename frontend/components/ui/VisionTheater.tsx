"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    base: string;               // 例: "/media/theater/vision"
    images: string[];           // 例: ["room1","room2","room3"]（拡張子なし）
    intervalMs?: number;        // 切替間隔（デフォ 6500ms）
    slideMs?: number;           // スライド時間（デフォ 900ms）
    focal?: string;             // object-position（例: "center 40%"）
};

export default function VisionTheater({
    base,
    images,
    intervalMs = 6500,   // ← ゆっくり
    slideMs = 900,       // ← ぬるっと
    focal = "center 40%",
}: Props) {
    // 無限ループ用に先頭を複製
    const slides = useMemo(() => [...images, images[0]], [images]);

    const [index, setIndex] = useState(0);            // 0..slides.length-1
    const [animating, setAnimating] = useState(true); // リセット時だけアニメ無効
    const reduceRef = useRef(false);

    // ユーザーの「モーション軽減」を尊重
    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        reduceRef.current = mql.matches;
    }, []);

    // オートプレイ
    useEffect(() => {
        if (reduceRef.current) return; // モーション軽減ONなら自動切替しない
        const t = setInterval(() => {
            setAnimating(true);
            setIndex((i) => i + 1);
        }, intervalMs);
        return () => clearInterval(t);
    }, [intervalMs]);

    // ループ終端で瞬時に巻き戻す（見えないところで）
    const onTransitionEnd = () => {
        if (index === slides.length - 1) {
            // 最後（= 先頭複製）から、本当の先頭へ瞬時に戻す
            setAnimating(false);
            setIndex(0);
            // 次フレームでアニメ復帰
            requestAnimationFrame(() => setAnimating(true));
        }
    };

    return (
        <div
            className="
        absolute inset-0  /* 親（ビジュアル枠）に敷き詰める */
        overflow-hidden rounded-2xl
        will-change-transform
      "
            aria-label="ビジュアルシアター"
        >
            {/* 上縁のふわっと光（浮遊感） */}
            <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-white/40 blur-2xl z-10" />

            {/* 横並びトラック */}
            <div
                className={`
          absolute inset-0 flex h-full
          ${animating ? "transition-transform" : ""}
        `}
                style={{
                    transform: `translate3d(${-index * 100}%, 0, 0)`,
                    transitionDuration: animating ? `${slideMs}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)", // なめらか
                }}
                onTransitionEnd={onTransitionEnd}
            >
                {slides.map((id, i) => (
                    <Slide key={`${id}-${i}`} base={base} id={id} focal={focal} />
                ))}
            </div>
        </div>
    );
}

function Slide({
    base,
    id,
    focal = "center",
}: {
    base: string;
    id: string;       // 拡張子なし
    focal?: string;
}) {
    const srcBase = `${base}/${id}`;
    return (
        <picture className="relative h-full w-full shrink-0">
            {/* 軽い順にフォールバック（同名の .avif / .webp / .jpg を配置） */}
            <source type="image/avif" srcSet={`${srcBase}.avif`} />
            <source type="image/webp" srcSet={`${srcBase}.webp`} />
            <img
                src={`${srcBase}.jpg`}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: focal }}
                loading="lazy"
                decoding="async"
            />
        </picture>
    );
}
