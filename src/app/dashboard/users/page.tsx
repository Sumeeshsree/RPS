import { createClient } from '@/lib/supabase/server'
import { UserForm } from './user-form'
import { DeleteUserButton } from './delete-user-button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { redirect } from 'next/navigation'

export default async function UsersPage() {
    const supabase = await createClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p>Only Administrators can access this page.</p>
                <form action={async () => {
                    'use server'
                    const { upgradeToAdmin } = await import('@/app/actions/admin')
                    await upgradeToAdmin()
                }}>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        Make Me Admin (Dev Only)
                    </button>
                </form>
            </div>
        )
    }

    const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
                <UserForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell className="font-medium">{u.full_name}</TableCell>
                                <TableCell>
                                    <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                                        {u.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {u.id !== user.id && (
                                        <DeleteUserButton userId={u.id} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
