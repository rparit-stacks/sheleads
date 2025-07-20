"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, Plus, Search, RefreshCw, Download, Eye, SortAsc, SortDesc, Database, X } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase"
import { UniversalCrudModal } from "./universal-crud-modal"
import { PricingPlanModal } from "./pricing-plan-modal"
import { EventModal } from "./event-modal"

interface LiveDataTableProps {
  tableName: string
  title: string
}

export function LiveDataTable({ tableName, title }: LiveDataTableProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [columns, setColumns] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showCrudModal, setShowCrudModal] = useState(false)
  const [crudMode, setCrudMode] = useState<"add" | "edit">("add")
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [filterColumn, setFilterColumn] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)

  useEffect(() => {
    fetchData()
  }, [tableName, sortColumn, sortDirection])

  const fetchData = async () => {
    setLoading(true)
    try {
      let query = supabaseAdmin.from(tableName).select("*")

      // Apply sorting
      if (sortColumn) {
        query = query.order(sortColumn, { ascending: sortDirection === "asc" })
      } else {
        // Default sort by id if exists, otherwise by first column
        query = query.order("id", { ascending: false })
      }

      const { data: tableData, error } = await query

      if (error) {
        console.error("Error fetching data:", error)
        setData([])
        return
      }

      setData(tableData || [])

      // Get column names
      if (tableData && tableData.length > 0) {
        setColumns(Object.keys(tableData[0]))
      } else {
        // If no data, get columns from table schema
        const { data: schemaData } = await supabaseAdmin
          .from("information_schema.columns")
          .select("column_name")
          .eq("table_name", tableName)
          .eq("table_schema", "public")
          .order("ordinal_position")

        if (schemaData) {
          setColumns(schemaData.map((col) => col.column_name))
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return

    try {
      const { error } = await supabaseAdmin.from(tableName).delete().eq("id", id)

      if (error) {
        console.error("Error deleting record:", error)
        alert(`Failed to delete record: ${error.message}`)
        return
      }

      setData(data.filter((item) => item.id !== id))
      alert("Record deleted successfully!")
    } catch (error) {
      console.error("Error deleting record:", error)
      alert("Failed to delete record")
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} records?`)) return

    try {
      const { error } = await supabaseAdmin.from(tableName).delete().in("id", selectedIds)

      if (error) {
        console.error("Error bulk deleting:", error)
        alert(`Failed to delete records: ${error.message}`)
        return
      }

      setData(data.filter((item) => !selectedIds.includes(item.id)))
      setSelectedIds([])
      alert(`${selectedIds.length} records deleted successfully!`)
    } catch (error) {
      console.error("Error bulk deleting:", error)
      alert("Failed to delete records")
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

    if (tableName === "pricing_plans") {
      setShowPricingModal(true)
    } else if (tableName === "events") {
      setShowEventModal(true)
    } else {
      setShowCrudModal(true)
    }
  }

  const handleEdit = (record: any) => {
    setSelectedRecord(record)
    setCrudMode("edit")

    if (tableName === "pricing_plans") {
      setShowPricingModal(true)
    } else if (tableName === "events") {
      setShowEventModal(true)
    } else {
      setShowCrudModal(true)
    }
  }

  const handleCrudSuccess = () => {
    fetchData()
    setShowCrudModal(false)
  }

  const handlePricingSuccess = () => {
    fetchData()
    setShowPricingModal(false)
  }

  const handleEventSuccess = () => {
    fetchData()
    setShowEventModal(false)
  }

  const exportToCSV = () => {
    const csvContent = [
      columns.join(","),
      ...filteredData.map((row) =>
        columns
          .map((col) => {
            const value = row[col]
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
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

  const formatValue = (value: any, key: string) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "boolean") return value ? "✅" : "❌"
    if (Array.isArray(value)) return `[${value.length} items]`
    if (typeof value === "object") return "📄 JSON"
    if (key.includes("date") || key.includes("time") || key.includes("at")) {
      try {
        return new Date(value).toLocaleString("en-IN")
      } catch {
        return value
      }
    }
    if (key.includes("price") || key.includes("amount") || key.includes("paid")) {
      const num = Number(value)
      if (!isNaN(num)) {
        return `₹${num.toLocaleString("en-IN")}`
      }
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
      upcoming: "bg-purple-100 text-purple-800",
      ongoing: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      true: "bg-green-100 text-green-800",
      false: "bg-gray-100 text-gray-800",
    }
    return statusColors[status?.toLowerCase()] || "bg-gray-100 text-gray-800"
  }

  // Apply filters and search
  let filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Apply column filter
  if (filterColumn && filterValue) {
    filteredData = filteredData.filter((item) =>
      String(item[filterColumn]).toLowerCase().includes(filterValue.toLowerCase()),
    )
  }

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(paginatedData.map((item) => item.id).filter((id) => id))
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">Live data from {tableName} table</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search all columns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterColumn} onValueChange={setFilterColumn}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by column" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All columns</SelectItem>
            {columns.map((col) => (
              <SelectItem key={col} value={col}>
                {col.replace(/_/g, " ").toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Filter value..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          disabled={!filterColumn}
        />

        <Select value={`${itemsPerPage}`} onValueChange={(value) => setItemsPerPage(Number(value))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
            <SelectItem value="100">100 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Operations */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-blue-800 font-medium">{selectedIds.length} records selected</span>
          <Button
            onClick={handleBulkDelete}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </Button>
          <Button onClick={() => setSelectedIds([])} variant="outline" size="sm">
            Clear Selection
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <Database className="w-5 h-5" />
            {title} Data
            <Badge variant="outline">{filteredData.length} records</Badge>
            <Badge className="bg-green-100 text-green-800">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paginatedData.length === 0 ? (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-600 mb-4">
                {data.length === 0 ? "This table is empty" : "No records match your search criteria"}
              </p>
              <Button onClick={handleAdd} className="bg-red-600 hover:bg-red-700">
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
                      <th className="text-left p-3">
                        <Checkbox
                          checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      {columns.slice(0, 6).map((column) => (
                        <th
                          key={column}
                          className="text-left p-3 font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort(column)}
                        >
                          <div className="flex items-center gap-1">
                            {column.replace(/_/g, " ").toUpperCase()}
                            {sortColumn === column &&
                              (sortDirection === "asc" ? (
                                <SortAsc className="w-3 h-3" />
                              ) : (
                                <SortDesc className="w-3 h-3" />
                              ))}
                          </div>
                        </th>
                      ))}
                      <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr key={row.id || index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedIds.includes(row.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedIds([...selectedIds, row.id])
                              } else {
                                setSelectedIds(selectedIds.filter((id) => id !== row.id))
                              }
                            }}
                          />
                        </td>
                        {columns.slice(0, 6).map((column) => (
                          <td key={column} className="p-3 text-sm">
                            <div className="max-w-xs">
                              {column.includes("status") ||
                              column.includes("published") ||
                              column.includes("active") ? (
                                <Badge className={getStatusBadge(row[column])}>
                                  {typeof row[column] === "boolean" ? (row[column] ? "Yes" : "No") : row[column]}
                                </Badge>
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
              <div className="flex items-center justify-between mt-6">
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
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>
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
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Record Details - {title}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowViewModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {columns.map((column) => (
                <div key={column} className="border rounded-lg p-3">
                  <div className="font-medium text-gray-700 capitalize mb-1">{column.replace(/_/g, " ")}:</div>
                  <div className="text-gray-900">
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
                      <div className="bg-gray-50 p-2 rounded">{formatValue(selectedRecord[column], column)}</div>
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
      <UniversalCrudModal
        isOpen={showCrudModal}
        onClose={() => setShowCrudModal(false)}
        tableName={tableName}
        record={selectedRecord}
        mode={crudMode}
        onSuccess={handleCrudSuccess}
      />

      {/* Pricing Plan Modal */}
      <PricingPlanModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        record={selectedRecord}
        mode={crudMode}
        onSuccess={handlePricingSuccess}
      />

      {/* Event Modal */}
      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        record={selectedRecord}
        mode={crudMode}
        onSuccess={handleEventSuccess}
      />
    </div>
  )
}
