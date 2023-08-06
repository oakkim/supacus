import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './types/database.types'

const supabase: SupabaseClient = createClient<Database>("https://wjjghjzcucvxjwqquiwm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqamdoanpjdWN2eGp3cXF1aXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2MDk3NjQsImV4cCI6MjAwNDE4NTc2NH0.ldOqJW9IAI1WPPDDNv2IczaZNrBvlGZEqaT9n02w_V4")

export default supabase