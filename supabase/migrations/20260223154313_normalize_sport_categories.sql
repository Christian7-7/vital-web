/*
  # Normalize Sport Categories

  This migration standardizes all sport_category values to use consistent lowercase formatting with hyphens.

  1. Changes Made
    - Normalize 'GYM' → 'gym' (uppercase to lowercase)
    - Normalize 'recuperacion' → 'recovery' (Spanish to English for consistency)
    - Keep existing: 'gym', 'bienestar', 'control-peso', 'recovery'
    
  2. Future Categories (for reference)
    - Sports: atletismo, calistenia, ciclismo, crossfit, futbol, gym, volleyball, yoga
    - General: recovery, control-peso, bienestar
    
  3. Notes
    - All category names will now be lowercase
    - Multi-word categories use hyphens (control-peso)
    - This ensures consistency across all queries
*/

-- Normalize GYM to gym (uppercase to lowercase)
UPDATE products 
SET sport_category = 'gym' 
WHERE sport_category = 'GYM';

-- Normalize recuperacion to recovery (Spanish to English)
UPDATE products 
SET sport_category = 'recovery' 
WHERE sport_category = 'recuperacion';

-- Verify the changes
DO $$
BEGIN
  RAISE NOTICE 'Migration completed. Current categories:';
END $$;
