'use client'

import { deleteUser } from './actions'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"

export function DeleteUserButton({ userId }: { userId: string }) {
    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this user?')) return

        const res = await deleteUser(userId)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success("User deleted successfully")
        }
    }

    return (
        <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
