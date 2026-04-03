import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  const sports = [
    { name: 'Atletismo', slug: 'atletismo' },
    { name: 'Calistenia', slug: 'calistenia' },
    { name: 'Ciclismo', slug: 'ciclismo' },
    { name: 'Crossfit', slug: 'crossfit' },
    { name: 'Fútbol', slug: 'futbol' },
    { name: 'GYM', slug: 'gym' },
    { name: 'Volleyball', slug: 'volleyball' },
    { name: 'Yoga', slug: 'yoga' }
  ];

  const openDropdown = useCallback(() => setIsDropdownOpen(true), []);
  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropdown]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDropdown();
      buttonRef.current?.focus();
    } else if (event.key === 'ArrowDown' && isDropdownOpen) {
      event.preventDefault();
      firstItemRef.current?.focus();
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      openDropdown();
      setTimeout(() => firstItemRef.current?.focus(), 0);
    }
  };

  const handleItemKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextItem = dropdownRef.current?.querySelectorAll('a')[index + 1];
      (nextItem as HTMLElement)?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (index === 0) {
        buttonRef.current?.focus();
      } else {
        const prevItem = dropdownRef.current?.querySelectorAll('a')[index - 1];
        (prevItem as HTMLElement)?.focus();
      }
    } else if (event.key === 'Escape') {
      closeDropdown();
      buttonRef.current?.focus();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed top-[90px] left-0 right-0 z-40 bg-black border-b-[6px] border-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-6 md:gap-8 py-3 flex-wrap">
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            onKeyDown={handleKeyDown}
          >
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              onKeyDown={handleButtonKeyDown}
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              className="flex items-center gap-2 text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm md:text-base tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              Suplementa tu pasión
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} style={{ transitionDuration: '100ms' }} />
            </button>

            <div
              role="menu"
              className={`absolute top-full left-0 mt-1 bg-black border border-[#D8F100]/20 shadow-2xl min-w-[220px] transition-all ${
                isDropdownOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '100ms',
                transitionTimingFunction: 'ease-out',
                willChange: 'opacity, transform'
              }}
            >
              {sports.map((sport, index) => (
                <a
                  key={index}
                  ref={index === 0 ? firstItemRef : null}
                  href={`#${sport.slug}`}
                  role="menuitem"
                  tabIndex={isDropdownOpen ? 0 : -1}
                  onClick={() => {
                    closeDropdown();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                  className="block px-6 py-3 text-gray-300 hover:bg-[#D8F100] hover:text-black transition-colors font-medium text-sm border-b border-gray-900 last:border-b-0 focus:outline-none focus:bg-[#D8F100] focus:text-black"
                  style={{ transitionDuration: '100ms' }}
                >
                  {sport.name}
                </a>
              ))}
            </div>
          </div>

          <a
            href="#recuperacion"
            className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm md:text-base tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            Recuperación
          </a>

          <a
            href="#control-peso"
            className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm md:text-base tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            Control de Peso
          </a>

          <a
            href="#bienestar"
            className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm md:text-base tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            Bienestar
          </a>
        </div>
      </div>
    </nav>
  );
}
