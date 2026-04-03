/*
  # Add sport category and atletismo products
  
  1. Changes
    - Add `sport_category` column to products table
    - Insert atletismo-specific products with sample data
  
  2. New Products
    - Sprint Energy Pro - Pre-workout for explosive energy
    - Endurance Max - For long-distance endurance
    - Recovery Sprint - Post-workout recovery
    - Oxygen Boost - Improve aerobic capacity
    - Speed Fuel - Intra-workout energy
    - Marathon Support - For marathon runners
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'sport_category'
  ) THEN
    ALTER TABLE products ADD COLUMN sport_category text;
  END IF;
END $$;

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Sprint Energy Pro',
    'Pre-entrenamiento diseñado específicamente para atletas de velocidad. Aumenta tu explosividad y potencia en carreras cortas con una mezcla de cafeína, beta-alanina y creatina.',
    45.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Atletismo'
  ),
  (
    'Endurance Max',
    'Fórmula avanzada para corredores de distancia. Mejora tu resistencia aeróbica y mantén tu energía durante carreras largas. Contiene carbohidratos complejos y electrolitos.',
    52.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Atletismo'
  ),
  (
    'Recovery Sprint',
    'Recuperación post-entrenamiento para atletas. Acelera la reparación muscular y reduce el dolor después de entrenamientos intensos. Rico en BCAAs y glutamina.',
    38.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    'Atletismo'
  ),
  (
    'Oxygen Boost',
    'Optimiza tu capacidad aeróbica y oxigenación muscular. Ideal para mejorar tu VO2 max y resistencia cardiovascular en competencias.',
    49.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Atletismo'
  ),
  (
    'Speed Fuel',
    'Energía sostenida durante el entrenamiento. Mantén tu intensidad sin caídas de energía. Perfecto para intervalos y entrenamientos de velocidad.',
    42.99,
    'https://images.pexels.com/photos/6551094/pexels-photo-6551094.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Atletismo'
  ),
  (
    'Marathon Support',
    'Soporte completo para maratonistas. Fórmula integral con carbohidratos, proteínas y electrolitos para mantener tu rendimiento en distancias extremas.',
    55.99,
    'https://images.pexels.com/photos/4498154/pexels-photo-4498154.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Atletismo'
  )
ON CONFLICT DO NOTHING;
