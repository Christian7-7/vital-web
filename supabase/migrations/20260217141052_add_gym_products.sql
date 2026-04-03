/*
  # Add gym products
  
  1. New Products
    - Mass Gainer Pro - For muscle mass development
    - Whey Isolate - High-quality protein for recovery
    - Creatine Matrix - For strength and power
    - Pre-Workout Pump - Energy and focus before training
    - BCAA Complex - Muscle protection and recovery
    - Anabolic Stack - Complete muscle-building formula
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Mass Gainer Pro',
    'Fórmula premium para ganancia de masa muscular magra. 50g de proteína de alta calidad, carbohidratos complejos y creatina para máximo crecimiento muscular y recuperación.',
    59.99,
    'https://images.pexels.com/photos/4498154/pexels-photo-4498154.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'GYM'
  ),
  (
    'Whey Isolate',
    'Proteína de suero aislada de máxima pureza. 90% de contenido proteico con absorción rápida para óptima recuperación muscular post-entrenamiento.',
    54.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    'GYM'
  ),
  (
    'Creatine Matrix',
    'Matriz de creatina multi-fase para fuerza explosiva. Aumenta hasta 20% tu fuerza máxima con esta mezcla de creatina monohidrato y creatina HCL.',
    44.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'GYM'
  ),
  (
    'Pre-Workout Pump',
    'Pre-entrenamiento extremo con óxido nítrico. Energía explosiva, concentración mental y vascularización intensa para entrenamientos demoledores.',
    48.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'GYM'
  ),
  (
    'BCAA Complex',
    'Aminoácidos de cadena ramificada 2:1:1. Protege tu masa muscular durante el entrenamiento y acelera la recuperación con esta fórmula esencial.',
    39.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    'GYM'
  ),
  (
    'Anabolic Stack',
    'Stack anabólico natural completo. Combinación de proteína, creatina, glutamina y beta-alanina para máxima ganancia de músculo y fuerza.',
    64.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'GYM'
  )
ON CONFLICT DO NOTHING;
