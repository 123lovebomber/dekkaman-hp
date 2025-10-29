import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* 固定ヘッダー */}
        <Header />

        {/* コンテンツ領域 */}
        <main className="flex-1 pt-[var(--header-h,4rem)]">
          {children}
        </main>

        {/* フッター（下に固定） */}
        <Footer />
      </body>
    </html>
  );
}