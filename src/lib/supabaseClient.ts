import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase usado no frontend (App Router).
 * Vamos usar apenas a ANON KEY aqui.
 *
 * As variáveis de ambiente serão:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Depois vamos criar o projeto no Supabase e preencher o .env.local
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[LottoGenius Pro] Supabase ainda não configurado (.env.local ausente)."
    );
  }
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
