'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Enquiry } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateEnquiryStatus } from "./actions"
import { toast } from "sonner"

export const columns: ColumnDef<Enquiry>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
    },
    {
        accessorKey: "nature_of_enquiry",
        header: "Nature",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant={status === 'Open' ? 'default' : status === 'Converted' ? 'secondary' : 'outline'}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return new Date(row.getValue("created_at")).toLocaleDateString()
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const enquiry = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(enquiry.mobile || '')}>
                            Copy Mobile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => {
                            await updateEnquiryStatus(enquiry.id, 'Converted')
                            toast.success("Marked as Converted")
                        }}>
                            Mark Converted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            await updateEnquiryStatus(enquiry.id, 'Closed')
                            toast.success("Marked as Closed")
                        }}>
                            Mark Closed
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
