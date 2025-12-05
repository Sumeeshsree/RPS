'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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
import { createCompanyFormation, updateCompanyFormation } from '../actions'
import { ServiceCompanyFormation, Client } from '@/types'
import { Plus, Trash2 } from 'lucide-react'

const directorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    pan: z.string().min(10, "PAN is required"),
})

const formSchema = z.object({
    client_id: z.string().min(1, "Client is required"),
    proposed_name_1: z.string().min(1, "Proposed Name 1 is required"),
    proposed_name_2: z.string().optional(),
    capital_amount: z.coerce.number().min(0, "Capital amount must be positive"), // Ensure it's treated as number
    directors: z.array(directorSchema).min(1, "At least one director is required"),
    status: z.enum(['Pending', 'In Progress', 'Completed', 'Rejected']),
    notes: z.string().optional(),
})

// Extract the type explicitly to ensure TypeScript understands it's a number
type FormValues = z.infer<typeof formSchema>

interface CompanyFormationFormProps {
    clients: Client[]
    service?: ServiceCompanyFormation
}

export function CompanyFormationForm({ clients, service }: CompanyFormationFormProps) {
    const [open, setOpen] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client_id: service?.client_id || '',
            proposed_name_1: service?.proposed_name_1 || '',
            proposed_name_2: service?.proposed_name_2 || '',
            capital_amount: service?.capital_amount || 0,
            directors: (service?.director_details as any[]) || [{ name: '', pan: '' }],
            status: (service?.status as any) || 'Pending',
            notes: service?.notes || '',
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "directors",
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload = {
                ...values,
                director_details: values.directors, // Map to JSONB column
            }
            // Remove directors from payload as it's not a column, but director_details is
            // Actually, I need to pass director_details explicitly and remove directors from the object passed to server action if types mismatch
            // But my server action takes Partial<ServiceCompanyFormation>, which has director_details: any[]

            const { directors, ...rest } = values
            const finalPayload = { ...rest, director_details: directors }

            if (service) {
                const res = await updateCompanyFormation(service.id, finalPayload)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Company Formation updated")
                    setOpen(false)
                }
            } else {
                const res = await createCompanyFormation(finalPayload)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Company Formation created")
                    setOpen(false)
                    form.reset()
                }
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {service ? (
                    <Button variant="outline" size="sm">Edit</Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Company
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{service ? 'Edit Company Formation' : 'New Company Formation'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="client_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                name="proposed_name_1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Proposed Name 1</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="proposed_name_2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Proposed Name 2</FormLabel>
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
                            name="capital_amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Authorized Capital</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <FormLabel>Directors</FormLabel>
                                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', pan: '' })}>
                                    Add Director
                                </Button>
                            </div>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-end">
                                    <FormField
                                        control={form.control}
                                        name={`directors.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input {...field} placeholder="Name" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`directors.${index}.pan`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input {...field} placeholder="PAN" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

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
