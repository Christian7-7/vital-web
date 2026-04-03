import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Product } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  products?: Product[];
}

interface ChatBotProps {
  products: Product[];
  onProductSelect?: (product: Product) => void;
}

export function ChatBot({ products, onProductSelect }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<'initial' | 'asked_goal' | 'asked_activity' | 'asked_needs' | 'recommended'>('initial');
  const [userProfile, setUserProfile] = useState<{
    goal?: string;
    activity?: string;
    needs?: string;
  }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendBotMessage('¡Hola! Soy VP, tu asistente de suplementación. Estoy aquí para ayudarte a encontrar el suplemento perfecto para tus objetivos. ¿Cuál es tu meta principal?', [
        '🏋️ Aumentar masa muscular',
        '⚡ Mejorar rendimiento',
        '🔥 Perder peso',
        '💤 Recuperación muscular',
        '🧘 Bienestar general'
      ]);
      setConversationState('asked_goal');
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendBotMessage = (text: string, suggestions?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);

      if (suggestions) {
        setTimeout(() => {
          const suggestionMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: '__SUGGESTIONS__',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, suggestionMessage]);
        }, 300);
      }
    }, 800);
  };

  const sendUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    handleConversationFlow(text);
  };

  const handleConversationFlow = (userInput: string) => {
    if (conversationState === 'asked_goal') {
      setUserProfile(prev => ({ ...prev, goal: userInput }));
      setConversationState('asked_activity');
      sendBotMessage('Perfecto. ¿Qué tipo de actividad física realizas habitualmente?', [
        '🏋️ Entrenamiento con pesas',
        '🏃 Running/Cardio',
        '🤸 CrossFit/Funcional',
        '🧘 Yoga/Pilates',
        '⚽ Deportes de equipo',
        '🚶 Actividad ligera'
      ]);
    } else if (conversationState === 'asked_activity') {
      setUserProfile(prev => ({ ...prev, activity: userInput }));
      setConversationState('asked_needs');
      sendBotMessage('Excelente. ¿Qué necesidades específicas tienes en este momento?', [
        '💪 Más energía para entrenar',
        '😴 Mejor descanso y recuperación',
        '🔥 Acelerar el metabolismo',
        '🎯 Aumentar fuerza',
        '🛡️ Proteger articulaciones',
        '🍽️ Controlar el apetito'
      ]);
    } else if (conversationState === 'asked_needs') {
      setUserProfile(prev => ({ ...prev, needs: userInput }));
      setConversationState('recommended');
      analyzeAndRecommend(userProfile.goal || '', userProfile.activity || '', userInput);
    }
  };

  const analyzeAndRecommend = (goal: string, _activity: string, needs: string) => {
    const lowerGoal = goal.toLowerCase();
    const lowerNeeds = needs.toLowerCase();
    let recommendedProducts: Product[] = [];

    if (lowerGoal.includes('masa muscular') || lowerGoal.includes('aumentar')) {
      recommendedProducts = products.filter(p =>
        p.category === 'performance' && (
          p.name.toLowerCase().includes('protein') ||
          p.name.toLowerCase().includes('muscle') ||
          p.name.toLowerCase().includes('whey') ||
          p.name.toLowerCase().includes('creatine')
        )
      );
    } else if (lowerGoal.includes('rendimiento') || lowerGoal.includes('mejorar')) {
      recommendedProducts = products.filter(p =>
        p.category === 'performance' && (
          p.name.toLowerCase().includes('energy') ||
          p.name.toLowerCase().includes('pre-workout') ||
          p.name.toLowerCase().includes('boost') ||
          p.name.toLowerCase().includes('ignite')
        )
      );
    } else if (lowerGoal.includes('peso') || lowerGoal.includes('perder')) {
      recommendedProducts = products.filter(p =>
        p.category === 'weight-control'
      );
    } else if (lowerGoal.includes('recuperación') || lowerGoal.includes('recuperacion')) {
      recommendedProducts = products.filter(p =>
        p.category === 'recovery'
      );
    }

    if (lowerNeeds.includes('energía') || lowerNeeds.includes('energia')) {
      const energyProducts = products.filter(p =>
        p.name.toLowerCase().includes('energy') ||
        p.name.toLowerCase().includes('pre-workout') ||
        p.name.toLowerCase().includes('boost')
      );
      recommendedProducts = [...recommendedProducts, ...energyProducts];
    }

    if (lowerNeeds.includes('descanso') || lowerNeeds.includes('recuperación') || lowerNeeds.includes('recuperacion')) {
      const recoveryProducts = products.filter(p =>
        p.category === 'recovery' ||
        p.name.toLowerCase().includes('sleep') ||
        p.name.toLowerCase().includes('recovery') ||
        p.name.toLowerCase().includes('bcaa')
      );
      recommendedProducts = [...recommendedProducts, ...recoveryProducts];
    }

    if (lowerNeeds.includes('metabolismo') || lowerNeeds.includes('acelerar')) {
      const metabolicProducts = products.filter(p =>
        p.name.toLowerCase().includes('metabolic') ||
        p.name.toLowerCase().includes('fat') ||
        p.name.toLowerCase().includes('burner')
      );
      recommendedProducts = [...recommendedProducts, ...metabolicProducts];
    }

    if (lowerNeeds.includes('fuerza') || lowerNeeds.includes('aumentar')) {
      const strengthProducts = products.filter(p =>
        p.name.toLowerCase().includes('creatine') ||
        p.name.toLowerCase().includes('power') ||
        p.name.toLowerCase().includes('strength')
      );
      recommendedProducts = [...recommendedProducts, ...strengthProducts];
    }

    if (lowerNeeds.includes('articulaciones') || lowerNeeds.includes('proteger')) {
      const jointProducts = products.filter(p =>
        p.name.toLowerCase().includes('joint') ||
        p.name.toLowerCase().includes('articular')
      );
      recommendedProducts = [...recommendedProducts, ...jointProducts];
    }

    if (lowerNeeds.includes('apetito') || lowerNeeds.includes('controlar')) {
      const appetiteProducts = products.filter(p =>
        p.name.toLowerCase().includes('appetite') ||
        p.name.toLowerCase().includes('control') ||
        p.name.toLowerCase().includes('carb')
      );
      recommendedProducts = [...recommendedProducts, ...appetiteProducts];
    }

    const uniqueProducts = Array.from(new Set(recommendedProducts.map(p => p.id)))
      .map(id => recommendedProducts.find(p => p.id === id)!)
      .slice(0, 3);

    if (uniqueProducts.length > 0) {
      setIsTyping(true);
      setTimeout(() => {
        const recommendationMessage: Message = {
          id: Date.now().toString(),
          text: `Basándome en tu perfil, te recomiendo estos suplementos de nuestra línea VitalPro:`,
          sender: 'bot',
          timestamp: new Date(),
          products: uniqueProducts,
        };
        setMessages(prev => [...prev, recommendationMessage]);
        setIsTyping(false);

        setTimeout(() => {
          sendBotMessage('¿Te gustaría saber más sobre alguno de estos productos o necesitas otra recomendación?', [
            '🔄 Hacer otra consulta',
            '📋 Ver todos los productos'
          ]);
        }, 500);
      }, 1000);
    } else {
      sendBotMessage('Lo siento, no encontré productos específicos que coincidan exactamente con tus necesidades en nuestra base de datos actual. Te sugiero revisar nuestro catálogo completo para encontrar la mejor opción.', [
        '📋 Ver todos los productos',
        '🔄 Hacer otra consulta'
      ]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendUserMessage(suggestion);
  };

  const handleReset = () => {
    setMessages([]);
    setConversationState('initial');
    setUserProfile({});
    setTimeout(() => {
      sendBotMessage('¡Hola! Soy VP, tu asistente de suplementación. Estoy aquí para ayudarte a encontrar el suplemento perfecto para tus objetivos. ¿Cuál es tu meta principal?', [
        '🏋️ Aumentar masa muscular',
        '⚡ Mejorar rendimiento',
        '🔥 Perder peso',
        '💤 Recuperación muscular',
        '🧘 Bienestar general'
      ]);
      setConversationState('asked_goal');
    }, 500);
  };

  const renderMessage = (message: Message) => {
    if (message.text === '__SUGGESTIONS__') {
      const prevMessage = messages[messages.indexOf(message) - 1];
      if (!prevMessage) return null;

      let suggestions: string[] = [];
      if (conversationState === 'asked_goal') {
        suggestions = ['🏋️ Aumentar masa muscular', '⚡ Mejorar rendimiento', '🔥 Perder peso', '💤 Recuperación muscular', '🧘 Bienestar general'];
      } else if (conversationState === 'asked_activity') {
        suggestions = ['🏋️ Entrenamiento con pesas', '🏃 Running/Cardio', '🤸 CrossFit/Funcional', '🧘 Yoga/Pilates', '⚽ Deportes de equipo', '🚶 Actividad ligera'];
      } else if (conversationState === 'asked_needs') {
        suggestions = ['💪 Más energía para entrenar', '😴 Mejor descanso y recuperación', '🔥 Acelerar el metabolismo', '🎯 Aumentar fuerza', '🛡️ Proteger articulaciones', '🍽️ Controlar el apetito'];
      } else if (conversationState === 'recommended') {
        suggestions = ['🔄 Hacer otra consulta', '📋 Ver todos los productos'];
      }

      return (
        <div className="flex gap-2 flex-wrap mb-4">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (suggestion.includes('otra consulta')) {
                  handleReset();
                } else if (suggestion.includes('todos los productos')) {
                  window.location.hash = '#products';
                  setIsOpen(false);
                } else {
                  handleSuggestionClick(suggestion);
                }
              }}
              className="bg-[#141414] border border-[#D8F100]/30 text-white px-4 py-2 rounded-lg text-sm hover:bg-[#D8F100]/10 hover:border-[#D8F100] transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      );
    }

    if (message.sender === 'bot') {
      return (
        <div className="flex gap-3 mb-4">
          <img
            src="/VP_Chat_logo.png"
            alt="VP"
            className="w-10 h-10 flex-shrink-0 object-contain"
          />
          <div className="flex-1">
            <div className="bg-[#141414] text-white rounded-2xl rounded-tl-none px-4 py-3 inline-block max-w-[80%]">
              {message.text}
            </div>
            {message.products && message.products.length > 0 && (
              <div className="mt-3 space-y-3">
                {message.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#0a0a0a] border border-[#D8F100]/30 rounded-xl p-4 hover:border-[#D8F100] transition-all cursor-pointer"
                    onClick={() => {
                      if (onProductSelect) {
                        onProductSelect(product);
                        setIsOpen(false);
                      }
                    }}
                  >
                    <div className="flex gap-3">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-brand text-lg text-[#D8F100] mb-1">{product.name}</h4>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-brand text-2xl text-white">${product.price}</span>
                          <span className="text-[#D8F100] text-xs">Click para comprar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-end mb-4">
          <div className="bg-[#D8F100] text-black rounded-2xl rounded-tr-none px-4 py-3 inline-block max-w-[80%]">
            {message.text}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-black px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#D8F100]"
          aria-label="Abrir chat"
        >
          <img
            src="/VP_Chat_logo.png"
            alt="Chat IA"
            className="w-12 h-12 object-contain"
          />
          <span className="text-[#D8F100] font-bold text-lg whitespace-nowrap pr-2">
            Deja que la IA suplemente tu pasión
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] bg-[#0a0a0a] border-2 border-[#D8F100]/30 rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#141414] border-b border-[#D8F100]/30 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/VP_Chat_logo.png"
                alt="VP Chat"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-brand text-[#D8F100] text-xl">VP ASSISTANT</h3>
                <p className="text-gray-400 text-xs">Tu experto en suplementación</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message) => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 mb-4">
                <img
                  src="/VP_Chat_logo.png"
                  alt="VP"
                  className="w-10 h-10 flex-shrink-0 object-contain"
                />
                <div className="bg-[#141414] text-white rounded-2xl rounded-tl-none px-4 py-3 inline-block">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#D8F100] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-[#D8F100] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-[#D8F100] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[#D8F100]/30 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputValue.trim()) {
                  sendUserMessage(inputValue.trim());
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-[#141414] text-white border border-[#D8F100]/30 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D8F100] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-[#D8F100] text-black p-3 rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
