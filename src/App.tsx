import React, { useEffect, useState } from 'react';
import { Dumbbell, Moon, Scale, ChevronDown } from 'lucide-react';
import { Product } from './types';
import { ProductCard } from './components/ProductCard';
import { Navbar } from './components/Navbar';
import { ChatBot } from './components/ChatBot';
import { AtletismoView } from './components/AtletismoView';
import { BienestarView } from './components/BienestarView';
import { CalisteniaView } from './components/CalisteniaView';
import { CiclismoView } from './components/CiclismoView';
import { ControlDePesoView } from './components/ControlDePesoView';
import { CrossfitView } from './components/CrossfitView';
import { FutbolView } from './components/FutbolView';
import { GymView } from './components/GymView';
import { RecuperacionView } from './components/RecuperacionView';
import { VolleyballView } from './components/VolleyballView';
import { YogaView } from './components/YogaView';
import { ProductDetailView } from './components/ProductDetailView';
import { Header } from './components/Header';
import { PurchaseModal } from './components/PurchaseModal';
import { fetchProducts as fetchProductsApi, sendEmail } from './lib/api';

type View = 'home' | 'atletismo' | 'bienestar' | 'calistenia' | 'ciclismo' | 'control-peso' | 'crossfit' | 'futbol' | 'gym' | 'recuperacion' | 'volleyball' | 'yoga' | 'product-detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [productDetailId, setProductDetailId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash.startsWith('product/')) {
        const productId = hash.replace('product/', '');
        setProductDetailId(productId);
        setCurrentView('product-detail');
      } else if (hash === 'atletismo') {
        setCurrentView('atletismo');
      } else if (hash === 'bienestar') {
        setCurrentView('bienestar');
      } else if (hash === 'calistenia') {
        setCurrentView('calistenia');
      } else if (hash === 'ciclismo') {
        setCurrentView('ciclismo');
      } else if (hash === 'control-peso') {
        setCurrentView('control-peso');
      } else if (hash === 'crossfit') {
        setCurrentView('crossfit');
      } else if (hash === 'futbol') {
        setCurrentView('futbol');
      } else if (hash === 'gym') {
        setCurrentView('gym');
      } else if (hash === 'recuperacion') {
        setCurrentView('recuperacion');
      } else if (hash === 'volleyball') {
        setCurrentView('volleyball');
      } else if (hash === 'yoga') {
        setCurrentView('yoga');
      } else if (hash === '') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      // Fetches from our Vercel Node.js backend using Prisma, instead of Supabase client directly
      const data = await fetchProductsApi();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
    setShowPurchaseModal(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  };

  const categories = [
    { id: 'all', label: 'Todos', icon: Dumbbell },
    { id: 'performance', label: 'Rendimiento', iconImage: '/image.png' },
    { id: 'recovery', label: 'Recuperación', icon: Moon },
    { id: 'weight-control', label: 'Control de Peso', icon: Scale }
  ];

  if (currentView === 'product-detail' && productDetailId) {
    const product = products.find(p => p.id === productDetailId);
    if (!product) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-2xl">Producto no encontrado</div>
        </div>
      );
    }
    return (
      <ProductDetailView
        product={product}
        onBack={() => {
          window.history.back();
        }}
        onPurchase={handlePurchase}
      />
    );
  }

  const handleHomeClick = () => {
    setCurrentView('home');
    window.location.hash = '';
  };

  const handlePurchaseSubmit = async (formData: { product: Product; [key: string]: unknown }) => {
    // Simulated email transaction via backend
    await sendEmail(
      'admin@vital.com',
      `Nuevo pedido de ${formData.product.name} (Mock)`,
      `<p>Se ha recibido una intención de compra para: ${formData.product.name}</p>`
    );
  };

  if (currentView === 'atletismo') {
    return (
      <>
        <Header onHomeClick={handleHomeClick} />
        <div className="pt-[144px]">
          <AtletismoView
            products={products}
            onBack={handleHomeClick} onPurchase={handlePurchase} />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'calistenia') {
    return (
      <>
        <Header onHomeClick={handleHomeClick} />
        <div className="pt-[144px]">
          <CalisteniaView
            products={products}
            onBack={handleHomeClick} onPurchase={handlePurchase} />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'ciclismo') {
    return (
      <>
        <Header onHomeClick={handleHomeClick} />
        <div className="pt-[144px]">
          <CiclismoView
            products={products}
            onBack={handleHomeClick} onPurchase={handlePurchase} />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'crossfit') {
    return (
      <>
        <Header onHomeClick={handleHomeClick} />
        <div className="pt-[144px]">
          <CrossfitView
            products={products}
            onBack={handleHomeClick} onPurchase={handlePurchase} />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'futbol') {
    return (
      <>
        <Header onHomeClick={handleHomeClick} />
        <div className="pt-[144px]">
          <FutbolView
            products={products}
            onBack={handleHomeClick} onPurchase={handlePurchase} />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'gym') {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => {
                setCurrentView('home');
                window.location.hash = '';
              }} className="focus:outline-none">
                <img
                  src="/vital_pro.png"
                  alt="VitalPro"
                  className="h-[72px] w-auto cursor-pointer hover:opacity-90 transition-opacity"
                />
              </button>
            </div>
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Inicio
              </a>
              <a href="#products" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Productos
              </a>
              <a href="#contact" onClick={() => setCurrentView('home')} className="bg-[#D8F100] text-black px-6 py-2 font-semibold uppercase text-sm tracking-wide hover:bg-white transition-all duration-300">
                Contacto
              </a>
            </nav>
          </div>
        </header>
        <Navbar />
        <div className="pt-[144px]">
          <GymView
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.location.hash = '';
            }}
            onPurchase={handlePurchase}
          />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'volleyball') {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => {
                setCurrentView('home');
                window.location.hash = '';
              }} className="focus:outline-none">
                <img
                  src="/vital_pro.png"
                  alt="VitalPro"
                  className="h-[72px] w-auto cursor-pointer hover:opacity-90 transition-opacity"
                />
              </button>
            </div>
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Inicio
              </a>
              <a href="#products" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Productos
              </a>
              <a href="#contact" onClick={() => setCurrentView('home')} className="bg-[#D8F100] text-black px-6 py-2 font-semibold uppercase text-sm tracking-wide hover:bg-white transition-all duration-300">
                Contacto
              </a>
            </nav>
          </div>
        </header>
        <Navbar />
        <div className="pt-[144px]">
          <VolleyballView
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.location.hash = '';
            }}
            onPurchase={handlePurchase}
          />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'yoga') {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => {
                setCurrentView('home');
                window.location.hash = '';
              }} className="focus:outline-none">
                <img
                  src="/vital_pro.png"
                  alt="VitalPro"
                  className="h-[72px] w-auto cursor-pointer hover:opacity-90 transition-opacity"
                />
              </button>
            </div>
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Inicio
              </a>
              <a href="#products" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Productos
              </a>
              <a href="#contact" onClick={() => setCurrentView('home')} className="bg-[#D8F100] text-black px-6 py-2 font-semibold uppercase text-sm tracking-wide hover:bg-white transition-all duration-300">
                Contacto
              </a>
            </nav>
          </div>
        </header>
        <Navbar />
        <div className="pt-[144px]">
          <YogaView
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.location.hash = '';
            }}
            onPurchase={handlePurchase}
          />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'recuperacion') {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => {
                setCurrentView('home');
                window.location.hash = '';
              }} className="focus:outline-none">
                <img
                  src="/vital_pro.png"
                  alt="VitalPro"
                  className="h-[72px] w-auto cursor-pointer hover:opacity-90 transition-opacity"
                />
              </button>
            </div>
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Inicio
              </a>
              <a href="#products" onClick={() => setCurrentView('home')} className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Productos
              </a>
              <a href="#contact" onClick={() => setCurrentView('home')} className="bg-[#D8F100] text-black px-6 py-2 font-semibold uppercase text-sm tracking-wide hover:bg-white transition-all duration-300">
                Contacto
              </a>
            </nav>
          </div>
        </header>
        <Navbar />
        <div className="pt-[144px]">
          <RecuperacionView
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.location.hash = '';
            }}
            onPurchase={handlePurchase}
          />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'bienestar') {
    return (
      <>
        <Header onHomeClick={handleHomeClick} />
        <div className="pt-[144px]">
          <BienestarView
            products={products}
            onBack={handleHomeClick} onPurchase={handlePurchase} />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  if (currentView === 'control-peso') {
    return (
      <>
        <Header onHomeClick={handleHomeClick} />
        <div className="pt-[144px]">
          <ControlDePesoView
            products={products}
            onBack={handleHomeClick} onPurchase={handlePurchase} />
        </div>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setShowPurchaseModal(false)}
            onSubmit={handlePurchaseSubmit}
          />
        )}
        <ChatBot products={products} onProductSelect={handlePurchase} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-textured-black">
      <Header onHomeClick={handleHomeClick} />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[144px]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D8F100] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D8F100] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fadeIn">
            <h2 className="font-brand text-7xl md:text-9xl text-white mb-4 leading-none tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              BE FIT
              <br />
              <span className="text-[#D8F100]">FEEL FIT</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Suplementos de alto rendimiento para alcanzar tu máximo potencial
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-3 bg-[#D8F100] text-black px-10 py-5 font-brand text-2xl hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[0_0_30px_rgba(216,241,0,0.5)]"
            >
              EXPLORAR PRODUCTOS
              <ChevronDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-brand text-6xl md:text-7xl text-white mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              NUESTROS <span className="text-[#D8F100]">PRODUCTOS</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Fórmulas científicamente respaldadas para cada objetivo
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const { id, label, icon: Icon, iconImage } = category as { id: string; label: string; icon?: any; iconImage?: string };
              return (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  className={`flex items-center gap-3 px-8 py-4 font-brand text-lg tracking-wide transition-all duration-300 ${
                    filter === id
                      ? 'bg-[#D8F100] text-black scale-105 shadow-lg font-bold'
                      : 'bg-[#141414] text-gray-300 hover:bg-[#1a1a1a] hover:text-[#D8F100] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {iconImage ? (
                    <img src={iconImage} alt={label} className="w-5 h-5 object-contain" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  {label.toUpperCase()}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#D8F100] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-brand text-6xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              SOBRE <span className="text-[#D8F100]">NOSOTROS</span>
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6">
              VitalPro es líder en suplementación deportiva de alto rendimiento. Nos dedicamos a desarrollar fórmulas científicamente respaldadas que impulsan tu rendimiento al máximo nivel.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Nuestros productos son fabricados con los más altos estándares de calidad, utilizando ingredientes premium y tecnología de vanguardia para garantizar resultados excepcionales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-[#141414] p-8 rounded-xl text-center">
              <div className="text-[#D8F100] text-5xl font-brand mb-4">100%</div>
              <h4 className="text-white font-brand text-xl mb-2">CALIDAD PREMIUM</h4>
              <p className="text-gray-400 text-sm">Ingredientes de la más alta pureza</p>
            </div>
            <div className="bg-[#141414] p-8 rounded-xl text-center">
              <div className="text-[#D8F100] text-5xl font-brand mb-4">+50K</div>
              <h4 className="text-white font-brand text-xl mb-2">CLIENTES SATISFECHOS</h4>
              <p className="text-gray-400 text-sm">Confiando en nuestros productos</p>
            </div>
            <div className="bg-[#141414] p-8 rounded-xl text-center">
              <div className="text-[#D8F100] text-5xl font-brand mb-4">15+</div>
              <h4 className="text-white font-brand text-xl mb-2">AÑOS EXPERIENCIA</h4>
              <p className="text-gray-400 text-sm">Liderando la industria</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-brand text-6xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              <span className="text-[#D8F100]">CONTACTO</span>
            </h3>
            <p className="text-xl text-gray-300 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nombre completo"
                required
                className="w-full px-6 py-4 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                className="w-full px-6 py-4 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Mensaje"
                rows={6}
                required
                className="w-full px-6 py-4 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg focus:outline-none focus:border-[#D8F100] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D8F100] text-black px-8 py-4 font-brand text-xl tracking-wide hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 font-bold"
            >
              ENVIAR MENSAJE
            </button>
          </form>

          <div className="mt-12 text-center space-y-4">
            <p className="text-gray-400">
              <span className="text-[#D8F100] font-bold">Email:</span> info@vitalpro.com
            </p>
            <p className="text-gray-400">
              <span className="text-[#D8F100] font-bold">Teléfono:</span> +1 (555) 123-4567
            </p>
            <p className="text-gray-400">
              <span className="text-[#D8F100] font-bold">WhatsApp:</span> +1 (555) 987-6543
            </p>
          </div>
        </div>
      </section>

      {showPurchaseModal && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-black border-2 border-[#D8F100]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-brand text-4xl text-[#D8F100]">COMPRAR PRODUCTO</h2>
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="text-gray-400 hover:text-white transition-colors text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="font-brand text-3xl text-white mb-2">{selectedProduct.name.toUpperCase()}</h3>
                <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
                <div className="font-brand text-5xl text-[#D8F100] mb-6">${selectedProduct.price}</div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-white mb-2 font-bold">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
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
                  onClick={(e) => {
                    e.preventDefault();
                    alert('¡Pedido realizado con éxito! Te contactaremos pronto para confirmar tu compra.');
                    setShowPurchaseModal(false);
                  }}
                  className="w-full bg-[#D8F100] text-black px-8 py-4 font-brand text-xl tracking-wide hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 font-bold"
                >
                  CONFIRMAR COMPRA
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/vital_pro.png"
              alt="VitalPro"
              className="h-[62px] w-auto"
            />
          </div>
          <p className="font-brand text-xl text-[#D8F100] mb-4 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            BE FIT FEEL FIT
          </p>
          <p className="text-gray-400 text-sm mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            © 2026 VitalPro. Suplementos de alto rendimiento.
          </p>
          <div className="flex justify-center gap-8 text-gray-400 text-sm">
            <a href="#products" className="hover:text-[#D8F100] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Productos</a>
            <a href="#about" className="hover:text-[#D8F100] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Nosotros</a>
            <a href="#contact" className="hover:text-[#D8F100] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Contacto</a>
          </div>
        </div>
      </footer>

      <ChatBot products={products} onProductSelect={handlePurchase} />
    </div>
  );
}

export default App;
