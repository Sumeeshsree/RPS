import { createClient } from '@/lib/supabase/server'
import { ClientForm } from './client-form'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { DeleteClientButton } from './delete-client-button'

import { CsvActions } from './csv-actions'

export default async function ClientsPage() {
    const supabase = await createClient()
    const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
                <div className="flex gap-2">
                    <CsvActions data={clients || []} />
                    <ClientForm />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Trade Name</TableHead>
                            <TableHead>Mobile</TableHead>
                            <TableHead>GSTIN</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients?.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell className="font-medium">{client.trade_name}</TableCell>
                                <TableCell>{client.mobile}</TableCell>
                                <TableCell>{client.gstin}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button variant="ghost" asChild>
                                        <Link href={`/dashboard/clients/${client.id}`}>View</Link>
                                    </Button>
                                    <ClientForm client={client} />
                                    <DeleteClientButton clientId={client.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
