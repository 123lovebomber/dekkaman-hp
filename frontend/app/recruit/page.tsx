// app/recruit/page.tsx
"use client";

const container = `
  w-full mx-auto
  max-w-[880px] lg:max-w-[880px]
  [--pc-pad:clamp(20px,6vw,72px)]
  px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
  py-[clamp(24px,6vw,72px)]
`;

export default function RecruitPage() {
    return (
        <main className="bg-white">
            <section className={container} >

                <div className="pt-[clamp(12px,2.5vw,28px)]" />
                <h1 className="font-bold text-gray-800 tracking-tight leading-tight
                       text-[clamp(1.75rem,4.2vw,2.25rem)]">
                    採用情報
                </h1>

                <p className="mt-4 text-gray-600 text-[clamp(1rem,2.2vw,1.0625rem)]">
                    現在、採用は行なっておりません。
                </p>

                {/* <div className="mt-8 overflow-x-auto">
                    <table className="w-full border-collapse text-[clamp(0.95rem,2vw,1rem)]">
                        <tbody>
                            <tr className="border-t border-gray-200">
                                <th className="w-40 text-left py-3 px-4 font-semibold text-gray-700">募集職種</th>
                                <td className="py-3 px-4 text-gray-800">賃貸仲介エージェント（正社員/業務委託）</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">勤務地</th>
                                <td className="py-3 px-4 text-gray-800">東京都（リモート/直行直帰可）</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">勤務時間</th>
                                <td className="py-3 px-4 text-gray-800">フレックスタイム（要相談）</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">報酬</th>
                                <td className="py-3 px-4 text-gray-800">経験・成果に応じて決定（固定＋インセンティブ）</td>
                            </tr>
                            <tr className="border-t border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">応募方法</th>
                                <td className="py-3 px-4 text-gray-800">履歴書/職務経歴書を添付のうえ、コンタクトより送信</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </section>
        </main>
    );
}
