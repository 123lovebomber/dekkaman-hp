// app/components/FitGroup.tsx
"use client";
import { createContext, useContext, useRef, useLayoutEffect, useState } from "react";

type Ctx = {
    targetWidth: number;     // コンテナの内側幅（px）
    baseChars: number;       // 基準行の文字数
    setBaseChars: (n: number) => void;
    registerMeasureTarget: (el: HTMLDivElement | null) => void;
};

export const FitCtx = createContext<Ctx | null>(null);
export function useFitCtx() {
    const ctx = useContext(FitCtx);
    if (!ctx) throw new Error("FitLine must be inside <FitGroup>");
    return ctx;
}

export default function FitGroup({ children }: { children: React.ReactNode }) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const [targetWidth, setTargetWidth] = useState(0);
    const [baseChars, setBaseChars] = useState(0);

    useLayoutEffect(() => {
        if (!wrapRef.current) return;
        const el = wrapRef.current;

        const update = () => setTargetWidth(el.clientWidth || 1);
        update();

        const ro = new ResizeObserver(update);
        ro.observe(el);
        window.addEventListener("resize", update);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <div ref={wrapRef} className="w-full">
            <FitCtx.Provider
                value={{
                    targetWidth,
                    baseChars,
                    setBaseChars,
                    registerMeasureTarget: () => { },
                }}
            >
                {children}
            </FitCtx.Provider>
        </div>
    );
}