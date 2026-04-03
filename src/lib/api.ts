import { Product } from '../types';

// API base URL defaults to current origin in production/Vercel
// In local Vite dev it should point to wherever `vercel dev` is running, usually 3000
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchProducts = async (params?: {
  category?: string;
  sport_category?: string;
  featured?: boolean;
}): Promise<Product[]> => {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.sport_category) query.append('sport_category', params.sport_category);
  if (params?.featured) query.append('featured', 'true');

  const response = await fetch(`${API_URL}/products?${query.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const sendEmail = async (to: string, subject: string, body: string) => {
  const response = await fetch(`${API_URL}/emails/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, body }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }
  return response.json();
};
