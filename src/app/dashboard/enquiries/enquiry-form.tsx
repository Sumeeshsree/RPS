'use client'

import { useState } from 'react'
import { createEnquiry, updateEnquiry } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Enquiry } from '@/types'

export function EnquiryForm({ enquiry }: { enquiry?: Enquiry }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const isEditing = !!enquiry

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const res = isEditing
            ? await updateEnquiry(enquiry.id, formData)
            : await createEnquiry(formData)

        setLoading(false)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success(isEditing ? "Enquiry updated" : "Enquiry created")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={isEditing ? "ghost" : "default"}>
                    {isEditing ? "Edit" : "New Enquiry"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Enquiry" : "Add New Enquiry"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Update the enquiry details." : "Enter the details of the new enquiry."}
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" defaultValue={enquiry?.name} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mobile" className="text-right">Mobile</Label>
                        <Input id="mobile" name="mobile" defaultValue={enquiry?.mobile || ''} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={enquiry?.email || ''} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nature" className="text-right">Nature</Label>
                        <Input id="nature" name="nature" defaultValue={enquiry?.nature_of_enquiry || ''} className="col-span-3" placeholder="GST, IT, etc." required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="remarks" className="text-right">Remarks</Label>
                        <Input id="remarks" name="remarks" defaultValue={enquiry?.remarks || ''} className="col-span-3" />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
