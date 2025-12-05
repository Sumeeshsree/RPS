'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createInwardEntry(formData: FormData) {
    const supabase = await createClient()

    const received_date = formData.get('received_date') as string
    const sender = formData.get('sender') as string
    const type = formData.get('type') as string
    const description = formData.get('description') as string

    const { error } = await supabase.from('inward_register').insert({
        received_date: received_date || new Date().toISOString().split('T')[0],
        sender,
        type,
        description
    })

    if (error) return { error: error.message }
    revalidatePath('/dashboard/inward-register')
    return { success: true }
}
