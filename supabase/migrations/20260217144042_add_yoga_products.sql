/*
  # Add yoga products
  
  1. New Products
    - Flex & Flow - Enhances flexibility and joint mobility
    - Zen Mind - Mental clarity and meditation support
    - Inner Peace - Stress relief and calm
    - Golden Turmeric - Anti-inflammatory and recovery
    - Green Balance - Superfood blend for vitality
    - Mindful Recovery - Post-practice restoration
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Flex & Flow',
    'Fórmula avanzada de colágeno tipo I y III con magnesio para mejorar la flexibilidad articular y profundizar tus asanas. Ideal para alcanzar nuevos niveles en tu práctica.',
    52.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    'Yoga'
  ),
  (
    'Zen Mind',
    'Mezcla de adaptógenos y nootrópicos naturales con ashwagandha, rhodiola y L-teanina para mejorar tu concentración en meditación y alcanzar estados de mindfulness profundo.',
    48.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    true,
    'Yoga'
  ),
  (
    'Inner Peace',
    'Fórmula calmante con extracto de lavanda, magnesio glicinato y GABA para reducir el estrés, mejorar el sueño y mantener tu equilibrio emocional durante todo el día.',
    45.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    true,
    'Yoga'
  ),
  (
    'Golden Turmeric',
    'Cúrcuma dorada con bioperina para máxima absorción. Potente antiinflamatorio natural que acelera la recuperación muscular y protege tus articulaciones.',
    41.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    'Yoga'
  ),
  (
    'Green Balance',
    'Superalimento verde completo con espirulina, chlorella, matcha y probióticos. Nutrición holística para energía sostenible y bienestar digestivo.',
    54.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    false,
    'Yoga'
  ),
  (
    'Mindful Recovery',
    'Proteína vegana premium con enzimas digestivas, cáñamo y chía para recuperación muscular suave después de prácticas intensas de vinyasa o ashtanga.',
    49.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    'Yoga'
  )
ON CONFLICT DO NOTHING;
