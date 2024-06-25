import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


/**
 * This supabase client is used to interact with the Supabase API in client components
 * Whichever component has 'use client' will have access to this client
 */
export const supabaseClientComponent = createClientComponentClient()




