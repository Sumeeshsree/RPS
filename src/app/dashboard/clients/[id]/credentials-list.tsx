'use client'

import { useState, useEffect } from 'react'
import { unlockCredential } from '../actions'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Lock, Unlock, Copy } from 'lucide-react'
import { toast } from "sonner"

interface Credential {
    id: string
    service_name: string
    encrypted_data: string
}

export function CredentialsList({ clientId }: { clientId: string }) {
    const [credentials, setCredentials] = useState<Credential[]>([])
    const [decryptedData, setDecryptedData] = useState<Record<string, any>>({})
    const supabase = createClient()

    useEffect(() => {
        const fetchCredentials = async () => {
            const { data } = await supabase
                .from('client_credentials')
                .select('id, service_name, encrypted_data')
                .eq('client_id', clientId)

            if (data) setCredentials(data)
        }
        fetchCredentials()

        // Subscribe to changes
        const channel = supabase
            .channel('credentials')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'client_credentials', filter: `client_id=eq.${clientId}` }, () => {
                fetchCredentials()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [clientId, supabase])

    async function handleUnlock(id: string) {
        // In a real app, prompt for TOTP here
        const totpCode = "123456"
        const res = await unlockCredential(id, totpCode)

        if (res?.error) {
            toast.error(res.error)
        } else if (res?.data) {
            setDecryptedData(prev => ({ ...prev, [id]: res.data }))
            toast.success("Decrypted successfully")
        }
    }

    return (
        <div className="space-y-4">
            {credentials.map((cred) => (
                <div key={cred.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                        {decryptedData[cred.id] ? <Unlock className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-amber-500" />}
                        <div>
                            <p className="font-medium">{cred.service_name}</p>
                            {decryptedData[cred.id] && (
                                <div className="text-sm text-muted-foreground">
                                    <p>User: {decryptedData[cred.id].username}</p>
                                    <p className="flex items-center gap-2">
                                        Pass: ••••••••
                                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => {
                                            navigator.clipboard.writeText(decryptedData[cred.id].password)
                                            toast.success("Password copied")
                                        }}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {!decryptedData[cred.id] && (
                        <Button size="sm" variant="secondary" onClick={() => handleUnlock(cred.id)}>
                            Unlock
                        </Button>
                    )}
                </div>
            ))}
            {credentials.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No credentials stored.</p>
            )}
        </div>
    )
}
