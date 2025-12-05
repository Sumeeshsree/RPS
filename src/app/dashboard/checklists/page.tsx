import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const checklists = [
    {
        title: "GST Registration",
        items: [
            "PAN Card of Business/Proprietor",
            "Aadhar Card of Proprietor",
            "Passport Size Photo",
            "Bank Account Details (Cancelled Cheque)",
            "Address Proof (Electricity Bill/Rent Agreement)",
            "NOC from Landlord (if rented)",
        ]
    },
    {
        title: "Company Formation (Pvt Ltd)",
        items: [
            "DSC (Digital Signature Certificate) for Directors",
            "DIN (Director Identification Number)",
            "Name Approval (RUN)",
            "MOA & AOA",
            "PAN & TAN Application",
            "Certificate of Incorporation",
        ]
    },
    {
        title: "Income Tax Filing",
        items: [
            "Form 16 from Employer",
            "Interest Certificates from Bank",
            "TDS Certificates (Form 16A)",
            "Investment Proofs (80C, 80D)",
            "Home Loan Statement",
            "Capital Gains Statement",
        ]
    }
]

export default function ChecklistsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Service Checklists</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {checklists.map((list) => (
                    <Card key={list.title}>
                        <CardHeader>
                            <CardTitle>{list.title}</CardTitle>
                            <CardDescription>Required documents and steps</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {list.items.map((item, i) => (
                                <div key={i} className="flex items-start space-x-2">
                                    <Checkbox id={`${list.title}-${i}`} />
                                    <Label htmlFor={`${list.title}-${i}`} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {item}
                                    </Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
