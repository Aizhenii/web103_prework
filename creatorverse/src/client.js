import { createClient } from "@supabase/supabase-js";

const URL = 'https://ugakoffktievzictcmfz.supabase.co';
const API_KEY = "sb_publishable_Z4BrlRKPzskzDLabbETbrQ_rKpPjKH_";

export const supabase = createClient(URL, API_KEY);
