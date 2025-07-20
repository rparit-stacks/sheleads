import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://qzipathljbmpwcimvzxp.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6aXBhdGhsamJtcHdjaW12enhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc3NTEsImV4cCI6MjA2ODUxMzc1MX0.hcrKUsyWX6a69POHMS5GGrtlCV1D6QLS7M_aNpLCAdY"
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6aXBhdGhsamJtcHdjaW12enhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjkzNzc1MSwiZXhwIjoyMDY4NTEzNzUxfQ.s6aB33N_EYqqKmCZZuquk1kEr_LAeXu2AXZ9parvq4o"

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role for full access
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
