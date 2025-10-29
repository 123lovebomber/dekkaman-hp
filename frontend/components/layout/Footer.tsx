// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            className="
        w-full border-t border-gray-200 bg-white
        py-6
      "
        >
            <div
                className="
          mx-auto
          max-w-[880px] lg:max-w-[880px]
          [--pc-pad:clamp(20px,6vw,72px)]
          px-[max(20px,calc(env(safe-area-inset-left)+var(--pc-pad)))]
          flex flex-col sm:flex-row items-center justify-between gap-2
        "
            >
                <Link
                    href="/privacy"
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                    プライバシーポリシー
                </Link>

                <p className="text-xs text-gray-400 tracking-wide">
                    © {new Date().getFullYear()} Dekkaman Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
