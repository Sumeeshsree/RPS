'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createStaffUpdate(formData: FormData) {
    const supabase = await createClient()

    const work_done = formData.get('work_done') as string
    const remarks = formData.get('remarks') as string
    const date = formData.get('date') as string

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('staff_updates').insert({
        user_id: user.id,
        work_done,
        remarks,
        date: date || new Date().toISOString().split('T')[0]
    })

    if (error) return { error: error.message }
    revalidatePath('/dashboard/staff-updates')
    return { success: true }
}
