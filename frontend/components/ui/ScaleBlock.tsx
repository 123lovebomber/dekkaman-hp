// File: components/ui/ScaleBlock.tsx
// 目的: 子コンテンツを "出来上がった見た目のまま" 親の横幅に収めて縮小（transform: scale）する
// - transform-origin: top left
// - 外側の高さを内側の自然高さ×scaleで確保 → レイアウトシフトなし
// - 親幅・子の自然幅/高さ・フォントロード後で自動再計算


"use client";
import React, { useLayoutEffect, useRef, useState } from "react";


type Props = React.PropsWithChildren<{
    className?: string;
    /** 最小倍率（可読性の担保。既定=0.7） */
    minScale?: number;
    /** スケール無効化（デバッグ用） */
    disabled?: boolean;
}>;


export default function ScaleBlock({ children, className = "", minScale = 0.7, disabled = false }: Props) {
    const outerRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [dims, setDims] = useState<{ scale: number; h: number }>({ scale: 1, h: 0 });


    useLayoutEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;


        let raf = 0;


        const measure = () => {
            // 一旦スケールを外して“自然サイズ”を測る
            const prev = inner.style.transform;
            inner.style.transform = "none";


            const parentW = outer.getBoundingClientRect().width || 1;
            const natural = inner.getBoundingClientRect();
            const naturalW = Math.max(1, natural.width);
            const naturalH = Math.max(1, natural.height);


            // 親幅に収める倍率（>1の場合でも 1 に丸める＝拡大しない）
            let scale = Math.min(1, parentW / naturalW);
            if (!isFinite(scale) || scale <= 0) scale = 1;
            if (minScale != null) scale = Math.max(minScale, scale);


            setDims({ scale, h: naturalH * scale });
            // 計測後に元のtransformへ（実際の描画はstyleに反映される）
            inner.style.transform = prev;
        };


        const schedule = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(measure);
        };


        schedule();


        const roOuter = new ResizeObserver(schedule);
        const roInner = new ResizeObserver(schedule);
        roOuter.observe(outer);
        roInner.observe(inner);


        const fr = (document as any)?.fonts?.ready;
        if (fr?.then) fr.then(schedule).catch(() => { });


        return () => {
            cancelAnimationFrame(raf);
            roOuter.disconnect();
            roInner.disconnect();
        };
    }, [minScale]);


    const { scale, h } = dims;


    return (
        <div ref={outerRef} className={className} style={{ height: disabled ? undefined : h || undefined }}>
            <div
                ref={innerRef}
                style={disabled ? undefined : { transform: `scale(${scale})`, transformOrigin: "top left" }}
            >
                {children}
            </div>
        </div>
    );
}