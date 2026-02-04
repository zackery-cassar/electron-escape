import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

let supabaseClient: SupabaseClient<Database> | null = null

/**
 * Initialize the Supabase client
 * Call this once when the app starts
 */
export function initSupabase(): SupabaseClient<Database> {
  const supabaseUrl = 'https://csdimbgygebenosflait.supabase.co'
  const supabaseAnonKey = 'sb_publishable_IleSt_YaTfILSg4ApaoLRA_vuggtukm'

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY'
    )
  }

  if (supabaseClient) {
    return supabaseClient
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false // No auth persistence needed in main process
    }
  })

  console.log('Supabase client initialized')
  return supabaseClient
}

/**
 * Get the Supabase client instance
 * Must call initSupabase() first
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Call initSupabase() first.')
  }
  return supabaseClient
}
