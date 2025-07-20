"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Download } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface BulkOperationsProps {
  selectedIds: number[]
  onSelectionChange: (ids: number[]) => void
  tableName: string
  data: any[]
  onBulkAction: () => void
}

export function BulkOperations({ selectedIds, onSelectionChange, tableName, data, onBulkAction }: BulkOperationsProps) {
  const [bulkAction, setBulkAction] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSelectAll = () => {
    if (selectedIds.length === data.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(data.map((item) => item.id))
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} records?`)) return

    setLoading(true)
    try {
      const { error } = await supabase.from(tableName).delete().in("id", selectedIds)

      if (error) {
        alert("Failed to delete records")
        return
      }

      alert(`${selectedIds.length} records deleted successfully`)
      onBulkAction()
      onSelectionChange([])
    } catch (error) {
      alert("Failed to delete records")
    } finally {
      setLoading(false)
    }
  }

  const handleBulkExport = () => {
    const selectedData = data.filter((item) => selectedIds.includes(item.id))
    const columns = Object.keys(selectedData[0] || {})

    const csvContent = [
      columns.join(","),
      ...selectedData.map((row) =>
        columns
          .map((col) => {
            const value = row[col]
            if (typeof value === "string" && value.includes(",")) {
              return `"${value}"`
            }
            return value || ""
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${tableName}_selected_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (data.length === 0) return null

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Checkbox checked={selectedIds.length === data.length} onCheckedChange={handleSelectAll} />
        <span className="text-sm text-gray-600">
          {selectedIds.length > 0 ? `${selectedIds.length} selected` : "Select all"}
        </span>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2">
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Bulk actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delete">Delete Selected</SelectItem>
              <SelectItem value="export">Export Selected</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={bulkAction === "delete" ? handleBulkDelete : handleBulkExport}
            disabled={!bulkAction || loading}
          >
            {loading ? (
              "Processing..."
            ) : bulkAction === "delete" ? (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={() => onSelectionChange([])}>
            Clear Selection
          </Button>
        </div>
      )}
    </div>
  )
}
