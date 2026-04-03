import { CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
  onPurchase: (product: Product) => void;
}

export function ProductCard({ product, index, onPurchase }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      window.location.hash = `product/${product.id}`;
    }
  };

  return (
    <div
      className="group relative overflow-hidden bg-[#0a0a0a] rounded-2xl shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(216,241,0,0.3)] cursor-pointer"
      style={{
        animation: `fadeInUp 0.6s ease-out forwards ${index * 0.1}s`,
        opacity: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {product.featured && (
          <div className="absolute top-4 right-4 bg-[#D8F100] text-black px-4 py-2 font-brand text-sm">
            DESTACADO
          </div>
        )}
      </div>

      <div className="relative p-6">
        <div className="mb-3">
          <span className="inline-block bg-white text-black text-xs font-bold uppercase tracking-widest px-2 py-1 border-2 border-black">
            {product.category === 'performance' && 'Rendimiento'}
            {product.category === 'recovery' && 'Recuperación'}
            {product.category === 'weight_control' && 'Control de Peso'}
            {product.category === 'wellness' && 'Bienestar'}
            {product.category === 'GYM' && 'Rendimiento'}
          </span>
        </div>

        <h3 className="font-brand text-4xl text-white mb-3 group-hover:text-[#D8F100] transition-colors duration-300 leading-tight antialiased">
          {product.name}
        </h3>

        <p className="text-white mb-4 leading-relaxed text-sm antialiased">
          {product.description}
        </p>

        <div
          className="space-y-2 mb-6 overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? '200px' : '0px',
            opacity: isHovered ? 1 : 0
          }}
        >
          {product.benefits?.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#D8F100] flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm antialiased">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#D8F100]/30">
          <div className="font-brand text-5xl text-[#D8F100] antialiased">
            ${Number(product.price).toLocaleString('es-CO')}
          </div>
          <button
            onClick={() => onPurchase(product)}
            className="bg-[#D8F100] text-black px-8 py-3 font-brand text-lg hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 antialiased"
          >
            COMPRAR
          </button>
        </div>
      </div>
    </div>
  );
}
