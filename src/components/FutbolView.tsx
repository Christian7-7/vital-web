import { ChevronLeft, Zap, Timer, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FutbolViewProps {
  products: Product[];
  onBack: () => void;
  onPurchase: (product: Product) => void;
}

export function FutbolView({ products, onBack, onPurchase }: FutbolViewProps) {
  const filteredProducts = products.filter(p => p.sport_category === 'futbol');

  return (
    <div className="min-h-screen bg-textured-black">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/Futbol.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <button
            onClick={onBack}
            className="absolute top-[-50vh] left-6 flex items-center gap-2 text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          >
            <ChevronLeft className="w-6 h-6" />
            Volver
          </button>

          <div className="animate-fadeIn">
            <h1 className="font-brand text-7xl md:text-9xl text-white mb-6 leading-none tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              FÚTBOL
            </h1>
            <p className="text-2xl md:text-3xl text-[#D8F100] font-brand mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              VELOCIDAD Y RESISTENCIA
            </p>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Suplementos diseñados para mantener tu energía durante los 90 minutos de juego
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-brand text-5xl md:text-6xl text-white mb-6 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              SUPLEMENTOS <span className="text-[#D8F100]">EXCLUSIVOS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Fórmulas especializadas para futbolistas que buscan velocidad explosiva, resistencia aeróbica y recuperación rápida
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#141414] border border-[#D8F100]/20 p-8 rounded-xl text-center hover:border-[#D8F100] transition-all duration-300">
              <Zap className="w-12 h-12 text-[#D8F100] mx-auto mb-4" />
              <h3 className="font-brand text-2xl text-white mb-3">VELOCIDAD EXPLOSIVA</h3>
              <p className="text-gray-400 leading-relaxed">
                Maximiza tu aceleración y velocidad en sprints cortos para dominar en contraataques y carreras decisivas
              </p>
            </div>
            <div className="bg-[#141414] border border-[#D8F100]/20 p-8 rounded-xl text-center hover:border-[#D8F100] transition-all duration-300">
              <Timer className="w-12 h-12 text-[#D8F100] mx-auto mb-4" />
              <h3 className="font-brand text-2xl text-white mb-3">RESISTENCIA 90+</h3>
              <p className="text-gray-400 leading-relaxed">
                Mantén tu nivel de juego constante desde el primer hasta el último minuto con energía sostenida
              </p>
            </div>
            <div className="bg-[#141414] border border-[#D8F100]/20 p-8 rounded-xl text-center hover:border-[#D8F100] transition-all duration-300">
              <Heart className="w-12 h-12 text-[#D8F100] mx-auto mb-4" />
              <h3 className="font-brand text-2xl text-white mb-3">RECUPERACIÓN ACTIVA</h3>
              <p className="text-gray-400 leading-relaxed">
                Reduce el tiempo de recuperación entre partidos y entrenamientos para estar siempre listo
              </p>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onPurchase={onPurchase}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                Próximamente agregaremos suplementos exclusivos para fútbol
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
