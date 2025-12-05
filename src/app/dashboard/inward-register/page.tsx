import { createClient } from '@/lib/supabase/server'
import { InwardForm } from './inward-form'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function InwardRegisterPage() {
    const supabase = await createClient()

    const { data: entries } = await supabase
        .from('inward_register')
        .select('*')
        .order('received_date', { ascending: false })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Inward Register</h2>
                <InwardForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Sender</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries?.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>{entry.received_date}</TableCell>
                                <TableCell>{entry.sender}</TableCell>
                                <TableCell>{entry.type}</TableCell>
                                <TableCell>{entry.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
