'use client'

import { deleteIncomeTaxFiling } from '../actions'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"

export function DeleteIncomeTaxButton({ id }: { id: string }) {
    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this filing?')) return

        const res = await deleteIncomeTaxFiling(id)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success("Deleted successfully")
        }
    }

    return (
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
