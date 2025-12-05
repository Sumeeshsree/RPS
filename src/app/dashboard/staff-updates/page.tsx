import { createClient } from '@/lib/supabase/server'
import { StaffUpdateForm } from './staff-update-form'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function StaffUpdatesPage() {
    const supabase = await createClient()

    const { data: updates } = await supabase
        .from('staff_updates')
        .select('*, user:profiles(full_name)')
        .order('date', { ascending: false })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Staff Updates</h2>
                <StaffUpdateForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Staff</TableHead>
                            <TableHead>Work Done</TableHead>
                            <TableHead>Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {updates?.map((update) => (
                            <TableRow key={update.id}>
                                <TableCell>{update.date}</TableCell>
                                <TableCell>{update.user?.full_name}</TableCell>
                                <TableCell className="max-w-md truncate">{update.work_done}</TableCell>
                                <TableCell>{update.remarks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
