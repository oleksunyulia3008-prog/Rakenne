import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://nfwoaefeeottfjhuonko.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5md29hZWZlZW90dGZqaHVvbmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTg5MTYsImV4cCI6MjA5NDE3NDkxNn0.KyCZTOWFj296_huPR5Pgp1_T-bJuWswp1DBadiopUwk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

window.supabase = supabase;
window.supabaseAuth = {
  signUp: async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  },
  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  }
};
