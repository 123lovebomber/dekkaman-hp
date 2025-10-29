"use client";
import Image from "next/image";
import CompanyInfo from "@/components/sections/CompanyInfo";

const container = `
  w-full mx-auto
  max-w-[880px] lg:max-w-[880px]
  [--pc-pad:clamp(20px,6vw,72px)]
  px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
  py-[clamp(24px,6vw,72px)]
`;

export default function CompanyPage() {
    return (
        <main className="bg-white">
            <section className={container}>
                {/* タイトル上に少し余白 */}
                <div className="pt-[clamp(12px,2.5vw,28px)]" />

                <h1
                    className="
            font-bold text-gray-800 leading-tight tracking-tight
            text-[clamp(1.75rem,4.2vw,2.25rem)]
          "
                >
                    会社情報
                </h1>

                {/* 代表挨拶：PCは左テキスト／右画像（＝画像を逆配置） */}
                <div className="mt-10 grid lg:grid-cols-[1fr_240px] gap-8 items-start">
                    {/* LEFT：代表挨拶テキスト */}
                    <div className="text-gray-700 text-[clamp(1rem,2.2vw,1.0625rem)] leading-relaxed space-y-5 text-pretty">
                        <h2 className="font-semibold text-gray-800 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            代表挨拶
                        </h2>

                        <p>デッカマン代表取締役の山城大樹と申します。</p>

                        <p>
                            弊社は、友人から「引越しの初期費用が高すぎる」「不動産屋さんの対応が不誠実で不安」との声を受け、
                            低コストでより良い賃貸仲介を行うため設立した会社です。
                        </p>

                        <p>
                            一人一人のお客様に寄り添い、満足いただけるよう誠実な不動産取引に努めて参りました。
                            その結果、口コミでサービスを広めていただき、多くの方々のお引越しをサポートさせていただきました。
                        </p>

                        <p>これもひとえに皆様のご支援、ご鞭撻の賜物であり、厚く御礼申し上げます。</p>

                        <p>
                            現在は一人暮らし用の賃貸仲介はもちろん、ファミリー向けのお部屋探し、
                            企業様のオフィス探しや土地建物の売買まで幅広くご依頼をいただいております。
                        </p>

                        <p>
                            「引越しといえばデッカマン」と言っていただけるような、愛される会社を目指して、
                            スタッフ一同、日々研鑽を重ね、お客様のパートナーとして寄り添い、誠実に業務に取り組んで参ります。
                            どうか引き続きお引き立てを賜りますようお願い申し上げます。
                        </p>

                        <div className="pt-2">
                            <p>株式会社デッカマン</p>
                            <p className="font-medium">代表取締役社長　山城大樹</p>
                        </div>
                    </div>

                    {/* RIGHT：代表画像（正方形） */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-[200px] h-[200px] rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src="/media/company/ceo.jpg" // ここに正方形画像を配置
                                alt="代表取締役 山城大樹"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 代表挨拶の下に会社概要セクションを挿入 */}
            <CompanyInfo />
        </main>
    );
}
