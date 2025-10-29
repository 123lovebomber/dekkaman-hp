// app/contact/page.tsx
"use client";

const container = `
  w-full mx-auto
  max-w-[880px] lg:max-w-[880px]
  [--pc-pad:clamp(20px,6vw,72px)]
  px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
  py-[clamp(24px,6vw,72px)]
  pt-[clamp(59px,3vw,32px)
`;

export default function ContactPage() {
    return (
        <main className="bg-white pt-[clamp(59px,3vw,32px)">
            <section className={container}>

                <div className="pt-[clamp(12px,2.5vw,28px)]" />
                <h1 className="font-bold text-gray-800 tracking-tight leading-tight
                       text-[clamp(1.75rem,4.2vw,2.25rem)]">
                    お問い合わせ
                </h1>

                <p className="mt-4 text-gray-600 text-[clamp(1rem,2.2vw,1.0625rem)]">
                    物件探しのご依頼・ご質問はこちらからお送りください。担当より折り返しご連絡いたします。
                </p>

                <form
                    className="mt-8 space-y-6"
                    // 後で API 接続に差し替え
                    onSubmit={(e) => { e.preventDefault(); alert("送信しました（ダミー）"); }}
                    noValidate
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">お名前</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2
                         text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            placeholder="山田 太郎"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2
                         text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            placeholder="taro@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">ご用件</label>
                        <input
                            type="text"
                            name="subject"
                            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2
                         text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            placeholder="物件探しの依頼 / 初期費用の見積 など"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">内容</label>
                        <textarea
                            name="message"
                            rows={6}
                            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2
                         text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            placeholder="ご希望条件（エリア/家賃/入居時期/間取り など）を可能な範囲でご記載ください。"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center
                         text-gray-100 bg-gray-800 hover:bg-gray-700
                         focus:ring-4 focus:outline-none focus:ring-gray-700/30
                         font-medium rounded-lg
                         px-6 py-2.5 text-sm sm:text-base transition-colors"
                        >
                            送信する
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
