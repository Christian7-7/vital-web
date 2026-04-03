/*
  # Add weight control supplements
  
  1. New Products
    - Thermo Burn - Advanced thermogenic fat burner
    - Appetite Control - Natural hunger suppressor
    - Carb Blocker Plus - Carbohydrate metabolism optimizer
    - Lean Metabolizer - Metabolism booster
    - Fat Loss Matrix - Complete fat loss formula
    - CLA Max - Conjugated linoleic acid for body composition
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Thermo Burn',
    'Termogénico avanzado con cafeína, extracto de té verde y L-carnitina. Aumenta tu metabolismo hasta 15% y acelera la quema de grasa durante el ejercicio y el reposo.',
    47.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'weight_control',
    true,
    NULL
  ),
  (
    'Appetite Control',
    'Supresor natural del apetito con glucomanano, garcinia cambogia y 5-HTP. Reduce antojos hasta 40% y te ayuda a mantener tu déficit calórico sin pasar hambre.',
    42.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'weight_control',
    true,
    NULL
  ),
  (
    'Carb Blocker Plus',
    'Bloqueador de carbohidratos con extracto de frijol blanco y cromo picolinato. Reduce la absorción de carbohidratos hasta 30% y estabiliza niveles de glucosa.',
    39.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'weight_control',
    true,
    NULL
  ),
  (
    'Lean Metabolizer',
    'Acelerador metabólico con extracto de cayena, té verde y sinefrina. Aumenta la termogénesis y optimiza la oxidación de grasa durante todo el día.',
    44.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'weight_control',
    false,
    NULL
  ),
  (
    'Fat Loss Matrix',
    'Sistema completo de pérdida de grasa con CLA, L-carnitina, té verde y cromo. Fórmula integral que ataca la grasa desde múltiples ángulos metabólicos.',
    52.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'weight_control',
    false,
    NULL
  ),
  (
    'CLA Max',
    'Ácido linoleico conjugado de alta potencia (3000mg) para mejorar la composición corporal, reducir grasa abdominal y preservar masa muscular durante la dieta.',
    48.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'weight_control',
    false,
    NULL
  )
ON CONFLICT DO NOTHING;
