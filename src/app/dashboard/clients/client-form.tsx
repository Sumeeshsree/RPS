'use client'

import { useState } from 'react'
import { createClientRecord, updateClientRecord } from './actions'
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
import { toast } from "sonner"
import { Client } from '@/types'

export function ClientForm({ client }: { client?: Client }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const isEditing = !!client

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const res = isEditing
            ? await updateClientRecord(client.id, formData)
            : await createClientRecord(formData)

        setLoading(false)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success(isEditing ? "Client updated" : "Client created")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={isEditing ? "ghost" : "default"}>
                    {isEditing ? "Edit" : "New Client"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Client" : "Add New Client"}</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="trade_name" className="text-right">Trade Name</Label>
                        <Input id="trade_name" name="trade_name" defaultValue={client?.trade_name} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="legal_name" className="text-right">Legal Name</Label>
                        <Input id="legal_name" name="legal_name" defaultValue={client?.legal_name || ''} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mobile" className="text-right">Mobile</Label>
                        <Input id="mobile" name="mobile" defaultValue={client?.mobile || ''} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="gstin" className="text-right">GSTIN</Label>
                        <Input id="gstin" name="gstin" defaultValue={client?.gstin || ''} className="col-span-3" />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
