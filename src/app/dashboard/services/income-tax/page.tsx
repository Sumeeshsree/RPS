import { createClient } from '@/lib/supabase/server'
import { IncomeTaxForm } from './income-tax-form'
import { DeleteIncomeTaxButton } from './delete-button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function IncomeTaxPage() {
    const supabase = await createClient()

    const { data: services } = await supabase
        .from('service_income_tax_filings')
        .select('*, client:clients(trade_name)')
        .order('created_at', { ascending: false })

    const { data: clients } = await supabase.from('clients').select('*')

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Income Tax Filings</h2>
                <IncomeTaxForm clients={clients || []} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>PAN</TableHead>
                            <TableHead>Assessment Year</TableHead>
                            <TableHead>Ack No</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.client?.trade_name || '-'}</TableCell>
                                <TableCell>{service.pan_number}</TableCell>
                                <TableCell>{service.assessment_year}</TableCell>
                                <TableCell>{service.acknowledgement_no || '-'}</TableCell>
                                <TableCell>
                                    <Badge variant={service.status === 'Completed' ? 'default' : 'outline'}>
                                        {service.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <IncomeTaxForm clients={clients || []} service={service} />
                                    <DeleteIncomeTaxButton id={service.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
