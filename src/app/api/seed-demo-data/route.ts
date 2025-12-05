
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    // 1. Clients
    const clients = [
        { trade_name: 'Tech Corp', legal_name: 'Technology Corporation Pvt Ltd', mobile: '9876543210', email: 'contact@techcorp.com', gstin: '29ABCDE1234F1Z5', pan: 'ABCDE1234F' },
        { trade_name: 'Fresh Foods', legal_name: 'Fresh Foods Limited', mobile: '9123456780', email: 'info@freshfoods.com', gstin: '29XYZAB5678G2Z1', pan: 'XYZAB5678G' },
        { trade_name: 'Consultency Hub', legal_name: 'Global Consultancy Hub LLP', mobile: '9988776655', email: 'hello@consultencyhub.com', gstin: '29LMNOP9012H3Z9', pan: 'LMNOP9012H' },
    ]

    const { data: insertedClients, error: clientError } = await supabase
        .from('clients')
        .insert(clients)
        .select()

    if (clientError) {
        return NextResponse.json({ error: 'Failed to seed clients: ' + clientError.message }, { status: 500 })
    }

    // 2. Enquiries
    const enquiries = [
        { name: 'John Doe', mobile: '9876500001', service_type: 'GST Registration', remarks: 'Needs urgent registration', status: 'New' },
        { name: 'Jane Smith', mobile: '9876500002', service_type: 'Income Tax Return', remarks: 'For FY 2024-25', status: 'In Progress' },
    ]

    await supabase.from('enquiries').insert(enquiries)

    // 3. Tasks
    if (insertedClients && insertedClients.length > 0) {
        const tasks = [
            { nature_of_work: 'Monthly GST Filing', client_id: insertedClients[0].id, status: 'Pending', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
            { nature_of_work: 'Annual Return', client_id: insertedClients[1].id, status: 'In Progress', deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() },
            { nature_of_work: 'Income Tax Audit', client_id: insertedClients[2].id, status: 'On Hold', deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() },
            { nature_of_work: 'TDS Filing Q3', client_id: insertedClients[0].id, status: 'Pending', deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() },
        ]
        await supabase.from('tasks').insert(tasks)

        // 4. Office Services Data
        // GST Registration
        await supabase.from('service_gst_registrations').insert([
            { client_id: insertedClients[0].id, trade_name: insertedClients[0].trade_name, status: 'In Progress', documents_status: 'Pending' },
            { client_id: insertedClients[1].id, trade_name: 'New Client Pending', status: 'Pending', documents_status: 'Received' }
        ])

        // Company Formation
        await supabase.from('service_company_formations').insert([
            { client_id: insertedClients[2].id, proposed_name_1: 'InnovateX Solutions', status: 'Name Approval', type: 'Private Limited' },
            { client_id: insertedClients[0].id, proposed_name_1: 'Tech Corp Subsidiary', status: 'Incorporation', type: 'LLP' }
        ])

        // Income Tax
        await supabase.from('service_income_tax_filings').insert([
            { client_id: insertedClients[0].id, assessment_year: '2024-25', status: 'Computation', type: 'Business' },
            { client_id: insertedClients[1].id, assessment_year: '2024-25', status: 'Filed', type: 'Individual' }
        ])
    }


    return NextResponse.json({ message: 'Demo data seeded successfully', clients: insertedClients?.length })
}
