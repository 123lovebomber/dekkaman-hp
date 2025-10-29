// "use client";
// import { useLayoutEffect, useRef } from "react";
// import FitGroup from "../FitGroup";
// import FitLine from "../FitLine";
// import ScaleBlock from "@/components/ui/ScaleBlock";

// export default function Hero() {
//     // ▼ ラッパ(div)と右側「くする会社」の参照を取る
//     const rowRef = useRef<HTMLDivElement | null>(null);
//     const peerRef = useRef<HTMLSpanElement | null>(null);

//     // ▼ 初回・フォントロード後・リサイズ時に「くする会社」のフォントサイズをラッパへコピー
//     // ▼ 初回・フォントロード後・リサイズ・FitLineの更新時に
//     //    「くする会社」本体(span)の font-size を行ラッパへコピー
//     useLayoutEffect(() => {
//         const row = rowRef.current;
//         const peerWrap = peerRef.current;
//         if (!row || !peerWrap) return;

//         // FitLine が描画する「内側の span」を特定
//         const resolvePeerSpan = () =>
//             (peerWrap.querySelector('span:not(.opacity-0):not(.invisible)') ||
//                 peerWrap.querySelector('span')) as HTMLElement | null;

//         const apply = () => {
//             const peerSpan = resolvePeerSpan();
//             if (!peerSpan) return;
//             const fs = getComputedStyle(peerSpan).fontSize; // 例: "50.5094px"
//             if (fs) row.style.fontSize = fs;                // ← 行の 1em を固定
//         };

//         // 初回
//         apply();

//         // リサイズ時
//         const onResize = () => apply();
//         window.addEventListener("resize", onResize);

//         // Webフォント読み込み後
//         const fr = (document as any)?.fonts?.ready;
//         if (fr?.then) fr.then(apply).catch(() => { });

//         // FitLine が後から inline-style を更新する場合に備えて監視
//         const peerSpan = resolvePeerSpan();
//         const mo = peerSpan
//             ? new MutationObserver(apply)
//             : null;
//         if (peerSpan && mo) {
//             mo.observe(peerSpan, { attributes: true, attributeFilter: ["style", "class"] });
//         }

//         return () => {
//             window.removeEventListener("resize", onResize);
//             mo?.disconnect();
//         };
//     }, []);


//     return (
//         <section className="flex items-center justify-center min-h-[70vh] pt-10 sm:pt-16 bg-white">

//             <div className="mx-auto w-full lg:max-w-7xl px-[calc(26px+env(safe-area-inset-left))] sm:px-10 md:px-12 lg:px-5 grid lg:grid-cols-2 gap-8">
//                 <div className="w-full text-left">
//                     <ScaleBlock minScale={0.72}>
//                         <FitGroup>
//                             <FitLine className="font-medium text-gray-600">どうも。</FitLine>

//                             {/* ▼ 基準行と「くする会社」を同列に */}
//                             <div className="inline-grid justify-items-end gap-y-[0.25em]">
//                                 <FitLine className="block font-medium text-gray-600" isBaseline>
//                                     賃貸の初期費用を
//                                 </FitLine>

//                                 {/* ▼ ラッパ行：フォントサイズを右に合わせる */}
//                                 <div
//                                     ref={rowRef}
//                                     className="flex items-baseline justify-end whitespace-nowrap leading-none"
//                                 >
//                                     {/* ▼ 相対サイズ・相対位置をemで調整 */}
//                                     <span className="relative text-gray-400 font-medium tracking-tight text-[0.6666em] -top-[0.2em] [transform:translateX(-0.1em)]">
//                                         ちっちゃ
//                                     </span>

//                                     {/* ▼ 「くする会社」測定用 */}
//                                     <span ref={peerRef}>
//                                         <FitLine className="block font-medium text-gray-600 leading-none">
//                                             くする会社
//                                         </FitLine>
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="mt-[0.1em] flex items-baseline gap-[0.3em]">
//                                 <FitLine className="font-semibold text-black">デッカマン</FitLine>
//                                 <FitLine className="font-medium text-gray-600">です。</FitLine>
//                             </div>
//                         </FitGroup>
//                     </ScaleBlock>
//                 </div>

//                 <div className="hidden lg:block">{/* 右側画像 */}</div>
//             </div>
//         </section>
//     );
// }
"use client";
import { useLayoutEffect, useRef } from "react";
import FitGroup from "../FitGroup";
import FitLine from "../FitLine";
import ScaleBlock from "@/components/ui/ScaleBlock";

export default function Hero() {
    const rowRef = useRef<HTMLDivElement | null>(null);
    const peerRef = useRef<HTMLSpanElement | null>(null);

    useLayoutEffect(() => {
        const row = rowRef.current;
        const peerWrap = peerRef.current;
        if (!row || !peerWrap) return;

        const resolvePeerSpan = () =>
            (peerWrap.querySelector('span:not(.opacity-0):not(.invisible)') ||
                peerWrap.querySelector('span')) as HTMLElement | null;

        const apply = () => {
            const peerSpan = resolvePeerSpan();
            if (!peerSpan) return;
            const fs = getComputedStyle(peerSpan).fontSize;
            if (fs) row.style.fontSize = fs;
        };

        apply();
        const onResize = () => apply();
        window.addEventListener("resize", onResize);

        const fr = (document as any)?.fonts?.ready;
        if (fr?.then) fr.then(apply).catch(() => { });

        const peerSpan = resolvePeerSpan();
        const mo = peerSpan ? new MutationObserver(apply) : null;
        if (peerSpan && mo) {
            mo.observe(peerSpan, { attributes: true, attributeFilter: ["style", "class"] });
        }

        return () => {
            window.removeEventListener("resize", onResize);
            mo?.disconnect();
        };
    }, []);

    return (
        <section className="flex items-center justify-center min-h-[70vh] pt-10 sm:pt-16 bg-white">
            {/* ★ 1カラム固定。PCでもモバイルの見た目を維持。左右セーフエリアだけ少し広げる */}
            <div
                className="
          mx-auto w-full
          max-w-[880px] lg:max-w-880]
          [--pc-pad:clamp(20px,6vw,72px)]
          px-[max(26px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
        "
            >
                <div className="w-full text-left">
                    <ScaleBlock minScale={0.72}>
                        <FitGroup>
                            <FitLine className="font-medium text-gray-600">どうも。</FitLine>

                            <div className="inline-grid justify-items-end gap-y-[0.25em]">
                                <FitLine className="block font-medium text-gray-600" isBaseline>
                                    賃貸の初期費用を
                                </FitLine>

                                <div
                                    ref={rowRef}
                                    className="flex items-baseline justify-end whitespace-nowrap leading-none"
                                >
                                    <span className="relative text-gray-400 font-medium tracking-tight text-[0.6666em] -top-[0.2em] [transform:translateX(-0.1em)]">
                                        ちっちゃ
                                    </span>

                                    <span ref={peerRef}>
                                        <FitLine className="block font-medium text-gray-600 leading-none">
                                            くする会社
                                        </FitLine>
                                    </span>
                                </div>
                            </div>

                            <div className="mt-[0.1em] flex items-baseline gap-[0.3em]">
                                <FitLine className="font-semibold text-black">デッカマン</FitLine>
                                <FitLine className="font-medium text-gray-600">です。</FitLine>
                            </div>
                        </FitGroup>
                    </ScaleBlock>
                </div>
            </div>
        </section>
    );
}
