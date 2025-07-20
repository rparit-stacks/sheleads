"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Plus, Search, RefreshCw, Download, Eye } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { CrudModal } from "./crud-modal"

interface EnhancedDataTableProps {
  tableName: string
  title: string
}

export function EnhancedDataTable({ tableName, title }: EnhancedDataTableProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [columns, setColumns] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showCrudModal, setShowCrudModal] = useState(false)
  const [crudMode, setCrudMode] = useState<"add" | "edit">("add")

  useEffect(() => {
    fetchData()
  }, [tableName, sortColumn, sortDirection])

  const fetchData = async () => {
    setLoading(true)
    try {
      let query = supabase.from(tableName).select("*")

      if (sortColumn) {
        query = query.order(sortColumn, { ascending: sortDirection === "asc" })
      } else {
        query = query.order("id", { ascending: false })
      }

      const { data: tableData, error } = await query

      if (error) {
        console.error("Error fetching data:", error)
        return
      }

      setData(tableData || [])

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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleAdd = () => {
    setSelectedRecord(null)
    setCrudMode("add")
    setShowCrudModal(true)
  }

  const handleEdit = (record: any) => {
    setSelectedRecord(record)
    setCrudMode("edit")
    setShowCrudModal(true)
  }

  const handleCrudSuccess = () => {
    fetchData()
    setShowCrudModal(false)
  }

  const formatValue = (value: any, key: string) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "boolean") return value ? "✅" : "❌"
    if (Array.isArray(value)) return `[${value.length} items]`
    if (typeof value === "object") return "📄 JSON"
    if (key.includes("date") || key.includes("time")) {
      return new Date(value).toLocaleString("en-IN")
    }
    if (key.includes("price") || key.includes("amount")) {
      return `₹${Number(value).toLocaleString("en-IN")}`
    }
    if (key.includes("email")) return value
    if (typeof value === "string" && value.length > 50) {
      return value.substring(0, 50) + "..."
    }
    return String(value)
  }

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      ended: "bg-gray-100 text-gray-800",
      completed: "bg-blue-100 text-blue-800",
      pending: "bg-orange-100 text-orange-800",
      failed: "bg-red-100 text-red-800",
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      new: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    }
    return statusColors[status] || "bg-gray-100 text-gray-800"
  }

  const exportToCSV = () => {
    const csvContent = [
      columns.join(","),
      ...filteredData.map((row) =>
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
    a.download = `${tableName}_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-200 h-12 rounded-lg"></div>
          <div className="bg-gray-200 h-64 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">Manage {title.toLowerCase()} records</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleAdd} size="sm" className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={`${itemsPerPage}`} onValueChange={() => {}}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{data.length}</div>
            <p className="text-sm text-gray-600">Total Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{filteredData.length}</div>
            <p className="text-sm text-gray-600">Filtered Results</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{columns.length}</div>
            <p className="text-sm text-gray-600">Columns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{totalPages}</div>
            <p className="text-sm text-gray-600">Total Pages</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title} Data
            <Badge variant="outline">{filteredData.length} records</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paginatedData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No records found</p>
              <Button onClick={handleAdd} className="mt-4 bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Add First Record
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      {columns.slice(0, 6).map((column) => (
                        <th
                          key={column}
                          className="text-left p-3 font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort(column)}
                        >
                          <div className="flex items-center gap-1">
                            {column.replace(/_/g, " ").toUpperCase()}
                            {sortColumn === column && (
                              <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr key={row.id || index} className="border-b hover:bg-gray-50">
                        {columns.slice(0, 6).map((column) => (
                          <td key={column} className="p-3 text-sm">
                            <div className="max-w-xs">
                              {column.includes("status") ? (
                                <Badge className={getStatusBadge(row[column])}>{row[column]}</Badge>
                              ) : (
                                formatValue(row[column], column)
                              )}
                            </div>
                          </td>
                        ))}
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedRecord(row)
                                setShowViewModal(true)
                              }}
                              title="View Details"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(row)} title="Edit Record">
                              <Edit className="w-3 h-3 text-blue-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(row.id)}
                              title="Delete Record"
                            >
                              <Trash2 className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm bg-gray-100 rounded">
                    {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* View Record Modal */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Record Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowViewModal(false)}>
                ✕
              </Button>
            </div>
            <div className="space-y-3">
              {columns.map((column) => (
                <div key={column} className="grid grid-cols-3 gap-4">
                  <div className="font-medium text-gray-700 capitalize">{column.replace(/_/g, " ")}:</div>
                  <div className="col-span-2 text-gray-900">
                    {Array.isArray(selectedRecord[column]) ? (
                      <div className="space-y-1">
                        {selectedRecord[column].map((item: any, idx: number) => (
                          <div key={idx} className="bg-gray-100 p-2 rounded text-sm">
                            {item}
                          </div>
                        ))}
                      </div>
                    ) : typeof selectedRecord[column] === "object" && selectedRecord[column] !== null ? (
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(selectedRecord[column], null, 2)}
                      </pre>
                    ) : (
                      formatValue(selectedRecord[column], column)
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={() => handleEdit(selectedRecord)} className="bg-blue-600 hover:bg-blue-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Record
              </Button>
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CRUD Modal */}
      <CrudModal
        isOpen={showCrudModal}
        onClose={() => setShowCrudModal(false)}
        tableName={tableName}
        record={selectedRecord}
        mode={crudMode}
        onSuccess={handleCrudSuccess}
      />
    </div>
  )
}
