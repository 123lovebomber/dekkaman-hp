// "use client";
// import VisionTheater from "./VisionTheater";

// export default function Vision() {
//     return (
//         <section
//             className={`
//         overflow-x-hidden
//         scroll-mt-[calc(var(--header-h,0px)+env(safe-area-inset-top))]
//       `}
//         >
//             {/* モバイル基準の見た目をPCでも維持。
//          PC時は左右セーフエリアだけ広め（--pc-pad） */}
//             <div
//                 className={`
//           w-full mx-auto
//           max-w-[880px] lg:max-w-[880px]    /* 本文幅はほぼモバイル幅を維持 */
//           [--pc-pad:clamp(20px,6vw,72px)]   /* PCでの左右セーフエリア */
//           px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
//         `}
//             >
//                 {/* 1カラム固定（PCでも崩さない） */}
//                 <div className="space-y-8">
//                     {/* TEXT */}
//                     <div className="text-left text-pretty">
//                         <h2
//                             className={`
//                 font-bold text-black leading-tight tracking-tight
//                 text-[clamp(1.5rem,4.2vw,3.25rem)]
//                 whitespace-normal break-words [text-wrap:balance]
//               `}
//                         >
//                             私たちがするのは、ただひとつ。
//                         </h2>

//                         <p
//                             className={`
//                 mt-3 font-medium text-gray-800 leading-tight
//                 text-[clamp(1.125rem,2.8vw,1.85rem)]
//                 whitespace-normal break-words [text-wrap:balance]
//               `}
//                         >
//                             あなたが「ここにしたい」と思える物件を探すこと。
//                         </p>

//                         <div className="mt-6 space-y-5 text-gray-600 leading-relaxed text-[clamp(1rem,2.2vw,1.125rem)] break-words">
//                             <p>
//                                 お部屋を借りるときの初期費用は、一般的に家賃の4〜6ヶ月分と言われています。
//                                 そのうち約1ヶ月分を占めるのが仲介手数料です。デッカマンは、余計な固定費をかけずに運営しているため、他社より安くご紹介が可能です。
//                             </p>
//                             <p>
//                                 ちっちゃくなった初期費用で、その街との新生活を、思い切り楽しんでいただけると嬉しいです。
//                                 その暮らしの始まりを、私たちは、静かにお手伝いします。
//                             </p>
//                         </div>
//                     </div>

//                     {/* IMAGE（下に固定、PCでも2カラムにしない） */}
//                     <div>
//                         <div
//                             aria-label="画像シアター"
//                             className={`
//                 relative overflow-hidden rounded-2xl shadow-sm
//                 bg-gradient-to-br from-gray-100 to-gray-200
//                 aspect-[16/9]
//                 max-h-[min(72vh,720px)]
//               `}
//                         >
//                             <VisionTheater
//                                 images={["room1", "room2", "room3"]}
//                                 base="/media/theater/vision"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";
import VisionTheater from "../ui/VisionTheater";

export default function Vision() {
    return (
        <section
            className={`
                overflow-x-hidden
                scroll-mt-[calc(var(--header-h,0px)+env(safe-area-inset-top))]
            `}
        >
            <div
                className={`
                    w-full mx-auto
                    max-w-[880px] lg:max-w-[880px]
                    [--pc-pad:clamp(20px,6vw,72px)]
                    px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
                `}
            >
                <div className="space-y-8">
                    {/* TEXT */}
                    <div className="text-left text-pretty">
                        {/* 見出し（大） */}
                        <h2
                            className={`
                                font-bold text-black leading-tight tracking-tight
                                text-[clamp(1.6rem,4.2vw,3.25rem)]   /* ← スマホで少し小さく */
                                sm:text-[clamp(1.5rem,4.2vw,3.25rem)] /* ← sm以上は従来通り */
                                whitespace-normal break-words [text-wrap:balance]
                            `}
                        >
                            私たちがするのは、ただひとつ。
                        </h2>

                        {/* 見出し（中） */}
                        <p
                            className={`
                                mt-3 font-medium text-gray-800 leading-tight
                                text-[clamp(1rem,2.8vw,1.85rem)]     /* ← スマホで控えめ */
                                sm:text-[clamp(1.125rem,2.8vw,1.85rem)] /* ← sm以上は従来通り */
                                whitespace-normal break-words [text-wrap:balance]
                            `}
                        >
                            あなたが「ここに住みたい」と思える部屋を探すこと。
                        </p>

                        {/* 本文 */}
                        <div
                            className={`
                                mt-6 space-y-5 text-gray-600 leading-relaxed
                                text-[clamp(0.95rem,2.2vw,1.125rem)] /* スマホ小さめ */
                                sm:text-[clamp(1rem,2.2vw,1.125rem)]  /* sm以上従来 */
                                break-words
                            `}
                        >
                            <p>
                                お部屋を借りるときの初期費用は、一般的に家賃の4〜6ヶ月分と言われています。
                                そのうち約1ヶ月分を占めるのが仲介手数料です。デッカマンは、余計な固定費をかけずに運営しているため、他社より安くご紹介が可能です。
                            </p>
                            <p>
                                ちっちゃくなった初期費用で、住む街との新生活を、思い切り楽しんでいただけると嬉しいです。
                                その暮らしの始まりを、私たちは、静かにお手伝いします。
                            </p>
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div>
                        <div
                            aria-label="画像シアター"
                            className={`
                                relative overflow-hidden rounded-2xl shadow-sm
                                bg-gradient-to-br from-gray-100 to-gray-200
                                aspect-[16/9]
                                max-h-[min(72vh,720px)]
                            `}
                        >
                            <VisionTheater
                                images={["room1", "room2", "room3"]}
                                base="/media/theater/vision"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
