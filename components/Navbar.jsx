import React, { useState } from 'react'; 
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <header className="bg-white border-b shadow-md p-2">
      <nav className="flex items-center justify-between">
        <div className="ml-[30px] md:ml-[40px] flex-shrink-0 flex items-center space-x-2">
          <Link legacyBehavior href="/" >
            <a className="sm:block md:hidden text-xl font-bold hover:underline"> 
              <img src="/Union.svg" alt="Logo AccessGo simplificado" />
            </a>
          </Link>
          <span>
            <Link legacyBehavior href="/" >
              <a className="hidden md:block text-xl font-bold hover:underline">
                <img src="/logo2.svg" alt="Logo AccessGo" />
              </a>
            </Link>
          </span>
        </div>

        <div className="flex items-center space-x-4 mr-[30px] md:mr-[40px]">
          {router.pathname !== '/login' && (
            <Link legacyBehavior href="/login" >
              <a className="hidden font-bold lg:block bg-white border-black border-2 hover:bg-[#2F4F4F] text-[#2F4F4F] hover:text-white px-4 py-2 rounded rounded-l-full rounded-r-full">Inicia Sesión</a>
            </Link>
          )}

          {router.pathname !== '/signup' && (
            <Link legacyBehavior href="/signup" >
              <a className="bg-[#2F4F4F] font-bold hover:bg-[#4A6969] text-white px-4 py-2 rounded-l-full rounded-r-full flex items-center space-x-2 w-[117px]">
                <img src="/heart_plus_24dp_5F6368_FILL1_wght400_GRAD0_opsz24 (1) 1.svg" alt="heart with plus" className="w-6 h-6" />
                <span>¡Únete!</span>
              </a>
            </Link>
          )}

          <div className="relative md:hidden">
            <button 
              onClick={toggleMenu} 
              className="bg-[#ECEFF1] hover:bg-[#B0BEC5] text-white p-2 rounded"
            >
              <img src="/menu.svg" alt="menú desplegable" />
            </button>

            {menuVisible && ( 
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg">
                <Link legacyBehavior href="/login" >
                  <a className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>Iniciar Sesión</a>
                </Link>
                <Link legacyBehavior href="/voluntario11" >
                  <a className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>Ser Voluntario</a>
                </Link>
                <Link legacyBehavior href="/donacion12">
                  <a className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>Donar a la página</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
