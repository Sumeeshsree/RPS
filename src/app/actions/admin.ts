'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upgradeToAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/users')
    return { success: true }
}
