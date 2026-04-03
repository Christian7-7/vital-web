/*
  # Add crossfit products
  
  1. New Products
    - WOD Fury - Pre-workout for intense WODs
    - Olympic Power - For olympic lifts
    - AMRAP Energy - Sustained energy for AMRAPs
    - RX Recovery - Fast post-WOD recovery
    - Beast Mode - Maximum strength formula
    - Metcon Fuel - Energy for metabolic conditioning
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'WOD Fury',
    'Pre-entrenamiento de máxima intensidad para dominar cualquier WOD. Fórmula explosiva con cafeína, beta-alanina y citrulina para energía sostenida durante entrenamientos funcionales extremos.',
    48.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Crossfit'
  ),
  (
    'Olympic Power',
    'Desarrolla fuerza explosiva para levantamientos olímpicos. Optimiza tu rendimiento en clean & jerk y snatch con creatina monohidrato y beta-hidroxi-beta-metilbutirato.',
    54.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Crossfit'
  ),
  (
    'AMRAP Energy',
    'Energía constante para completar el máximo de rondas posibles. Fórmula de liberación sostenida con carbohidratos complejos y electrolitos para mantener la intensidad.',
    43.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Crossfit'
  ),
  (
    'RX Recovery',
    'Recuperación acelerada post-WOD. Fórmula completa con proteína de suero, BCAAs y glutamina para reparación muscular rápida y reducción de fatiga.',
    46.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    'Crossfit'
  ),
  (
    'Beast Mode',
    'Activa tu modo bestia para PRs en levantamientos. Potencia máxima con creatina, betaína y agmatina para romper tus marcas personales.',
    51.99,
    'https://images.pexels.com/photos/4498154/pexels-photo-4498154.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Crossfit'
  ),
  (
    'Metcon Fuel',
    'Combustible para acondicionamiento metabólico intenso. Mantén la potencia durante workouts tipo Fran, Murph y Helen con esta fórmula de energía rápida.',
    44.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Crossfit'
  )
ON CONFLICT DO NOTHING;
