'use client'

import { useState } from 'react'
import { createTask, updateTask } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Task } from '@/types'

interface Profile {
    id: string
    full_name: string
}

interface Client {
    id: string
    trade_name: string
}

export function TaskForm({ staff, clients, task }: { staff: Profile[], clients: Client[], task?: Task }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const isEditing = !!task

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const res = isEditing
            ? await updateTask(task.id, formData)
            : await createTask(formData)

        setLoading(false)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success(isEditing ? "Task updated" : "Task created")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={isEditing ? "ghost" : "default"}>
                    {isEditing ? "Edit" : "New Task"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Task" : "Assign New Task"}</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nature_of_work" className="text-right">Work</Label>
                        <Input id="nature_of_work" name="nature_of_work" defaultValue={task?.nature_of_work} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="client_id" className="text-right">Client</Label>
                        <div className="col-span-3">
                            <Select name="client_id" defaultValue={task?.client_id || undefined}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.trade_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assigned_to" className="text-right">Assign To</Label>
                        <div className="col-span-3">
                            <Select name="assigned_to" defaultValue={task?.assigned_to || undefined}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select staff" />
                                </SelectTrigger>
                                <SelectContent>
                                    {staff.map(s => (
                                        <SelectItem key={s.id} value={s.id}>{s.full_name || 'Unknown'}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deadline" className="text-right">Deadline</Label>
                        <Input id="deadline" name="deadline" type="date" defaultValue={task?.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''} className="col-span-3" />
                    </div>
                    {isEditing && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <div className="col-span-3">
                                <Select name="status" defaultValue={task?.status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="On Hold">On Hold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {isEditing ? 'Update' : 'Assign'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
