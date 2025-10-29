// "use client";
// import SavingsChart from "./SavingsChart";
// export default function Business() {
//     return (
//         <section
//             className="
//             bg-white overflow-x-hidden
//             scroll-mt-[calc(var(--header-h)+env(safe-area-inset-top))]
//             "
//         >
//             <div
//                 className="
//                 w-full mx-auto lg:max-w-7xl
//                 px-[calc(26px+env(safe-area-inset-left))] sm:px-10 md:px-12 lg:px-5
//                 pt-[calc(10px+env(safe-area-inset-top))]
//                 sm:pt-[calc(6px+env(safe-area-inset-top))]
//                 md:pt-[calc(28px+env(safe-area-inset-top))]
//                 lg:pt-[calc(60px+env(safe-area-inset-top))]
//                 xl:pt-[calc(160px+env(safe-area-inset-top))]
//                 pb-16
//                 "
//             >

//                 <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
//                     {/* LEFT: テキスト */}
//                     <div className="w-full text-left text-pretty lg:pr-6 lg:max-w-[min(100%,40rem)]">

//                         {/* 見出し */}
//                         <h2
//                             className="
//                             font-bold text-black leading-tight tracking-tight
//                             text-[clamp(1.5rem,4.2vw,3.25rem)]
//                             whitespace-normal break-words [text-wrap:balance]
//                             "
//                         >
//                             事業内容
//                         </h2>

//                         {/* サブタイトル */}
//                         <p
//                             className="
//                             mt-3 font-medium text-gray-800 leading-tight
//                             text-[clamp(1.125rem,2.8vw,1.85rem)]
//                             whitespace-normal break-words [text-wrap:balance]
//                             "
//                         >
//                             不動産賃貸仲介業
//                         </p>

//                         {/* 本文 */}
//                         <div
//                             className="
//                             mt-6 space-y-5 text-gray-600 leading-relaxed
//                             text-[clamp(1rem,2.2vw,1.125rem)] break-words
//                             "
//                         >
//                             <p>
//                                 居住用・事業用を問わず、東京都全域および近郊エリアを対象に、
//                                 希望条件に沿った物件のご提案から契約までを行っています。
//                             </p>




//                         </div>
//                     </div>

//                     {/* RIGHT: 画像 or イメージボード */}

//                     <div className="w-full">
//                         <div
//                             aria-label="費用比較"
//                             className="
//       /* 枠系なし */
//       lg:h-auto            /* ← 高さ固定を外す */
//       grid items-start     /* ← 中央から “上揃え” に */
//     "
//                         >
//                             <SavingsChart />
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// }
// "use client";
// import SavingsChart from "./SavingsChart";

// export default function Business() {
//     return (
//         <section
//             className="
//         bg-white overflow-x-hidden
//         scroll-mt-[calc(var(--header-h)+env(safe-area-inset-top))]
//       "
//         >
//             {/* ★ 本文幅はモバイル基準、PCは左右セーフエリアだけ広め */}
//             <div
//                 className="
//           w-full mx-auto
//           max-w-[880px] lg:max-w-[880px]
//           [--pc-pad:clamp(20px,6vw,72px)]
//           px-[max(26px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
//           pt-[clamp(24px,6vw,80px)]
//           pb-[clamp(24px,8vw,96px)]
//         "
//             >
//                 {/* ★ 1カラム固定（テキスト→グラフの縦並び） */}
//                 <div className="space-y-8">
//                     {/* TEXT */}
//                     <div className="w-full text-left text-pretty">
//                         <h2
//                             className="
//                 font-bold text-black leading-tight tracking-tight
//                 text-[clamp(1.5rem,4.2vw,3.25rem)]
//                 whitespace-normal break-words [text-wrap:balance]
//               "
//                         >
//                             事業内容
//                         </h2>

//                         <p
//                             className="
//                 mt-3 font-medium text-gray-800 leading-tight
//                 text-[clamp(1.125rem,2.8vw,1.85rem)]
//                 whitespace-normal break-words [text-wrap:balance]
//               "
//                         >
//                             不動産賃貸仲介業
//                         </p>

//                         <div
//                             className="
//                 mt-6 space-y-5 text-gray-600 leading-relaxed
//                 text-[clamp(1rem,2.2vw,1.125rem)] break-words
//               "
//                         >
//                             <p>
//                                 居住用・事業用を問わず、東京都全域および近郊エリアを対象に、
//                                 希望条件に沿った物件のご提案から契約までを行っています。
//                             </p>
//                         </div>
//                     </div>

//                     {/* CHART（下に固定） */}
//                     <div>
//                         <div
//                             aria-label="費用比較"
//                             className="
//                 relative
//                 /* 枠の主張を抑えて本文と一体化 */
//                 rounded-xl overflow-hidden
//               "
//                         >
//                             <SavingsChart />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
"use client";
import ContactButton from "../ui/ContactButton";
import SavingsChart from "./SavingsChart";

export default function Business() {
    return (
        <section
            className="
                overflow-x-hidden pt-
                scroll-mt-[calc(var(--header-h)+env(safe-area-inset-top))]
            "
        >
            <div
                className="
                    w-full mx-auto
                    max-w-[880px] lg:max-w-[880px]
                    [--pc-pad:clamp(20px,6vw,72px)]
                    px-[max(26px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
               
                "
            >
                <div className="space-y-18">
                    {/* TEXT */}
                    <div className="w-full text-left text-pretty">
                        <h2
                            className="
                                font-bold text-black leading-tight tracking-tight
                                text-[clamp(1.6rem,4.2vw,3.25rem)]   /* ← スマホで少し小さく */
                                sm:text-[clamp(1.5rem,4.2vw,3.25rem)] /* ← sm以上は従来通り */
                                whitespace-normal break-words [text-wrap:balance]
                            "
                        >
                            事業内容
                        </h2>

                        <p
                            className="
                                mt-3 font-medium text-gray-800 leading-tight
                                text-[clamp(1.125rem,2.8vw,1.85rem)]
                                whitespace-normal break-words [text-wrap:balance]
                            "
                        >
                            不動産賃貸仲介業
                        </p>

                        <div
                            className="
                                mt-6 space-y-5 text-gray-600 leading-relaxed
                                text-[clamp(1rem,2.2vw,1.125rem)] break-words
                            "
                        >
                            <p>
                                居住用・事業用を問わず、東京都全域および近郊エリアを対象に、
                                希望条件に沿った物件のご提案から契約までを行っています。
                            </p>

                            <p>
                                「このエリアで探してほしい」「この物件の初期費用を知りたい」など、
                                フォームからお気軽にお知らせください。条件に合う物件をお探しします。
                            </p>
                        </div>
                    </div>

                    {/* CHART */}
                    <div>
                        <div
                            aria-label="費用比較"
                            className="
                                relative rounded-xl overflow-hidden
                            "
                        >
                            <SavingsChart />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
