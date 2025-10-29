"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header
            // 常時固定・半透明・ブラー・薄い影
            className="
        fixed top-0 left-0 right-0 z-50
        h-14 sm:h-16 bg-white/90 backdrop-blur shadow-sm
      "
        >
            <nav
                aria-label="Global"
                className="
          mx-auto
          /* モバイル基準の幅をPCにも適用 */
          max-w-[880px] lg:max-w-[880px]
          [--pc-pad:clamp(20px,6vw,72px)]
          px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
          h-full flex items-center justify-between
        "
            >
                {/* 左：ロゴ */}
                <Link href="/" className="block p-2.5 sm:p-1.5" aria-label="Dekkaman">
                    <Image
                        src="/brand/logo/dkmlogo.svg"
                        alt="Dekkaman"
                        width={46}
                        height={46}
                        className="h-9 sm:h-12 w-auto"
                        priority
                    />
                </Link>

                {/* 右：ナビ（モバイル幅のままPCにも適用、横スクロール可） */}
                <div
                    className="
            flex items-center justify-end flex-1
            gap-x-6 sm:gap-x-8
            text-sm sm:text-base
            overflow-x-auto overscroll-x-contain whitespace-nowrap
          "
                >
                    <Link
                        href="/company"
                        className="font-medium tracking-wide text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Company
                    </Link>
                    <Link
                        href="/recruit"
                        className="font-medium tracking-wide text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Recruit
                    </Link>
                    <Link
                        href="/contact"
                        className="font-medium tracking-wide text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    );
}
