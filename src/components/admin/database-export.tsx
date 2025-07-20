"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Database, FileText, Code, Loader2 } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase"

export function DatabaseExport() {
  const [loading, setLoading] = useState(false)
  const [exportType, setExportType] = useState<string>("")

  const tables = [
    "users",
    "admin_users",
    "admin_sessions",
    "admin_activity_logs",
    "pricing_plans",
    "pricing_purchases",
    "events",
    "event_registrations",
    "training_sessions",
    "training_enrollments",
    "blog_posts",
    "contact_inquiries",
    "newsletter_subscriptions",
  ]

  const exportAllTables = async () => {
    setLoading(true)
    setExportType("complete")

    try {
      const allData: { [key: string]: any[] } = {}
      let totalRecords = 0

      // Fetch all table data
      for (const table of tables) {
        try {
          const { data, error } = await supabaseAdmin.from(table).select("*")
          if (!error && data) {
            allData[table] = data
            totalRecords += data.length
          } else {
            console.warn(`Could not fetch ${table}:`, error)
            allData[table] = []
          }
        } catch (err) {
          console.warn(`Error fetching ${table}:`, err)
          allData[table] = []
        }
      }

      // Create comprehensive export
      const exportData = {
        export_info: {
          export_date: new Date().toISOString(),
          database_name: "business_website",
          total_tables: tables.length,
          total_records: totalRecords,
          supabase_url: "https://qzipathljbmpwcimvzxp.supabase.co",
        },
        tables: allData,
        table_stats: Object.entries(allData).map(([table, data]) => ({
          table_name: table,
          record_count: data.length,
          columns: data.length > 0 ? Object.keys(data[0]).length : 0,
        })),
      }

      // Download as JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `complete_database_${new Date().toISOString().split("T")[0]}.json`
      a.click()
      window.URL.revokeObjectURL(url)

      alert(`✅ Database exported successfully!\n📊 ${totalRecords} records from ${tables.length} tables`)
    } catch (error) {
      console.error("Export failed:", error)
      alert("❌ Export failed! Check console for details.")
    } finally {
      setLoading(false)
      setExportType("")
    }
  }

  const exportSchema = async () => {
    setLoading(true)
    setExportType("schema")

    try {
      // Get table structures
      const { data: columns } = await supabaseAdmin
        .from("information_schema.columns")
        .select("table_name, column_name, data_type, is_nullable, column_default, ordinal_position")
        .eq("table_schema", "public")
        .in("table_name", tables)
        .order("table_name")
        .order("ordinal_position")

      // Get table constraints
      const { data: constraints } = await supabaseAdmin
        .from("information_schema.table_constraints")
        .select("table_name, constraint_name, constraint_type")
        .eq("table_schema", "public")
        .in("table_name", tables)

      const schema = {
        export_info: {
          export_date: new Date().toISOString(),
          export_type: "schema_only",
          database_name: "business_website",
        },
        table_columns: columns,
        table_constraints: constraints,
        sql_commands: {
          note: "Use pg_dump for complete SQL export",
          command: "pg_dump -h db.qzipathljbmpwcimvzxp.supabase.co -U postgres -d postgres -p 5432 > backup.sql",
        },
      }

      const blob = new Blob([JSON.stringify(schema, null, 2)], { type: "application/json" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `database_schema_${new Date().toISOString().split("T")[0]}.json`
      a.click()
      window.URL.revokeObjectURL(url)

      alert("✅ Schema exported successfully!")
    } catch (error) {
      console.error("Schema export failed:", error)
      alert("❌ Schema export failed!")
    } finally {
      setLoading(false)
      setExportType("")
    }
  }

  const exportTableList = async () => {
    setLoading(true)
    setExportType("tables")

    try {
      const tableStats = []

      for (const table of tables) {
        try {
          const { count } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true })

          tableStats.push({
            table_name: table,
            record_count: count || 0,
            status: "accessible",
          })
        } catch (err) {
          tableStats.push({
            table_name: table,
            record_count: 0,
            status: "error",
            error: err,
          })
        }
      }

      const exportData = {
        export_info: {
          export_date: new Date().toISOString(),
          export_type: "table_statistics",
          database_name: "business_website",
        },
        table_statistics: tableStats,
        total_tables: tables.length,
        total_records: tableStats.reduce((sum, table) => sum + table.record_count, 0),
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `table_statistics_${new Date().toISOString().split("T")[0]}.json`
      a.click()
      window.URL.revokeObjectURL(url)

      alert("✅ Table statistics exported successfully!")
    } catch (error) {
      console.error("Table export failed:", error)
      alert("❌ Table export failed!")
    } finally {
      setLoading(false)
      setExportType("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Database className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Database Export</h2>
          <p className="text-gray-600">Export your complete database or specific components</p>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              Complete Database Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Export all tables with data in JSON format. Includes all records from all {tables.length} tables.
            </p>
            <div className="flex flex-wrap gap-1">
              {tables.slice(0, 6).map((table) => (
                <Badge key={table} variant="outline" className="text-xs">
                  {table}
                </Badge>
              ))}
              {tables.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{tables.length - 6} more
                </Badge>
              )}
            </div>
            <Button onClick={exportAllTables} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              {loading && exportType === "complete" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Complete Database
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Schema Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Export database structure only. Includes table definitions, columns, and constraints.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-800 text-sm font-medium">Includes:</p>
              <ul className="text-green-700 text-xs mt-1 space-y-1">
                <li>• Table structures</li>
                <li>• Column definitions</li>
                <li>• Data types</li>
                <li>• Constraints</li>
              </ul>
            </div>
            <Button onClick={exportSchema} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
              {loading && exportType === "schema" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Export Schema Only
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              Table Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Export table statistics and record counts. Useful for database analysis.</p>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-purple-800 text-sm font-medium">Includes:</p>
              <ul className="text-purple-700 text-xs mt-1 space-y-1">
                <li>• Record counts</li>
                <li>• Table accessibility</li>
                <li>• Database overview</li>
                <li>• Export metadata</li>
              </ul>
            </div>
            <Button onClick={exportTableList} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
              {loading && exportType === "tables" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Code className="w-4 h-4 mr-2" />
                  Export Statistics
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Instructions & Connection Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">🔥 For Complete SQL Backup (Recommended):</h4>
            <p className="text-yellow-700 text-sm mb-3">
              Use pg_dump command with your Supabase connection details for a complete SQL backup file.
            </p>
            <div className="bg-yellow-100 p-3 rounded font-mono text-sm overflow-x-auto">
              <code>
                pg_dump -h db.qzipathljbmpwcimvzxp.supabase.co -U postgres -d postgres -p 5432 {">"} complete_backup.sql
              </code>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">📋 Connection Details:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-700 text-sm">
              <div>
                <strong>Host:</strong> db.qzipathljbmpwcimvzxp.supabase.co
              </div>
              <div>
                <strong>Database:</strong> postgres
              </div>
              <div>
                <strong>Username:</strong> postgres
              </div>
              <div>
                <strong>Port:</strong> 5432
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">💡 Export Options:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-blue-600">JSON Export:</strong>
                <p className="text-gray-600">Easy to read, good for data analysis</p>
              </div>
              <div>
                <strong className="text-green-600">SQL Export:</strong>
                <p className="text-gray-600">Complete backup, can restore anywhere</p>
              </div>
              <div>
                <strong className="text-purple-600">CSV Export:</strong>
                <p className="text-gray-600">Available per table in data tables</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Database Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-600" />
            Live Database Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{tables.length}</div>
              <p className="text-sm text-gray-600">Total Tables</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Live</div>
              <p className="text-sm text-gray-600">Connection Status</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Admin</div>
              <p className="text-sm text-gray-600">Access Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Ready</div>
              <p className="text-sm text-gray-600">Export Status</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
