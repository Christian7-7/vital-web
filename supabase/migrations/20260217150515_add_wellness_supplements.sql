/*
  # Add wellness supplements
  
  1. New Products
    - Immune Boost - Complete immune system support
    - Mind Focus - Nootropic cognitive enhancer
    - Omega-3 Ultra - Premium fish oil for heart health
    - Stress Relief - Adaptogenic stress reducer
    - Daily Multivitamin - Complete daily nutrition
    - Probiotic Complex - Digestive and immune health
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Immune Boost',
    'Fórmula completa con vitamina C, D3, zinc, equinácea y elderberry para fortalecer tu sistema inmunológico y protegerte de virus y bacterias durante todo el año.',
    44.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    true,
    NULL
  ),
  (
    'Mind Focus',
    'Nootrópico avanzado con cafeína L-teanina, bacopa monnieri y lion''s mane para mejorar concentración, memoria y claridad mental sin efectos secundarios.',
    49.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    true,
    NULL
  ),
  (
    'Omega-3 Ultra',
    'Aceite de pescado de alta pureza (2000mg EPA/DHA) para salud cardiovascular, reducción de triglicéridos y apoyo antiinflamatorio. Sin sabor a pescado.',
    41.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    true,
    NULL
  ),
  (
    'Stress Relief',
    'Mezcla adaptógena con ashwagandha, rhodiola rosea y magnesio para reducir cortisol, manejar ansiedad y promover sensación de calma y bienestar.',
    46.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    false,
    NULL
  ),
  (
    'Daily Multivitamin',
    'Multivitamínico premium con 25+ vitaminas y minerales esenciales, extractos herbales y antioxidantes para cubrir todas tus necesidades nutricionales diarias.',
    38.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    false,
    NULL
  ),
  (
    'Probiotic Complex',
    'Complejo probiótico con 50 billones CFU y 10 cepas bacterianas para optimizar salud digestiva, fortalecer inmunidad y mejorar absorción de nutrientes.',
    52.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'wellness',
    false,
    NULL
  )
ON CONFLICT DO NOTHING;
