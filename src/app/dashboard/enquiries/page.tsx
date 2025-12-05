import { createClient } from '@/lib/supabase/server'
import { DataTable } from './data-table'
import { columns } from './columns'
import { EnquiryForm } from './enquiry-form'

export default async function EnquiriesPage() {
    const supabase = await createClient()
    const { data: enquiries } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Enquiries</h2>
                <EnquiryForm />
            </div>
            <DataTable columns={columns} data={enquiries || []} />
        </div>
    )
}
