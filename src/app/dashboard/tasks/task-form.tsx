'use client'

import { useState } from 'react'
import { createTask } from './actions'
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

interface Profile {
    id: string
    full_name: string
}

interface Client {
    id: string
    trade_name: string
}

export function TaskForm({ staff, clients }: { staff: Profile[], clients: Client[] }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const res = await createTask(formData)
        setLoading(false)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success("Task created successfully")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>New Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Assign New Task</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nature_of_work" className="text-right">Work</Label>
                        <Input id="nature_of_work" name="nature_of_work" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="client_id" className="text-right">Client</Label>
                        <div className="col-span-3">
                            <Select name="client_id">
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
                            <Select name="assigned_to">
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
                        <Input id="deadline" name="deadline" type="date" className="col-span-3" />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>Assign</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
