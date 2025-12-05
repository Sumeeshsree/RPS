import { createClient } from '@/lib/supabase/server'
import { CompanyFormationForm } from './company-formation-form'
import { DeleteCompanyFormationButton } from './delete-button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function CompanyFormationPage() {
    const supabase = await createClient()

    const { data: services } = await supabase
        .from('service_company_formations')
        .select('*, client:clients(trade_name)')
        .order('created_at', { ascending: false })

    const { data: clients } = await supabase.from('clients').select('*')

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Company Formations</h2>
                <CompanyFormationForm clients={clients || []} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Proposed Name</TableHead>
                            <TableHead>Capital</TableHead>
                            <TableHead>Directors</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.client?.trade_name || '-'}</TableCell>
                                <TableCell>{service.proposed_name_1}</TableCell>
                                <TableCell>{service.capital_amount}</TableCell>
                                <TableCell>{(service.director_details as any[])?.length || 0}</TableCell>
                                <TableCell>
                                    <Badge variant={service.status === 'Completed' ? 'default' : 'outline'}>
                                        {service.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <CompanyFormationForm clients={clients || []} service={service} />
                                    <DeleteCompanyFormationButton id={service.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
