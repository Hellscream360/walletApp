-- Create custom types for our JSON validation
CREATE TYPE wallet_subcategory AS (
    name TEXT,
    percentage NUMERIC,
    color TEXT
);

CREATE TYPE wallet_category AS (
    name TEXT,
    percentage NUMERIC,
    color TEXT,
    sub_categories wallet_subcategory[]
);

-- Create a function to validate categories structure
CREATE OR REPLACE FUNCTION validate_categories()
RETURNS TRIGGER AS $$
BEGIN
    -- Verify that categories is an array
    IF jsonb_typeof(NEW.categories) != 'array' THEN
        RAISE EXCEPTION 'Categories must be an array';
    END IF;

    -- Verify that each category has the required fields
    IF NOT (
        SELECT bool_and(
            category ? 'name'
            AND category ? 'percentage'
            AND category ? 'color'
        )
        FROM jsonb_array_elements(NEW.categories) AS category
    ) THEN
        RAISE EXCEPTION 'Each category must have name, percentage, and color fields';
    END IF;

    -- Verify that the total percentage of main categories equals 100
    IF (
        SELECT SUM(CAST(category->>'percentage' AS NUMERIC))
        FROM jsonb_array_elements(NEW.categories) AS category
    ) != 100 THEN
        RAISE EXCEPTION 'Main categories percentages must sum to 100';
    END IF;

    -- Check if any category has subcategories
    IF EXISTS (
        SELECT 1
        FROM jsonb_array_elements(NEW.categories) AS category
        WHERE category ? 'subCategories'
    ) THEN
        -- Verify that for each category with subcategories, their percentages sum to 100
        IF NOT (
            SELECT bool_and(
                (
                    SELECT COALESCE(SUM(CAST(sub->>'percentage' AS NUMERIC)), 0)
                    FROM jsonb_array_elements(category->'subCategories') AS sub
                ) = 100
            )
            FROM jsonb_array_elements(NEW.categories) AS category
            WHERE category ? 'subCategories'
            AND jsonb_array_length(category->'subCategories') > 0
        ) THEN
            RAISE EXCEPTION 'Subcategories percentages must sum to 100 within each category';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for category validation
CREATE TRIGGER validate_wallet_categories
    BEFORE INSERT OR UPDATE ON wallets
    FOR EACH ROW
    EXECUTE FUNCTION validate_categories();

-- Add an index to improve query performance on the categories column
CREATE INDEX idx_wallet_categories ON wallets USING gin (categories);

-- Add a policy to ensure users can only access their own wallets
CREATE POLICY "Users can only access their own wallets"
    ON wallets
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
