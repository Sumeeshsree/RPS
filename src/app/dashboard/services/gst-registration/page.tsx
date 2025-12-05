import { createClient } from '@/lib/supabase/server'
import { GSTRegForm } from './gst-reg-form'
import { DeleteGSTRegButton } from './delete-button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function GSTRegistrationPage() {
    const supabase = await createClient()

    const { data: services } = await supabase
        .from('service_gst_registrations')
        .select('*, client:clients(trade_name)')
        .order('created_at', { ascending: false })

    const { data: clients } = await supabase.from('clients').select('*')

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">GST Registrations</h2>
                <GSTRegForm clients={clients || []} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Trade Name</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Mobile</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.trade_name}</TableCell>
                                <TableCell>{service.client?.trade_name || '-'}</TableCell>
                                <TableCell>{service.mobile}</TableCell>
                                <TableCell>
                                    <Badge variant={service.status === 'Completed' ? 'default' : 'outline'}>
                                        {service.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(service.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="flex gap-2">
                                    <GSTRegForm clients={clients || []} service={service} />
                                    <DeleteGSTRegButton id={service.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
