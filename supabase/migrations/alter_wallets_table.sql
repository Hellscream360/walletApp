-- Alter wallets table to add categories column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'wallets' 
                  AND column_name = 'categories') THEN
        ALTER TABLE public.wallets ADD COLUMN categories jsonb DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- Update existing rows to have empty categories array if null
UPDATE public.wallets SET categories = '[]'::jsonb WHERE categories IS NULL;

-- Make categories column NOT NULL
ALTER TABLE public.wallets ALTER COLUMN categories SET NOT NULL;

-- Recreate or update policies
DROP POLICY IF EXISTS "Users can view own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can create wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can update own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can delete own wallets" ON public.wallets;

CREATE POLICY "Users can view own wallets" ON public.wallets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create wallets" ON public.wallets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wallets" ON public.wallets
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wallets" ON public.wallets
    FOR DELETE USING (auth.uid() = user_id);
