import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Advertencia: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están definidas en el entorno. El cliente de Supabase operará con placeholders vacíos y fallará si se intenta usar para llamadas de red.');
}

// Fallback dummy client values prevent Vite build crashes when deploying to environments without these vars
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder_key'
);
