import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CredentialsList } from './credentials-list'
import { AddCredentialForm } from './add-credential-form'

export default async function ClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: client } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()

    if (!client) notFound()

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight">{client.trade_name}</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Client Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div><span className="font-semibold">Legal Name:</span> {client.legal_name}</div>
                        <div><span className="font-semibold">Mobile:</span> {client.mobile}</div>
                        <div><span className="font-semibold">Email:</span> {client.email}</div>
                        <div><span className="font-semibold">PAN:</span> {client.pan}</div>
                        <div><span className="font-semibold">GSTIN:</span> {client.gstin}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Credentials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <AddCredentialForm clientId={client.id} />
                        <CredentialsList clientId={client.id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
