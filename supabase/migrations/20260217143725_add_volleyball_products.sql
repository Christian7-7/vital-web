/*
  # Add volleyball products
  
  1. New Products
    - Jump Max - For explosive vertical jumping
    - Reaction Pro - Mental focus and quick reflexes
    - Joint Shield - Protection for knees and ankles
    - Rally Endurance - Sustained energy for long matches
    - Quick Recovery - Fast muscle recovery between games
    - Court Agility - Enhanced coordination and movement
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Jump Max',
    'Fórmula explosiva para maximizar tu salto vertical. Con creatina monohidrato y beta-alanina para remates poderosos y bloqueos efectivos en la red.',
    46.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Volleyball'
  ),
  (
    'Reaction Pro',
    'Mejora tu tiempo de reacción y concentración mental. Nootrópicos naturales y cafeína para anticipar cada jugada y reaccionar instantáneamente.',
    43.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Volleyball'
  ),
  (
    'Joint Shield',
    'Protección completa para rodillas y tobillos. Colágeno tipo II, glucosamina y condroitina para prevenir lesiones por impactos repetitivos.',
    49.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    'Volleyball'
  ),
  (
    'Rally Endurance',
    'Energía sostenida para rallies largos y sets completos. Carbohidratos de liberación prolongada y electrolitos para mantener tu nivel de juego.',
    44.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Volleyball'
  ),
  (
    'Quick Recovery',
    'Recuperación acelerada entre juegos y torneos. Proteína de rápida absorción con BCAAs para que estés listo para el siguiente set.',
    45.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    'Volleyball'
  ),
  (
    'Court Agility',
    'Aumenta tu agilidad y coordinación en la cancha. Mezcla especializada para movimientos laterales rápidos y cambios de dirección explosivos.',
    47.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Volleyball'
  )
ON CONFLICT DO NOTHING;
