
export default function DashboardLoading() {
    return (
        <div className="flex flex-col gap-4">
            <div className="h-8 w-48 animate-pulse rounded-md bg-muted/50" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 w-24 animate-pulse rounded bg-muted/50" />
                        </div>
                        <div className="h-8 w-12 animate-pulse rounded bg-muted/50 mt-2" />
                    </div>
                ))}
            </div>
            <div className="h-[300px] w-full animate-pulse rounded-xl border bg-muted/20" />
        </div>
    )
}
