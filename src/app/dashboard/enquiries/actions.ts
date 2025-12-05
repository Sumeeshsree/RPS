'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createEnquiry(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const nature = formData.get('nature') as string
    const remarks = formData.get('remarks') as string

    const { error } = await supabase.from('enquiries').insert({
        name,
        mobile,
        email,
        nature_of_enquiry: nature,
        remarks,
        status: 'Open'
    })

    if (error) return { error: error.message }
    revalidatePath('/dashboard/enquiries')
    return { success: true }
}

export async function updateEnquiryStatus(id: string, status: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/enquiries')
    return { success: true }
}
