import { ArrowLeft, CheckCircle2, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onPurchase: (product: Product) => void;
}

export function ProductDetailView({ product, onBack, onPurchase }: ProductDetailViewProps) {
  const images = product.image_gallery && product.image_gallery.length > 0
    ? product.image_gallery
    : [product.image_url];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#D8F100]/20">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-[#D8F100] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-brand text-base">VOLVER</span>
          </button>
        </div>
      </div>

      <div className="pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative">
              <div className="sticky top-20">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-2xl group max-w-[500px] mx-auto">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-[#D8F100] text-black px-4 py-2 font-brand text-sm">
                      DESTACADO
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#D8F100] text-white hover:text-black p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#D8F100] text-white hover:text-black p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="Imagen siguiente"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex
                                ? 'bg-[#D8F100] w-6'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Ver imagen ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2 max-w-[500px] mx-auto">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          idx === currentImageIndex
                            ? 'border-[#D8F100] scale-105'
                            : 'border-transparent hover:border-white/30'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} miniatura ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-3">
                  <span className="inline-block bg-white text-black text-xs font-bold uppercase tracking-widest px-3 py-1.5 border-2 border-black">
                    {product.category === 'performance' && 'Rendimiento'}
                    {product.category === 'recovery' && 'Recuperación'}
                    {product.category === 'weight_control' && 'Control de Peso'}
                    {product.category === 'wellness' && 'Bienestar'}
                    {product.category === 'GYM' && 'Rendimiento'}
                  </span>
                </div>

                <h1 className="font-brand text-4xl md:text-5xl text-white mb-4 leading-tight antialiased">
                  {product.name}
                </h1>

                <p className="text-white text-base leading-relaxed antialiased">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3 bg-[#0a0a0a] p-5 rounded-xl border border-[#D8F100]/20">
                <h2 className="font-brand text-2xl text-[#D8F100] mb-3 antialiased">
                  BENEFICIOS
                </h2>
                <div className="space-y-2.5">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D8F100] flex-shrink-0 mt-0.5" />
                      <span className="text-white text-sm antialiased">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#D8F100]/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">PRECIO</p>
                    <div className="font-brand text-4xl text-[#D8F100] antialiased">
                      ${parseInt(product.price.toString()).toLocaleString('es-CO')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onPurchase(product)}
                  className="w-full bg-[#D8F100] text-black px-6 py-4 font-brand text-xl hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 antialiased"
                >
                  <ShoppingCart className="w-6 h-6" />
                  COMPRAR AHORA
                </button>
              </div>

              <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#D8F100]/20">
                <h3 className="font-brand text-lg text-white mb-3 antialiased">
                  INFORMACIÓN DEL PRODUCTO
                </h3>
                <div className="space-y-2 text-white/80">
                  <p className="text-xs antialiased">
                    Este suplemento ha sido cuidadosamente seleccionado para ofrecer los mejores resultados en tu entrenamiento y bienestar.
                  </p>
                  <p className="text-xs antialiased">
                    Para obtener más información sobre este producto o consultar disponibilidad, no dudes en contactarnos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
