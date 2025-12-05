'use client'

import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { importClients } from "./actions"

export function CsvActions({ data }: { data: any[] }) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isImporting, setIsImporting] = useState(false)

    const handleExport = () => {
        if (!data || data.length === 0) {
            toast.error("No data to export")
            return
        }

        const headers = ["trade_name", "legal_name", "mobile", "email", "gstin", "pan"]
        const csvContent = [
            headers.join(","),
            ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(","))
        ].join("\n")

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `clients_export_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleImportClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsImporting(true)
        const reader = new FileReader()
        reader.onload = async (event) => {
            const text = event.target?.result as string
            const lines = text.split('\n')
            const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))

            const clients = []
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue
                const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''))
                const client: any = {}
                headers.forEach((header, index) => {
                    // Map common CSV headers to DB fields if needed, simplified here
                    if (['trade_name', 'legal_name', 'mobile', 'email', 'gstin', 'pan'].includes(header)) {
                        client[header] = values[index]
                    }
                })
                if (client.trade_name) { // Basic validation
                    clients.push(client)
                }
            }

            if (clients.length === 0) {
                toast.error("No valid clients found in CSV")
                setIsImporting(false)
                return
            }

            const result = await importClients(clients)
            if (result.success) {
                toast.success(`Successfully imported ${clients.length} clients`)
            } else {
                toast.error("Failed to import clients")
            }
            setIsImporting(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
        reader.readAsText(file)
    }

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleImportClick} disabled={isImporting}>
                <Upload className="mr-2 h-4 w-4" />
                {isImporting ? 'Importing...' : 'Import CSV'}
            </Button>
            <input
                type="file"
                accept=".csv"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </div>
    )
}
