"use client";

import { useState } from "react";
import ContactForm from "../ui/Contact.Form";


type Sel = "rent" | "other" | null;

export default function ContactSection() {
    const [selected, setSelected] = useState<Sel>(null);

    return (
        <section
            id="contact"
            className={`
        overflow-x-hidden
        scroll-mt-[calc(var(--header-h,0px)+env(safe-area-inset-top))]
        bg-white
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
                {/* 見出し */}
                <div className="mb-6">
                    <h2 className="font-bold text-black leading-tight tracking-tight text-[clamp(1.5rem,4.2vw,3.25rem)] mb-6">
                        お問い合わせはこちらから
                    </h2>
                    <p className="mt-6 space-y-5 text-gray-600 leading-relaxed text-[clamp(1rem, 2.2vw, 1.125rem)] break-words">物件探しのご依頼・ご質問はこちらからお送りください。担当より折り返しご連絡いたします。</p>
                </div>

                {/* 2択（常時表示） */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setSelected("rent")}
                        className={`
              w-full rounded-2xl border px-4 py-5 text-left transition
              ${selected === "rent"
                                ? "border-black shadow-[0_0_0_1px_rgb(0,0,0)]"
                                : "border-neutral-200 hover:border-neutral-300"}
            `}
                    >
                        <div className="font-medium">賃貸に関するお問い合わせ</div>
                        <div className="mt-1 text-sm text-neutral-500">
                            クリックすると「居住用」「事業用」を選べます
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setSelected("other")}
                        className={`
              w-full rounded-2xl border px-4 py-5 text-left transition
              ${selected === "other"
                                ? "border-black shadow-[0_0_0_1px_rgb(0,0,0)]"
                                : "border-neutral-200 hover:border-neutral-300"}
            `}
                    >
                        <div className="font-medium">その他のお問い合わせ</div>
                        <div className="mt-1 text-sm text-neutral-500">取材／提携／採用／その他など</div>
                    </button>
                </div>

                {/* 選択後：下にフォームを表示（2択は残す） */}
                {selected !== null && (
                    <div className="mt-6">
                        <ContactForm category={selected} />
                    </div>
                )}
            </div>
        </section>
    );
}
