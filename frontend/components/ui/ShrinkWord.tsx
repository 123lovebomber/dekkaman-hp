// File: components/ui/ShrinkWord.tsx
// Purpose: 「ちっちゃ」など特定の単語を“中央に向かってぎゅっと縮める”アニメーション。
// 改良版: 初期サイズ/位置のズレ、縮小原点の違和感に対応。
// - 基本はゴースト+重ね表示。ただしゴーストの実測幅(px)をラッパに固定し、右端/基線のブレを排除。
// - ラッパは inline-flex + align-items:baseline で周囲のテキストと正しく整列。
// - アニメ本体は中央原点で scale。right edge を基準にしたい場合は transform-origin を 'right center' に変更可能。
// - iOS Safari / iPad / PC 対応。prefers-reduced-motion 配慮。

import React, { useLayoutEffect, useRef, useState } from "react";

type Props = {
    text: string;
    /** 最終倍率（例: 0.78 で 78% へ縮小） */
    toScale?: number;
    /** アニメ時間（ms） */
    durationMs?: number;
    /** 遅延（ms） */
    delayMs?: number;
    /** CSS easing（cubic-bezier など） */
    ease?: string;
    /** 追加クラス（色・太さ・字間などはここで指定。親の FitLine と同一スタイルを渡すこと） */
    className?: string;
    /** 初期は等倍(1)から開始。必要に応じて scale の from 値を変えたい場合 */
    fromScale?: number;
    /** 1回のみ再生（デフォルト）。trueで無限反復 */
    loop?: boolean;
    /** 縮小の原点: 'center' | 'right' | 'left' */
    origin?: 'center' | 'right' | 'left';
};

export default function ShrinkWord({
    text,
    toScale = 0.8,
    durationMs = 520,
    delayMs = 0,
    ease = "cubic-bezier(0.22, 1, 0.36, 1)",
    className = "",
    fromScale = 1,
    loop = false,
    origin = 'center',
}: Props) {
    const ghostRef = useRef<HTMLSpanElement | null>(null);
    const [fixedWidth, setFixedWidth] = useState<number | null>(null);

    // —— 幅の実測 → 固定（周囲テキストが動かない／右端を正確に合わせる）
    useLayoutEffect(() => {
        const el = ghostRef.current;
        if (!el) return;

        const setWidth = () => {
            // subpixel を含めて固定（レイアウト差異回避）
            const w = el.getBoundingClientRect().width;
            setFixedWidth(w);
        };

        setWidth();

        // フォント読み込み・リサイズで再測定
        if ((document as any).fonts?.ready) {
            (document as any).fonts.ready.then(setWidth).catch(() => { });
        }
        const ro = new ResizeObserver(setWidth);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const styleVars: React.CSSProperties = {
        // @ts-ignore
        "--to-scale": String(toScale),
        // @ts-ignore
        "--from-scale": String(fromScale),
        // @ts-ignore
        "--dur": `${durationMs}ms`,
        // @ts-ignore
        "--delay": `${delayMs}ms`,
        // @ts-ignore
        "--ease": ease,
    } as React.CSSProperties;

    // transform-origin のマッピング
    const originStyle =
        origin === 'right' ? '[transform-origin:right_center]'
            : origin === 'left' ? '[transform-origin:left_center]'
                : '[transform-origin:center]';

    return (
        <span
            className={`relative inline-flex align-baseline leading-none ${className}`}
            style={{ ...styleVars, width: fixedWidth ? `${fixedWidth}px` : undefined }}
        >
            {/* 1) ゴースト: 初期サイズのスペースを確保（不可視） */}
            <span ref={ghostRef} aria-hidden className="invisible select-none whitespace-nowrap">
                {text}
            </span>

            {/* 2) アニメ本体: ラッパ中央に重ねる。origin は可変（center/right/left） */}
            <span
                className={[
                    "pointer-events-none",
                    "absolute inset-0",
                    "flex items-center justify-center", // 盒の中央にピタッと
                    originStyle,
                    "[animation:shrink-in_var(--dur)_var(--ease)_var(--delay)_forwards]",
                    loop ? "[animation-iteration-count:infinite] [animation-direction:alternate]" : "",
                ].join(" ")}
                aria-label={text}
            >
                <span className="whitespace-nowrap">{text}</span>
            </span>

            <style jsx>{`
        @keyframes shrink-in { from { transform: scale(var(--from-scale)); } to { transform: scale(var(--to-scale)); } }
        :global(.\[animation\:shrink-in_var\(--dur\)_var\(--ease\)_var\(--delay\)_forwards\]) {
          animation-name: shrink-in;
          animation-duration: var(--dur);
          animation-timing-function: var(--ease);
          animation-delay: var(--delay);
          animation-fill-mode: forwards;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.\[animation\:shrink-in_var\(--dur\)_var\(--ease\)_var\(--delay\)_forwards\]) { animation: none !important; }
        }
        /* transform-origin 任意値用スコープ */
        :global(.\[transform-origin\:center\]) { transform-origin: center; }
        :global(.\[transform-origin\:right_center\]) { transform-origin: right center; }
        :global(.\[transform-origin\:left_center\]) { transform-origin: left center; }
      `}</style>
        </span>
    );
}

/* --- Integration tips ---
1) クラスは親の FitLine と同一（font, weight, tracking, color）を渡す → 初期サイズ差をゼロに。
2) 右端合わせを厳密にしたい場合は origin='right' を指定。
3) iPhone 実機で 1px 未満のズレが見えるときは、ラッパの width 固定（本実装）により解消されます。
4) FitLine 側で line-height を変化させると見た目がずれることがあるため、"leading-none" を継承する構成がおすすめ。
--- */
