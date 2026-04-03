import { Navbar } from './Navbar';

interface HeaderProps {
  onHomeClick: () => void;
}

export function Header({ onHomeClick }: HeaderProps) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onHomeClick} className="focus:outline-none">
              <img
                src="/vital_pro.png"
                alt="VitalPro"
                className="h-[72px] w-auto cursor-pointer"
              />
            </button>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={onHomeClick}
              className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              Productos
            </button>
            <a
              href="#nosotros"
              className="text-white hover:text-[#D8F100] transition-colors font-semibold uppercase text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              Nosotros
            </a>
            <a
              href="#contact"
              className="bg-[#D8F100] text-black px-6 py-2 font-semibold uppercase text-sm tracking-wide hover:bg-white transition-all duration-300"
            >
              Contacto
            </a>
          </nav>
        </div>
      </header>
      <Navbar />
    </>
  );
}
