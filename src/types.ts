export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  image_url: string;
  image_gallery?: string[];
  price: number;
  featured: boolean;
  created_at: string;
  sport_category?: string;
  brand?: string;
  stock?: number;
}
