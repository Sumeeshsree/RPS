import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Building2, FileInput, Landmark } from 'lucide-react'

const services = [
    {
        title: "GST Registration",
        href: "/dashboard/services/gst-registration",
        icon: FileText,
        description: "New GST Registration applications"
    },
    {
        title: "GST Amendments",
        href: "/dashboard/services/gst-amendment",
        icon: FileInput,
        description: "Changes to existing GST registrations"
    },
    {
        title: "Company Formation",
        href: "/dashboard/services/company-formation",
        icon: Building2,
        description: "Incorporation of new companies"
    },
    {
        title: "Income Tax Filing",
        href: "/dashboard/services/income-tax",
        icon: Landmark,
        description: "Income Tax Return filings"
    }
]

export default function ServicesPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight">Office Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                    <Link key={service.href} href={service.href}>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {service.title}
                                </CardTitle>
                                <service.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
