import { createClient } from '@/lib/supabase/server'
import { TaskForm } from './task-form'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function TasksPage() {
    const supabase = await createClient()

    const { data: tasks } = await supabase
        .from('tasks')
        .select('*, client:clients(trade_name), assignee:profiles(full_name)')
        .order('created_at', { ascending: false })

    const { data: staff } = await supabase.from('profiles').select('id, full_name')
    const { data: clients } = await supabase.from('clients').select('id, trade_name')

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
                <TaskForm staff={staff || []} clients={clients || []} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Work</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Deadline</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks?.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.nature_of_work}</TableCell>
                                <TableCell>{task.client?.trade_name || '-'}</TableCell>
                                <TableCell>{task.assignee?.full_name || '-'}</TableCell>
                                <TableCell>
                                    <Badge variant={task.status === 'Completed' ? 'default' : 'outline'}>
                                        {task.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
