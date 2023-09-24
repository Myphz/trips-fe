import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "../../../constants";
import type { Database } from "$lib/types/supabase";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
