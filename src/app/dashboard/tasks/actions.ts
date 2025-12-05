'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTask(formData: FormData) {
    const supabase = await createClient()

    const nature_of_work = formData.get('nature_of_work') as string
    const client_id = formData.get('client_id') as string
    const assigned_to = formData.get('assigned_to') as string
    const deadline = formData.get('deadline') as string
    const remarks = formData.get('remarks') as string

    const { error } = await supabase.from('tasks').insert({
        nature_of_work,
        client_id: client_id || null,
        assigned_to: assigned_to || null,
        deadline: deadline || null,
        remarks,
        status: 'Pending'
    })

    if (error) return { error: error.message }
    revalidatePath('/dashboard/tasks')
    return { success: true }
}

export async function updateTask(id: string, formData: FormData) {
    const supabase = await createClient()

    const nature_of_work = formData.get('nature_of_work') as string
    const client_id = formData.get('client_id') as string
    const assigned_to = formData.get('assigned_to') as string
    const deadline = formData.get('deadline') as string
    const remarks = formData.get('remarks') as string
    const status = formData.get('status') as string

    const { error } = await supabase.from('tasks').update({
        nature_of_work,
        client_id: client_id || null,
        assigned_to: assigned_to || null,
        deadline: deadline || null,
        remarks,
        status
    }).eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/tasks')
    return { success: true }
}

export async function deleteTask(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/tasks')
    return { success: true }
}

export async function updateTaskStatus(id: string, status: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('tasks').update({ status }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/tasks')
    return { success: true }
}
