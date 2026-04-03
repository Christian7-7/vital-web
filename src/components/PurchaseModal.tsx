import React, { useState } from 'react';
import { Product } from '../types';

interface PurchaseModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (formData: { product: Product; [key: string]: unknown }) => Promise<void>;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ product, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real scenario, we gather form data here and pass to onSubmit
      await onSubmit({ product });
      alert('¡Pedido realizado con éxito! Te contactaremos pronto para confirmar tu compra.');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al procesar el pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="bg-black border-2 border-[#D8F100]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-brand text-4xl text-[#D8F100]">COMPRAR PRODUCTO</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-3xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="font-brand text-3xl text-white mb-2">{product.name.toUpperCase()}</h3>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <div className="font-brand text-5xl text-[#D8F100] mb-6">${product.price}</div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white mb-2 font-bold">Cantidad</label>
              <input
                type="number"
                min="1"
                defaultValue="1"
                required
                className="w-full px-4 py-3 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-bold">Nombre completo</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-bold">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-bold">Teléfono</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-bold">Dirección de envío</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-3 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D8F100] text-black px-8 py-4 font-brand text-xl tracking-wide hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 font-bold disabled:opacity-50"
            >
              {loading ? 'PROCESANDO...' : 'CONFIRMAR COMPRA'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
