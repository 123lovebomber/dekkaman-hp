// "use client";
// import { useLayoutEffect, useRef, useState } from "react";
// import { useFitCtx } from "./FitGroup";

// /**
//  * ・isBaseline=true の行：従来どおり「コンテナ幅にフィット」→ その文字数を基準として保存
//  * ・その他の行：基準の「px/文字」に一致させるスケールを計算
//  * 　 ただし はみ出し防止のため、fit-to-container と per-char-match の「小さい方」を採用
//  */
// export default function FitLine({
//     children,
//     className = "",
//     min = 28,
//     max = 160,
//     isBaseline = false,
// }: {
//     children: string;
//     className?: string;
//     min?: number;
//     max?: number;
//     isBaseline?: boolean;
// }) {
//     const { targetWidth, baseChars, setBaseChars } = useFitCtx();
//     const ghostRef = useRef<HTMLSpanElement>(null);
//     const [fs, setFs] = useState(min);

//     useLayoutEffect(() => {
//         const ghost = ghostRef.current!;
//         if (!ghost || !targetWidth) return;

//         const BASE = 100;                // 計測用フォントサイズ
//         ghost.style.fontSize = BASE + "px";
//         ghost.style.whiteSpace = "nowrap";

//         const real = ghost.getBoundingClientRect().width || 1;  // BASE時の実幅
//         const n = children.length || 1;

//         // ① まず「コンテナ幅フィット」のフォントサイズ
//         const fitSize = Math.max(min, Math.min(max, (targetWidth / real) * BASE));

//         if (isBaseline) {
//             // 基準行：fitさせ、基準の文字数を共有
//             setBaseChars(n);
//             setFs(fitSize);
//             return;
//         }

//         // ② 基準の “px/文字” を作る
//         //    基準行は「コンテナ幅にピッタリ」なので、px/文字 = targetWidth / baseChars
//         const perCharTarget = baseChars > 0 ? targetWidth / baseChars : null;

//         // ③ 現行テキストの “px/文字” (BASE時) は real / n
//         //    それを perCharTarget に一致させるフォントサイズを逆算
//         //    s = (perCharTarget / (real/n)) * BASE
//         let perCharSize = fitSize; // フォールバック
//         if (perCharTarget) {
//             const s = (perCharTarget / (real / n)) * BASE;
//             perCharSize = Math.max(min, Math.min(max, s));
//         }

//         // ④ はみ出し防止：コンテナフィットと per-char-match の小さい方を採用
//         const next = Math.min(fitSize, perCharSize);
//         setFs(next);
//     }, [children, min, max, targetWidth, baseChars, setBaseChars]);

//     return (
//         <>
//             <span
//                 className={`block whitespace-nowrap leading-[1.05] tracking-tight ${className}`}
//                 style={{ fontSize: fs }}
//             >
//                 {children}
//             </span>

//             {/* 計測用（画面外・不可視） */}
//             <span ref={ghostRef} className="fixed opacity-0 -z-50 pointer-events-none">
//                 {children}
//             </span>
//         </>
//     );
// }
// app/components/FitLine.tsx
"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { useFitCtx } from "./FitGroup";

export default function FitLine({
    children,
    className = "",
    min = 28,
    max = 160,
    isBaseline = false,
}: {
    children: string;
    className?: string;
    min?: number;
    max?: number;
    isBaseline?: boolean;
}) {
    const { targetWidth, baseChars, setBaseChars } = useFitCtx();
    const ghostRef = useRef<HTMLSpanElement>(null);
    const [fs, setFs] = useState(min);

    useLayoutEffect(() => {
        const ghost = ghostRef.current;
        if (!ghost || !targetWidth) return;

        const BASE = 100; // px

        const measureAndApply = () => {
            // 表示側と“同じフォント特性”で計測（className適用済み）
            ghost.style.fontSize = BASE + "px";
            ghost.style.whiteSpace = "nowrap";

            const real = ghost.getBoundingClientRect().width || 1;
            const n = Math.max(1, Array.from(children).length);

            const fitSize = Math.max(min, Math.min(max, (targetWidth / real) * BASE));

            if (isBaseline) {
                setBaseChars(n);
                setFs(fitSize);
                return;
            }

            const perCharTarget = baseChars > 0 ? targetWidth / baseChars : null;
            let perCharSize = fitSize;
            if (perCharTarget) {
                const s = (perCharTarget / (real / n)) * BASE;
                perCharSize = Math.max(min, Math.min(max, s));
            }

            setFs(Math.min(fitSize, perCharSize));
        };

        measureAndApply();

        // Webフォントロード完了後に再計測（iOS初回ズレ対策）
        const fontsReady = (document as any)?.fonts?.ready;
        if (fontsReady?.then) {
            fontsReady.then(() => requestAnimationFrame(measureAndApply));
        }
    }, [children, min, max, targetWidth, baseChars, setBaseChars]);

    return (
        <>
            {/* 表示側：baseline安定のため行高を固定（leading-[1.05]） */}
            <span
                className={`block whitespace-nowrap leading-[1.05] tracking-tight ${className}`}
                style={{ fontSize: fs }}
            >
                {children}
            </span>

            {/* 計測用：表示側と同じクラスを適用（フォント/太さ/字間を一致） */}
            <span
                ref={ghostRef}
                className={`fixed opacity-0 -z-50 pointer-events-none whitespace-nowrap ${className}`}
                aria-hidden
            >
                {children}
            </span>
        </>
    );
}
