'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { createGSTRegistration, updateGSTRegistration } from '../actions'
import { ServiceGSTRegistration, Client } from '@/types'
import { Plus } from 'lucide-react'

const formSchema = z.object({
    client_id: z.string().min(1, "Client is required"),
    trade_name: z.string().min(1, "Trade Name is required"),
    pan_number: z.string().min(10, "PAN is required"),
    mobile: z.string().min(10, "Mobile is required"),
    email: z.string().email("Invalid email"),
    business_address: z.string().optional(),
    status: z.enum(['Pending', 'In Progress', 'Completed', 'Rejected']),
    notes: z.string().optional(),
})

interface GSTRegFormProps {
    clients: Client[]
    service?: ServiceGSTRegistration
}

export function GSTRegForm({ clients, service }: GSTRegFormProps) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client_id: service?.client_id || '',
            trade_name: service?.trade_name || '',
            pan_number: service?.pan_number || '',
            mobile: service?.mobile || '',
            email: service?.email || '',
            business_address: service?.business_address || '',
            status: (service?.status as any) || 'Pending',
            notes: service?.notes || '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (service) {
                const res = await updateGSTRegistration(service.id, values)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("GST Registration updated")
                    setOpen(false)
                }
            } else {
                const res = await createGSTRegistration(values)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("GST Registration created")
                    setOpen(false)
                    form.reset()
                }
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    // Auto-fill client details when client is selected
    const handleClientChange = (clientId: string) => {
        const client = clients.find(c => c.id === clientId)
        if (client) {
            form.setValue('client_id', clientId)
            form.setValue('trade_name', client.trade_name)
            form.setValue('pan_number', client.pan || '')
            form.setValue('mobile', client.mobile || '')
            form.setValue('email', client.email || '')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {service ? (
                    <Button variant="outline" size="sm">Edit</Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Registration
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{service ? 'Edit Registration' : 'New GST Registration'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="client_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <Select onValueChange={handleClientChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a client" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {clients.map((client) => (
                                                <SelectItem key={client.id} value={client.id}>
                                                    {client.trade_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="trade_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trade Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pan_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PAN Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mobile</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="business_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Address</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="In Progress">In Progress</SelectItem>
                                                <SelectItem value="Completed">Completed</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            {service ? 'Update' : 'Create'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
