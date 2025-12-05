'use client'

import { useState } from 'react'
import { addCredential } from '../actions'
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

export function AddCredentialForm({ clientId }: { clientId: string }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const res = await addCredential(clientId, formData)
        setLoading(false)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success("Credential added successfully")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Add New Credential</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Credential</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="service_name" className="text-right">Service</Label>
                        <Input id="service_name" name="service_name" placeholder="GST Portal" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">Username</Label>
                        <Input id="username" name="username" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">Password</Label>
                        <Input id="password" name="password" type="password" className="col-span-3" required />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>Save (Encrypted)</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
