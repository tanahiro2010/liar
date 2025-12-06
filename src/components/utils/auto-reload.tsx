"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AutoReload() {
    const router = useRouter();

    useEffect(() => {
        // 5分ごとにリロード
        const interval = setInterval(() => {
            router.refresh();
        }, 5 * 1000);

        return () => clearInterval(interval);
    }, [router]);

    return null;
}