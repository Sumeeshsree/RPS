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
import { createIncomeTaxFiling, updateIncomeTaxFiling } from '../actions'
import { ServiceIncomeTaxFiling, Client } from '@/types'
import { Plus } from 'lucide-react'

const formSchema = z.object({
    client_id: z.string().min(1, "Client is required"),
    pan_number: z.string().min(10, "PAN is required"),
    assessment_year: z.string().min(1, "Assessment Year is required"),
    acknowledgement_no: z.string().optional(),
    status: z.enum(['Pending', 'In Progress', 'Completed', 'Rejected']),
    notes: z.string().optional(),
})

interface IncomeTaxFormProps {
    clients: Client[]
    service?: ServiceIncomeTaxFiling
}

export function IncomeTaxForm({ clients, service }: IncomeTaxFormProps) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client_id: service?.client_id || '',
            pan_number: service?.pan_number || '',
            assessment_year: service?.assessment_year || '',
            acknowledgement_no: service?.acknowledgement_no || '',
            status: (service?.status as any) || 'Pending',
            notes: service?.notes || '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (service) {
                const res = await updateIncomeTaxFiling(service.id, values)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Filing updated")
                    setOpen(false)
                }
            } else {
                const res = await createIncomeTaxFiling(values)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Filing created")
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
            form.setValue('pan_number', client.pan || '')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {service ? (
                    <Button variant="outline" size="sm">Edit</Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Filing
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{service ? 'Edit Income Tax Filing' : 'New Income Tax Filing'}</DialogTitle>
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
                            <FormField
                                control={form.control}
                                name="assessment_year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assessment Year</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="e.g. 2024-25" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="acknowledgement_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Acknowledgement No</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
