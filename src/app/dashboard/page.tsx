export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder for stats cards */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Clients</h3>
                    </div>
                    <div className="text-2xl font-bold">--</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Pending Tasks</h3>
                    </div>
                    <div className="text-2xl font-bold">--</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Open Enquiries</h3>
                    </div>
                    <div className="text-2xl font-bold">--</div>
                </div>
            </div>
        </div>
    )
}
