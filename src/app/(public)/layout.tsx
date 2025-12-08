import Sidebar from "@/components/layout/sidebar";
import "@/styles/main-content.css";
import "@/styles/sidebar.css";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="main-container">
            {children}

            <Sidebar />
        </div>
    );
}