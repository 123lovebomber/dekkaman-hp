"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
    to: number;            // 目標値
    from?: number;         // 開始値（未指定なら 0）
    duration?: number;     // アニメ時間(ms)
    prefix?: string;       // 先頭文字（例："￥-"）
    suffix?: string;       // 後尾文字（例："%"）
    decimals?: number;     // 小数桁数（%で0.5等を使うなら指定）
};

export default function Counter({
    to,
    from = 0,
    duration = 1200,
    prefix = "",
    suffix = "",
    decimals = 0,
}: Props) {
    const [val, setVal] = useState(from);
    const elRef = useRef<HTMLSpanElement | null>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                if (!started.current && entries[0].isIntersecting) {
                    started.current = true;
                    const start = performance.now();

                    const step = (now: number) => {
                        const t = Math.min(1, (now - start) / duration);
                        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
                        const current = from + (to - from) * eased;
                        const factor = Math.pow(10, decimals);
                        setVal(Math.round(current * factor) / factor);
                        if (t < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.35 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [from, to, duration, decimals]);

    const formatted =
        decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString("ja-JP");

    return (
        <span ref={elRef}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}
