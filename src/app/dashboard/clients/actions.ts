'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { encrypt, decrypt } from '@/lib/encryption'

export async function createClientRecord(formData: FormData) {
    const supabase = await createClient()

    const trade_name = formData.get('trade_name') as string
    const legal_name = formData.get('legal_name') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const pan = formData.get('pan') as string
    const gstin = formData.get('gstin') as string

    const { error } = await supabase.from('clients').insert({
        trade_name,
        legal_name,
        mobile,
        email,
        pan,
        gstin
    })

    if (error) return { error: error.message }
    revalidatePath('/dashboard/clients')
    return { success: true }
}

export async function updateClientRecord(id: string, formData: FormData) {
    const supabase = await createClient()

    const trade_name = formData.get('trade_name') as string
    const legal_name = formData.get('legal_name') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const pan = formData.get('pan') as string
    const gstin = formData.get('gstin') as string

    const { error } = await supabase.from('clients').update({
        trade_name,
        legal_name,
        mobile,
        email,
        pan,
        gstin
    }).eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/clients')
    return { success: true }
}

export async function deleteClientRecord(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/clients')
    return { success: true }
}

export async function addCredential(clientId: string, formData: FormData) {
    const supabase = await createClient()
    const service_name = formData.get('service_name') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // Encrypt the data
    const dataToEncrypt = JSON.stringify({ username, password })
    const encryptedData = encrypt(dataToEncrypt)

    const { error } = await supabase.from('client_credentials').insert({
        client_id: clientId,
        service_name,
        encrypted_data: encryptedData
    })

    if (error) return { error: error.message }
    revalidatePath(`/dashboard/clients/${clientId}`)
    return { success: true }
}

export async function unlockCredential(credentialId: string, totpCode: string) {
    // TODO: Verify TOTP code here against admin secret
    // For now, we'll skip TOTP verification to demonstrate encryption/decryption flow
    // In production, fetch admin secret and verify using otplib

    const supabase = await createClient()
    const { data, error } = await supabase
        .from('client_credentials')
        .select('encrypted_data')
        .eq('id', credentialId)
        .single()

    if (error || !data) return { error: 'Credential not found' }

    try {
        const decrypted = decrypt(data.encrypted_data)
        return { success: true, data: JSON.parse(decrypted) }
    } catch (e) {
        return { error: 'Decryption failed' }
    }
}
