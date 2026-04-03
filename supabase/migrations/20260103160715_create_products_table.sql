/*
  # Create Products Table for VitalPro

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `category` (text) - Category: 'performance', 'recovery', 'weight-control'
      - `description` (text) - Product description
      - `benefits` (text[]) - Array of product benefits
      - `image_url` (text) - Product image URL
      - `price` (numeric) - Product price
      - `featured` (boolean) - Whether product is featured
      - `created_at` (timestamptz) - Timestamp of creation

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (catalog is public)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  benefits text[] DEFAULT '{}',
  image_url text NOT NULL,
  price numeric(10,2) NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);