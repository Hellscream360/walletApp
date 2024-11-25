import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gffhvbnruwojwwvmdhee.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmh2Ym5ydXdvand3dm1kaGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MzY4NzIsImV4cCI6MjA0ODExMjg3Mn0.gLMj_QR3WzMxv9fMOr-wo8Ztf2BWfNyUsqJrfxDSkcg';

export const supabase = createClient(supabaseUrl, supabaseKey);