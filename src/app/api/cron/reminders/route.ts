import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // Verify secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const supabase = await createClient()

    // Example logic: Create monthly GST tasks for all clients
    const { data: clients } = await supabase.from('clients').select('id')

    if (!clients) return NextResponse.json({ success: true, count: 0 })

    const tasks = clients.map(client => ({
        client_id: client.id,
        nature_of_work: 'Monthly GST Return',
        status: 'Pending',
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString() // Due in 7 days
    }))

    const { error } = await supabase.from('tasks').insert(tasks)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true, count: tasks.length })
}
