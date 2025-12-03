"use client";
import { useEffect } from "react";

type Props = {
    client: string; // data-ad-client
    slot: string; // data-ad-slot
    className?: string;
};

export default function GoogleAdsense({ client, slot, className }: Props) {
    useEffect(() => {
        try {
            // @ts-ignore
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log("Adsense error:", e);
        }
    }, []);

    return (
        <ins
            className={`adsbygoogle ${className ?? ""}`}
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
}