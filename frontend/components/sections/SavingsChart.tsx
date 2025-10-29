"use client";
import { useEffect, useRef, useState } from "react";

type Row = {
    label: string;
    value: number;
    start: number;
    end: number;
    color: string;
    delay?: number;
    animate?: boolean;
};

export default function SavingsChart() {
    const rows: Row[] = [
        { label: "一般的な仲介手数料", value: 1.10, start: 100, end: 100, color: "from-gray-400 to-gray-300", animate: false },
        { label: "Dekkaman", value: 0.55, start: 100, end: 50, color: "from-blue-600 to-blue-400", delay: 800, animate: true },
        { label: "物件によっては", value: 0.00, start: 50, end: 0, color: "from-blue-300 to-blue-200", delay: 800, animate: true },
    ];

    const ref = useRef<HTMLDivElement | null>(null);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setPlay(true);
                    io.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} className="w-full text-left">
            <h3 className="font-bold text-black leading-tight tracking-tight text-[clamp(1.5rem,4.2vw,3.25rem)] mb-6">
                ちなみに、少なくともこれくらい安くなります。
            </h3>

            <div className="space-y-6">
                {rows.map((r, i) => (
                    <div key={r.label} className="grid grid-cols-[auto,1fr] items-center gap-x-5">
                        <div>
                            <div className={`text-[clamp(.9rem,2vw,1rem)] ${i === 2 ? "text-gray-400" : "text-gray-700"}`}>
                                {r.label}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span
                                    className={`font-bold tabular-nums leading-none ${i === 0
                                        ? "text-[clamp(1.8rem,4.5vw,2.4rem)] text-gray-800"
                                        : i === 1
                                            ? "text-[clamp(1.7rem,4.3vw,2.2rem)] text-gray-800"
                                            : "text-[clamp(1.4rem,3.8vw,1.9rem)] text-gray-400"
                                        }`}
                                >
                                    {r.value.toFixed(2)}
                                </span>
                                <span
                                    className={`text-[clamp(.9rem,2vw,1rem)] ${i === 2 ? "text-gray-400" : "text-gray-600"
                                        }`}
                                >
                                    ヶ月分（税込）
                                </span>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                                <div
                                    className={[
                                        "h-full rounded-full bg-gradient-to-r",
                                        r.color,
                                        r.animate ? "transition-[width] duration-[2000ms] ease-[cubic-bezier(.22,.61,.36,1)]" : "",
                                    ].join(" ")}
                                    style={{
                                        width: `${play && r.animate ? r.end : r.start}%`,
                                        transitionDelay: r.animate ? `${r.delay ?? 0}ms` : "0ms",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                ※ 表示は仲介手数料の比較です。敷金・礼金・保証料・鍵交換などは物件により異なります。
            </p>
        </div>
    );
}
