"use client";
import Image from "next/image";
import Link from "next/link";

export default function ContactButton() {
    return (
        <Link
            href="/contact"
            className="
        inline-flex items-center justify-center
        text-gray-800 bg-white
        border border-gray-300
        shadow-[0_2px_6px_rgba(75,85,99,0.15)]     /* gray-600ベースの柔らかい影 */
        hover:shadow-[0_4px_10px_rgba(75,85,99,0.25)]
        hover:border-gray-400
        focus:ring-4 focus:outline-none focus:ring-gray-200
        font-medium rounded-lg
        text-sm sm:text-base
        px-10 sm:px-12 py-3
        transition-all duration-200
      "
        >
            <Image
                src="/brand/favicon/mail2.svg"
                alt="DekkaManロゴ"
                width={23}
                height={23}
                className="me-2 -ms-1"
                priority
            />
            お気軽にご依頼ください
        </Link>
    );
}
