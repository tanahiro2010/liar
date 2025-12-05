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
        try {
            const pushAd = () => {
                const done = insRef.current?.getAttribute("data-adsbygoogle-status") === "done";
                if (done) return;
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            };

            if (typeof window !== "undefined") {
                // @ts-ignore
                if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
                    pushAd();
                } else {
                    const id = setTimeout(pushAd, 500);
                    return () => clearTimeout(id);
                }
            }
        } catch (e) {
            console.log("Adsense error:", e);
        }
    }, []);

    const isDev = process.env.NODE_ENV !== "production";

    return (
        <ins
            ref={(el) => {
                insRef.current = el as unknown as HTMLElement;
            }}
            className={`adsbygoogle ${className ?? ""}`}
            style={{ display: "block" }}
            data-ad-client={client ?? process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
            data-ad-slot={slot ?? process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID}
            data-ad-format="auto"
            data-full-width-responsive="true"
            data-adtest={isDev ? "on" : undefined}
        ></ins>
    );
}