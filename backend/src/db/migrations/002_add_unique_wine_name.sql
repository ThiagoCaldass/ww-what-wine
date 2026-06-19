-- Add unique constraint to wine name to prevent duplicates
ALTER TABLE wines ADD CONSTRAINT unique_wine_name UNIQUE (name);
