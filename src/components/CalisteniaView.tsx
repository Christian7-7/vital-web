import { ChevronLeft, Dumbbell, Target, Zap } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CalisteniaViewProps {
  products: Product[];
  onBack: () => void;
  onPurchase: (product: Product) => void;
}

export function CalisteniaView({ products, onBack, onPurchase }: CalisteniaViewProps) {
  const filteredProducts = products.filter(p => p.sport_category === 'calistenia');

  return (
    <div className="min-h-screen bg-textured-black">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/Calistenia.jpg)' }}
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
              CALISTENIA
            </h1>
            <p className="text-2xl md:text-3xl text-[#D8F100] font-brand mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              FUERZA Y CONTROL CORPORAL
            </p>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Suplementos diseñados para maximizar tu fuerza relativa, resistencia muscular y definición
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
              Fórmulas especializadas para atletas de peso corporal que buscan dominar movimientos avanzados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#141414] border border-[#D8F100]/20 p-8 rounded-xl text-center hover:border-[#D8F100] transition-all duration-300">
              <Dumbbell className="w-12 h-12 text-[#D8F100] mx-auto mb-4" />
              <h3 className="font-brand text-2xl text-white mb-3">FUERZA MÁXIMA</h3>
              <p className="text-gray-400 leading-relaxed">
                Desarrolla la fuerza necesaria para dominar movimientos como muscle-ups, planchas y front levers
              </p>
            </div>
            <div className="bg-[#141414] border border-[#D8F100]/20 p-8 rounded-xl text-center hover:border-[#D8F100] transition-all duration-300">
              <Target className="w-12 h-12 text-[#D8F100] mx-auto mb-4" />
              <h3 className="font-brand text-2xl text-white mb-3">DEFINICIÓN</h3>
              <p className="text-gray-400 leading-relaxed">
                Mantén un físico estético y funcional con suplementos que apoyan la composición corporal ideal
              </p>
            </div>
            <div className="bg-[#141414] border border-[#D8F100]/20 p-8 rounded-xl text-center hover:border-[#D8F100] transition-all duration-300">
              <Zap className="w-12 h-12 text-[#D8F100] mx-auto mb-4" />
              <h3 className="font-brand text-2xl text-white mb-3">RESISTENCIA</h3>
              <p className="text-gray-400 leading-relaxed">
                Aumenta tu capacidad para mantener la intensidad en series largas y entrenamientos extendidos
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
                Próximamente agregaremos suplementos exclusivos para calistenia
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
