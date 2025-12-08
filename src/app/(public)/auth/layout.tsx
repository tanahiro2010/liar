import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const auth = await authClient.getSession();
    console.log("AuthLayout - auth:", auth);
    if (auth.data) {
        redirect("/dashboard");
    }
    return <>{ children }</>;
}