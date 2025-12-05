'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ServiceGSTRegistration, ServiceGSTAmendment, ServiceCompanyFormation, ServiceIncomeTaxFiling } from '@/types'

// GST Registration Actions
export async function createGSTRegistration(data: Partial<ServiceGSTRegistration>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_gst_registrations').insert(data)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/gst-registration')
}

export async function updateGSTRegistration(id: string, data: Partial<ServiceGSTRegistration>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_gst_registrations').update(data).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/gst-registration')
}

export async function deleteGSTRegistration(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_gst_registrations').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/gst-registration')
}

// GST Amendment Actions
export async function createGSTAmendment(data: Partial<ServiceGSTAmendment>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_gst_amendments').insert(data)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/gst-amendment')
}

export async function updateGSTAmendment(id: string, data: Partial<ServiceGSTAmendment>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_gst_amendments').update(data).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/gst-amendment')
}

export async function deleteGSTAmendment(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_gst_amendments').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/gst-amendment')
}

// Company Formation Actions
export async function createCompanyFormation(data: Partial<ServiceCompanyFormation>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_company_formations').insert(data)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/company-formation')
}

export async function updateCompanyFormation(id: string, data: Partial<ServiceCompanyFormation>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_company_formations').update(data).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/company-formation')
}

export async function deleteCompanyFormation(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_company_formations').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/company-formation')
}

// Income Tax Filing Actions
export async function createIncomeTaxFiling(data: Partial<ServiceIncomeTaxFiling>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_income_tax_filings').insert(data)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/income-tax')
}

export async function updateIncomeTaxFiling(id: string, data: Partial<ServiceIncomeTaxFiling>) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_income_tax_filings').update(data).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/income-tax')
}

export async function deleteIncomeTaxFiling(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('service_income_tax_filings').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/services/income-tax')
}
