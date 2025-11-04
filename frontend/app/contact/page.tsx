// app/contact/page.tsx
"use client";
import ContactSection from "@/components/sections/Contact";

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
            <section>
                <ContactSection />
            </section>
        </main>
    );
}
