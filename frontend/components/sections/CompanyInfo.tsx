"use client";
import Link from "next/link";

export default function CompanyInfo() {
    return (
        <section >
            <div
                className="
          w-full mx-auto
          max-w-[880px] lg:max-w-[880px]
          [--pc-pad:clamp(20px,6vw,72px)]
          px-[max(26px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
          
        "
            >
                <h2
                    className="
            font-bold text-gray-800 leading-tight tracking-tight
            text-[clamp(1.5rem,4.2vw,2rem)] mb-8
            text-center
          "
                >
                    会社概要
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[clamp(0.95rem,2vw,1rem)]">
                        <tbody>
                            <tr className="border-t border-gray-200">
                                <th className="w-40 text-left py-3 px-4 font-semibold text-gray-700">会社名</th>
                                <td className="py-3 px-4 text-gray-800">株式会社デッカマン</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="w-40 text-left py-3 px-4 font-semibold text-gray-700">設立年月日</th>
                                <td className="py-3 px-4 text-gray-800">2020年9月29日</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">代表取締役</th>
                                <td className="py-3 px-4 text-gray-800 flex flex-wrap items-center gap-2">
                                    <span>山城大樹</span>
                                    {/* <Link
                                        href="/message"
                                        className="text-gray-600 text-sm hover:underline hover:text-gray-800 transition"
                                    >
                                        代表挨拶はこちら →
                                    </Link> */}
                                </td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">所在地</th>
                                <td className="py-3 px-4 text-gray-800">
                                    東京都港区西麻布4-11-28 麻布エンパイアマンション507
                                </td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">TEL</th>
                                <td className="py-3 px-4 text-gray-800">03-4362-0590</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">メールアドレス</th>
                                <td className="py-3 px-4 text-gray-800">support@dekkaman.jp</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">免許番号</th>
                                <td className="py-3 px-4 text-gray-800">東京都知事（1）第105577号</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">免許年月日</th>
                                <td className="py-3 px-4 text-gray-800">令和2年11月27日</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">所属団体</th>
                                <td className="py-3 px-4 text-gray-800">
                                    全国宅地建物取引業保証協会
                                </td>
                            </tr>
                            <tr className="border-t border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">事業内容</th>
                                <td className="py-3 px-4 text-gray-800">
                                    不動産賃貸仲介
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
