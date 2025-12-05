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
import { createGSTAmendment, updateGSTAmendment } from '../actions'
import { ServiceGSTAmendment, Client } from '@/types'
import { Plus } from 'lucide-react'

const formSchema = z.object({
    client_id: z.string().min(1, "Client is required"),
    gstin: z.string().min(15, "GSTIN is required"),
    amendment_type: z.string().min(1, "Type is required"),
    details: z.string().optional(),
    status: z.enum(['Pending', 'In Progress', 'Completed', 'Rejected']),
    notes: z.string().optional(),
})

interface GSTAmendmentFormProps {
    clients: Client[]
    service?: ServiceGSTAmendment
}

export function GSTAmendmentForm({ clients, service }: GSTAmendmentFormProps) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client_id: service?.client_id || '',
            gstin: service?.gstin || '',
            amendment_type: service?.amendment_type || '',
            details: service?.details || '',
            status: (service?.status as any) || 'Pending',
            notes: service?.notes || '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (service) {
                const res = await updateGSTAmendment(service.id, values)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Amendment updated")
                    setOpen(false)
                }
            } else {
                const res = await createGSTAmendment(values)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Amendment created")
                    setOpen(false)
                    form.reset()
                }
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const handleClientChange = (clientId: string) => {
        const client = clients.find(c => c.id === clientId)
        if (client) {
            form.setValue('client_id', clientId)
            form.setValue('gstin', client.gstin || '')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {service ? (
                    <Button variant="outline" size="sm">Edit</Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Amendment
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{service ? 'Edit Amendment' : 'New GST Amendment'}</DialogTitle>
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

                        <FormField
                            control={form.control}
                            name="gstin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GSTIN</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amendment_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amendment Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Address Change">Address Change</SelectItem>
                                            <SelectItem value="Director Change">Director Change</SelectItem>
                                            <SelectItem value="Business Name Change">Business Name Change</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Details</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Describe the changes..." />
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
