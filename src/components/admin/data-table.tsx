"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus, Search, RefreshCw } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface DataTableProps {
  tableName: string
  title: string
}

export function DataTable({ tableName, title }: DataTableProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [columns, setColumns] = useState<string[]>([])

  useEffect(() => {
    fetchData()
  }, [tableName])

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data: tableData, error } = await supabase.from(tableName).select("*").order("id", { ascending: false })

      if (error) {
        console.error("Error fetching data:", error)
        return
      }

      setData(tableData || [])

      // Get column names from first row
      if (tableData && tableData.length > 0) {
        setColumns(Object.keys(tableData[0]))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return

    try {
      const { error } = await supabase.from(tableName).delete().eq("id", id)

      if (error) {
        console.error("Error deleting record:", error)
        alert("Failed to delete record")
        return
      }

      setData(data.filter((item) => item.id !== id))
      alert("Record deleted successfully")
    } catch (error) {
      console.error("Error deleting record:", error)
      alert("Failed to delete record")
    }
  }

  const formatValue = (value: any, key: string) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "boolean") return value ? "Yes" : "No"
    if (Array.isArray(value)) return value.join(", ")
    if (typeof value === "object") return JSON.stringify(value)
    if (key.includes("date") || key.includes("time")) {
      return new Date(value).toLocaleString()
    }
    if (key.includes("price") || key.includes("amount")) {
      return `₹${value}`
    }
    return String(value)
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-sm text-gray-600">Total Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredData.length}</div>
            <p className="text-sm text-gray-600">Filtered Results</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{columns.length}</div>
            <p className="text-sm text-gray-600">Columns</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title} Data
            <Badge variant="outline">{filteredData.length} records</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    {columns.map((column) => (
                      <th key={column} className="text-left p-3 font-medium text-gray-900 capitalize">
                        {column.replace(/_/g, " ")}
                      </th>
                    ))}
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={row.id || index} className="border-b hover:bg-gray-50">
                      {columns.map((column) => (
                        <td key={column} className="p-3 text-sm">
                          <div className="max-w-xs truncate">{formatValue(row[column], column)}</div>
                        </td>
                      ))}
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(row.id)}>
                            <Trash2 className="w-3 h-3 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
