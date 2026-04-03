/*
  # Add calistenia products
  
  1. New Products
    - Bodyweight Power - Pre-workout for bodyweight training
    - Lean Muscle Stack - For muscle definition
    - Joint Support Pro - Joint and tendon health
    - Endurance Core - For extended training sessions
    - Pull Power - Upper body strength
    - Protein Lean - Lean muscle protein
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Bodyweight Power',
    'Pre-entrenamiento diseñado para maximizar tu rendimiento en entrenamientos de peso corporal. Aumenta tu fuerza relativa y potencia para dominar movimientos avanzados como muscle-ups y handstands.',
    44.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Calistenia'
  ),
  (
    'Lean Muscle Stack',
    'Fórmula avanzada para desarrollar músculo magro sin volumen excesivo. Mantén la proporción perfecta entre fuerza y peso corporal para movimientos funcionales óptimos.',
    49.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Calistenia'
  ),
  (
    'Joint Support Pro',
    'Protege tus articulaciones y tendones durante entrenamientos intensos. Esencial para prevenir lesiones en movimientos de alta tensión como front levers y planchas.',
    39.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    'Calistenia'
  ),
  (
    'Endurance Core',
    'Aumenta tu resistencia muscular para series largas y entrenamientos extendidos. Mantén la intensidad desde el primer hasta el último set.',
    46.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Calistenia'
  ),
  (
    'Pull Power',
    'Maximiza tu fuerza de tracción para dominadas, pull-ups y movimientos de jale. Fórmula especializada con creatina y beta-alanina.',
    47.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Calistenia'
  ),
  (
    'Protein Lean',
    'Proteína de alta calidad diseñada para atletas de calistenia. Desarrolla músculo magro sin afectar tu relación peso-fuerza. Bajo en calorías, alto en efectividad.',
    41.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Calistenia'
  )
ON CONFLICT DO NOTHING;
