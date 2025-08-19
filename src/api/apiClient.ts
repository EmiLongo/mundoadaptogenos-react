import { createClient } from "@supabase/supabase-js";
import { backendUrl, backendUrlKey } from "./utils";

// export const supabase = createClient(backendUrl, backendUrlKey);
export const supabase = createClient(
  backendUrl, 
  backendUrlKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'supabase.auth.token',
      storage: window.localStorage,
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web',
      },
    },
  }
);