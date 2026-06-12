import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// prefer ANON key env var, fall back to older name
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseKey) {
	console.warn('Supabase: missing VITE_SUPABASE_URL or ANON key. Check your .env')
}

// create client with the anon/public key only (do NOT expose service_role on client)
export const supabase = createClient(supabaseUrl, supabaseKey)