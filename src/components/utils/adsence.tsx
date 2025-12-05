"use client";
import { useEffect, useRef } from "react";

type Props = {
    client?: string; // data-ad-client
    slot?: string; // data-ad-slot
    className?: string;
};

export default function GoogleAdsense({ client, slot, className }: Props) {
    const insRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let cleanupFns: Array<() => void> = [];

        const hasRendered = () => insRef.current?.getAttribute("data-adsbygoogle-status") === "done";
        const getWidth = () => {
            const el = insRef.current;
            if (!el) return 0;
            const w = el.offsetWidth || el.parentElement?.offsetWidth || 0;
            return w ?? 0;
        };

        const tryPush = () => {
            if (!insRef.current || hasRendered()) return;
            const width = getWidth();
            if (width <= 0) return; // 幅0の間は初期化しない
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                if (process.env.NODE_ENV !== "production") {
                    console.log("Adsense push error:", e);
                }
            }
        };

        // scriptロード待ち + 初期トライ
        const initialTimer = window.setTimeout(tryPush, 300);
        cleanupFns.push(() => window.clearTimeout(initialTimer));

        // IntersectionObserver: 可視になったらトライ
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) tryPush();
        });
        if (insRef.current) io.observe(insRef.current);
        cleanupFns.push(() => io.disconnect());

        // ResizeObserver: 幅が変わったらトライ
        const ro = new ResizeObserver(() => tryPush());
        if (insRef.current) ro.observe(insRef.current);
        // 親の幅変化にも対応
        if (insRef.current?.parentElement) ro.observe(insRef.current.parentElement);
        cleanupFns.push(() => ro.disconnect());

        // window リサイズ時にもトライ
        const onResize = () => tryPush();
        window.addEventListener("resize", onResize);
        cleanupFns.push(() => window.removeEventListener("resize", onResize));

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, []);

    const isDev = process.env.NODE_ENV !== "production";

    return (
        <ins
            ref={(el) => {
                insRef.current = el as unknown as HTMLElement;
            }}
            className={`adsbygoogle ${className ?? ""}`}
            style={{ display: "block", width: "100%" }}
            data-ad-client={client ?? process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
            data-ad-slot={slot ?? process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID}
            data-ad-format="auto"
            data-full-width-responsive="true"
            data-adtest={isDev ? "on" : undefined}
        ></ins>
    );
}