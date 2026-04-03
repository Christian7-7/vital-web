import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../src/lib/prisma';

const dummyProducts = [
  {
      name: 'Whey Protein Isolate - Pro',
      description: 'Proteína aislada de alta pureza con 25g de proteína por porción, ideal para el desarrollo de masa magra.',
      price: 45.99,
      image_url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80',
      category: 'performance',
      sport_category: 'gym',
      brand: 'VitalPro',
      stock: 100,
      is_featured: true,
      benefits: ['Aumenta masa muscular', 'Rápida absorción', 'Baja en carbohidratos'],
      image_gallery: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80']
  },
  {
      name: 'Pre-Workout Explosive',
      description: 'Fórmula pre-entreno diseñada para maximizar tu energía, concentración y bombeo muscular durante los entrenamientos más duros.',
      price: 34.50,
      image_url: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&q=80',
      category: 'performance',
      sport_category: 'crossfit',
      brand: 'VitalPro',
      stock: 50,
      is_featured: true,
      benefits: ['Energía extrema', 'Mayor enfoque mental', 'Resistencia prolongada'],
      image_gallery: ['https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&q=80']
  },
  {
      name: 'Recovery BCAAs + Glutamina',
      description: 'Bebida intra y post entreno que acelera la recuperación muscular minimizando el daño de las fibras.',
      price: 29.99,
      image_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80',
      category: 'recovery',
      sport_category: 'atletismo',
      brand: 'VitalPro',
      stock: 75,
      is_featured: false,
      benefits: ['Recuperación rápida', 'Previene el catabolismo', 'Hidratación óptima'],
      image_gallery: ['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80']
  },
  {
      name: 'Thermo Genesis Fat Burner',
      description: 'Termogénico potente que acelera tu metabolismo. Ideal para etapas de definición muscular y control de peso.',
      price: 39.99,
      image_url: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80',
      category: 'weight-control',
      sport_category: 'control-peso',
      brand: 'VitalPro',
      stock: 30,
      is_featured: false,
      benefits: ['Quema de grasa corporal', 'Control del apetito', 'Activación del metabolismo'],
      image_gallery: ['https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80']
  },
  {
      name: 'Wellness Omega 3 Pro',
      description: 'Ácidos grasos esenciales ultrapuros con certificación de metales pesados para salud cerebral, cardiovascular y articular.',
      price: 24.99,
      image_url: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80',
      category: 'wellness',
      sport_category: 'bienestar',
      brand: 'VitalPro',
      stock: 120,
      is_featured: true,
      benefits: ['Salud cardiovascular', 'Protección articular', 'Mejora cognitiva'],
      image_gallery: ['https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80']
  }
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    console.log('Iniciando el seeding de la Base de Datos desde Vercel...');
    
    // Wipe records to prevent duplicates
    await prisma.product.deleteMany({});
    console.log('Productos anteriores eliminados de la DB.');

    // Inject exact mock data with valid Unsplash Images
    for (const p of dummyProducts) {
      await prisma.product.create({ data: p });
    }
    
    console.log('¡Seeding completado exitosamente!');
    return res.status(200).json({ 
        success: true, 
        message: 'Base de datos Supabase actualizada masivamente con imágenes Unsplash.' 
    });
  } catch (error) {
    console.error('Failed to trigger database seed:', error);
    return res.status(500).json({ error: 'Failed to populate Supabase Database' });
  }
}
