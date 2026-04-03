/*
  # Add recovery supplements
  
  1. New Products
    - Night Restore - Deep sleep and muscle recovery
    - Muscle Repair Pro - Post-workout muscle restoration
    - Joint Care Plus - Joint health and flexibility
    - Sleep & Recover - Premium sleep formula
    - Inflammation Relief - Natural anti-inflammatory
    - Recovery Matrix - Complete recovery blend
*/

INSERT INTO products (name, description, price, image_url, category, featured, sport_category)
VALUES
  (
    'Night Restore',
    'Fórmula nocturna avanzada con caseína micelar de liberación lenta, ZMA y melatonina para maximizar la recuperación mientras duermes. Despierta renovado y listo.',
    54.99,
    'https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    NULL
  ),
  (
    'Muscle Repair Pro',
    'Mezcla óptima de proteína whey isolate, BCAAs 2:1:1 y glutamina para acelerar la síntesis proteica y reducir el dolor muscular post-entreno.',
    49.99,
    'https://images.pexels.com/photos/7289716/pexels-photo-7289716.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    NULL
  ),
  (
    'Joint Care Plus',
    'Fórmula completa con glucosamina, condroitina, MSM y colágeno tipo II para proteger articulaciones, reducir inflamación y mantener movilidad.',
    52.99,
    'https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    true,
    NULL
  ),
  (
    'Sleep & Recover',
    'Combinación premium de magnesio glicinato, L-teanina, ashwagandha y GABA para inducir sueño profundo y reducir el estrés después de días intensos.',
    46.99,
    'https://images.pexels.com/photos/7289588/pexels-photo-7289588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    NULL
  ),
  (
    'Inflammation Relief',
    'Antiinflamatorio natural con cúrcuma, boswellia, jengibre y omega-3 para reducir inflamación crónica y acelerar la curación de lesiones.',
    48.99,
    'https://images.pexels.com/photos/4498598/pexels-photo-4498598.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    NULL
  ),
  (
    'Recovery Matrix',
    'Sistema completo de recuperación con creatina, beta-alanina, taurina y electrolitos para reponer energía y prepararte para el siguiente entreno.',
    51.99,
    'https://images.pexels.com/photos/6456299/pexels-photo-6456299.jpeg?auto=compress&cs=tinysrgb&w=800',
    'recovery',
    false,
    NULL
  )
ON CONFLICT DO NOTHING;
