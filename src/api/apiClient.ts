import { createClient } from "@supabase/supabase-js";
import { backendUrl, backendUrlKey } from "./utils";

export const supabase = createClient(backendUrl, backendUrlKey);
