// app/privacy/page.tsx
"use client";

const container = `
  w-full mx-auto
  max-w-[880px] lg:max-w-[880px]
  [--pc-pad:clamp(20px,6vw,72px)]
  px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
  py-[clamp(24px,6vw,72px)]
`;

export default function PrivacyPage() {
    return (
        <main className="bg-white">
            <section className={container}>
                <div className="pt-[clamp(12px,2.5vw,28px)]" />
                <h1 className="font-bold text-gray-800 tracking-tight leading-tight
                       text-[clamp(1.75rem,4.2vw,2.25rem)]">
                    プライバシーポリシー
                </h1>

                <p className="mt-6 text-gray-700 text-[clamp(1rem,2.2vw,1.0625rem)] leading-relaxed">
                    株式会社デッカマン（以下「当社」といいます）は、個人情報の保護を重要な社会的責務と認識し、
                    以下の方針に基づき、適切な取扱いおよび保護に努めます。
                </p>

                <div className="mt-8 space-y-8 text-gray-700 text-[clamp(1rem,2.2vw,1.0625rem)] leading-relaxed">
                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第1条（法令等の遵守）
                        </h2>
                        <p>
                            当社は、個人情報の取扱いに関して「個人情報の保護に関する法律」およびその他の関連法令、
                            国の定める指針、業界ガイドラインを遵守します。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第2条（個人情報の定義）
                        </h2>
                        <p>
                            本プライバシーポリシーにおいて「個人情報」とは、氏名、生年月日、住所、電話番号、メールアドレス、
                            勤務先、勤務先情報、賃貸物件に関する希望条件など、特定の個人を識別できる情報を指します。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第3条（個人情報の取得方法）
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>お問い合わせフォーム・LINE公式アカウント・電子メール・電話によるご連絡</li>
                            <li>物件資料請求、内見予約、契約手続き等を通じてお客様が提供された情報</li>
                            <li>公開情報や提携事業者（管理会社・ポータルサイト等）から正当な方法で取得した情報</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第4条（利用目的）
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>不動産の賃貸、売買、管理、仲介等に関する業務の遂行</li>
                            <li>お客様への物件情報の提供および各種ご連絡</li>
                            <li>お問い合わせや資料請求等への対応</li>
                            <li>契約締結および契約後のアフターサービスの提供</li>
                            <li>提携事業者（管理会社、オーナー、保証会社等）への必要な範囲での情報提供</li>
                            <li>当社サービスの改善・新サービスの案内・アンケートの実施</li>
                            <li>法令に基づく手続きおよびそれに付随する対応</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第5条（第三者提供）
                        </h2>
                        <p className="mb-3">
                            当社は、法令に定める場合を除き、本人の同意なく個人情報を第三者に提供いたしません。
                            ただし、以下の場合は例外とします。
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>お客様の同意がある場合</li>
                            <li>法令に基づく場合</li>
                            <li>人の生命、身体または財産の保護のために必要がある場合であり、本人の同意を得ることが困難な場合</li>
                            <li>業務遂行に必要な範囲で、業務委託先（管理会社・保証会社・ITシステム運営事業者等）に委託する場合</li>
                        </ul>
                        <p className="mt-3">
                            この場合、当社は委託先に対し、個人情報の適切な取扱いを義務付け、監督を行います。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第6条（個人情報の管理）
                        </h2>
                        <p>
                            当社は、個人情報の漏洩、滅失または毀損を防止するため、適切な安全管理措置を講じます。
                            また、個人情報への不正アクセス防止のため、セキュリティ対策・アクセス制御・教育指導を徹底します。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第7条（個人情報の開示・訂正・利用停止等）
                        </h2>
                        <p>
                            お客様は、当社に対し、自己の個人情報の開示、訂正、追加、削除、利用停止または第三者提供の停止を求めることができます。
                            その際は、当社所定の手続きにより、本人確認の上、法令に基づき速やかに対応いたします。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第8条（クッキー等の使用について）
                        </h2>
                        <p>
                            当社ウェブサイトでは、利便性の向上およびアクセス解析のため、クッキー（Cookie）やアクセスログを使用する場合があります。
                            これにより個人を特定する情報を収集することはありません。
                            お客様はブラウザ設定によりクッキーの受け取りを拒否することが可能ですが、一部機能がご利用いただけない場合があります。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第9条（本ポリシーの改定）
                        </h2>
                        <p>
                            当社は、社会情勢・法令・技術の変化等に応じて、本プライバシーポリシーの内容を改定する場合があります。
                            改定後の内容は当社ウェブサイトに掲載することにより効力を生じます。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-gray-800 mb-2 text-[clamp(1.25rem,3.2vw,1.5rem)]">
                            第10条（お問い合わせ窓口）
                        </h2>
                        <address className="not-italic">
                            株式会社デッカマン<br />
                            メール：support@dekkaman.jp<br />
                            受付時間：10:00〜17:00（土日祝・年末年始除く）
                        </address>
                    </section>

                    <section>
                        <p className="text-gray-500 text-sm">施行日：2025年10月30日</p>
                    </section>
                </div>
            </section>
        </main>
    );
}
