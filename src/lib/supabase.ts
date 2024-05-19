import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// since we have set up our middleware with auth helpers, we can use the createClientComponentClient to create a client that will be used in the client components.

// create client component client automatically take supabase env variables from the .env file if it is written correctly.
export const supabase = createClientComponentClient()




// import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
// );



