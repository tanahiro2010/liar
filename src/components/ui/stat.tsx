export function StatItem({ number, label }: { number: number; label: string }) {
    return (
        <div className="stat-item">
            <span className="stat-number">{number}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
}

export function StatCard({ number, label }: { number: number; label: string }) {
    return (
        <div className="stat-card">
            <span className="stat-card-number">{number}</span>
            <span className="stat-card-label">{label}</span>
        </div>
    );
}