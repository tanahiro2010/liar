import Link from "next/link";

interface ActionLinkProps {
    href: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
}
export function ActionLink({ href, icon, title, description }: ActionLinkProps) {
    return (
        <Link href={href} className="action-card">
            <div className="action-icon">{ icon }</div>
            <h3 className="action-title">{ title }</h3>
            <p className="action-desc">{ description }</p>
        </Link>
    );
}