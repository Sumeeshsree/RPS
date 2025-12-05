'use client'

import { deleteClientRecord } from './actions'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"

export function DeleteClientButton({ clientId }: { clientId: string }) {
    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this client?')) return

        const res = await deleteClientRecord(clientId)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success("Client deleted successfully")
        }
    }

    return (
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
