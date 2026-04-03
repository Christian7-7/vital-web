/*
  # Add Product Image Gallery Support

  1. Changes
    - Add `image_gallery` column to products table
      - Type: text array (text[])
      - Nullable: true
      - Stores additional product images for carousel display
    
  2. Purpose
    - Enable multiple product images for detailed product views
    - Support image carousels in product detail pages
    - Maintain backward compatibility with existing single image_url field
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'image_gallery'
  ) THEN
    ALTER TABLE products ADD COLUMN image_gallery text[];
  END IF;
END $$;