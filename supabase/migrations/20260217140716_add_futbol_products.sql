/*
  # Add futbol products
  
  1. New Products
    - Sprint Power - For explosive acceleration
    - Endurance 90+ - Sustained energy for full match
    - Recovery Plus - Fast recovery between matches
    - Hydration Pro - Optimal hydration and electrolytes
    - Speed Boost - Enhanced velocity and agility
    - Match Ready - Pre-game energy formula
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Sprint Power',
    'Fórmula explosiva para maximizar tu velocidad y aceleración en sprints cortos. Con creatina y beta-alanina para potencia instantánea en carreras decisivas y contraataques rápidos.',
    45.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Futbol'
  ),
  (
    'Endurance 90+',
    'Energía sostenida para mantener tu nivel de juego durante los 90 minutos completos. Carbohidratos de liberación prolongada y electrolitos para rendimiento constante.',
    47.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Futbol'
  ),
  (
    'Recovery Plus',
    'Recuperación acelerada entre partidos y entrenamientos. Con proteína de rápida absorción, BCAAs y glutamina para estar listo para el próximo juego.',
    44.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    'Futbol'
  ),
  (
    'Hydration Pro',
    'Hidratación óptima con balance perfecto de electrolitos. Mantén tu rendimiento en climas calurosos y previene calambres durante el partido.',
    38.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Futbol'
  ),
  (
    'Speed Boost',
    'Aumenta tu velocidad y agilidad con esta mezcla de pre-entrenamiento especializada. Cafeína y taurina para reacciones más rápidas y mejor coordinación.',
    46.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Futbol'
  ),
  (
    'Match Ready',
    'Pre-partido completo para llegar al máximo desde el pitido inicial. Energía, concentración y resistencia para dar todo en la cancha.',
    49.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Futbol'
  )
ON CONFLICT DO NOTHING;
