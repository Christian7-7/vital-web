import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../src/lib/prisma'; // Assumes alias or relative path works depending on build

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category, sport_category, featured } = req.query;
    
    // Construct where clause based on optional query params
    const whereClause: Record<string, string | boolean> = {};
    if (category) whereClause.category = String(category);
    if (sport_category) whereClause.sport_category = String(sport_category);
    if (featured === 'true') whereClause.is_featured = true;

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { created_at: 'desc' }
    });

    // Map `is_featured` to `featured` to comply with the frontend 'Product' type
    const formattedProducts = products.map(({ is_featured, ...rest }) => ({
      ...rest,
      featured: is_featured
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
