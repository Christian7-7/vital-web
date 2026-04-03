/*
  # Add ciclismo products
  
  1. New Products
    - Endurance Fuel - Long distance energy and hydration
    - Climb Power - Strength for hills and mountains
    - Speed Surge - Sprint power and acceleration
    - Pedal Recovery - Post-ride muscle restoration
    - Oxygen Max - Enhanced aerobic capacity
    - Leg Stamina - Muscular endurance for long rides
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Endurance Fuel',
    'Fórmula completa para rutas largas con carbohidratos de liberación prolongada, electrolitos y vitaminas B. Mantén tu energía constante en distancias de más de 100km.',
    51.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Ciclismo'
  ),
  (
    'Climb Power',
    'Potencia explosiva para subidas con creatina monohidrato y beta-alanina. Conquista las pendientes más exigentes con fuerza sostenida.',
    47.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Ciclismo'
  ),
  (
    'Speed Surge',
    'Pre-entreno explosivo con cafeína, taurina y arginina para sprints finales y ataques decisivos. Aumenta tu velocidad punta cuando más importa.',
    44.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    true,
    'Ciclismo'
  ),
  (
    'Pedal Recovery',
    'Recuperación muscular avanzada con proteína whey, BCAAs y glutamina. Reduce el dolor post-ruta y prepárate para el siguiente entrenamiento.',
    49.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    'Ciclismo'
  ),
  (
    'Oxygen Max',
    'Optimiza tu VO2 máximo con hierro, cordyceps y beetroot. Mejora tu capacidad aeróbica y mantén velocidades altas por más tiempo.',
    53.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Ciclismo'
  ),
  (
    'Leg Stamina',
    'Resistencia muscular específica para cuádriceps y gemelos. Con magnesio, potasio y L-carnitina para retrasar la fatiga en piernas.',
    46.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'performance',
    false,
    'Ciclismo'
  )
ON CONFLICT DO NOTHING;
