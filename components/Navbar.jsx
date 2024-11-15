import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const menuRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleChangeDatos = () => {
    const userType = localStorage.getItem('tipoUsuario');
    console.log("Tipo de usuario detectado en Navbar:", userType);
    if (userType === 'company') {
      router.push('/23/view23');
    } else {
      router.push('/6/datosUsuario');
    }
  };

  const handleChangePerfil = () => {
    const userType = localStorage.getItem('tipoUsuario');
    console.log("Tipo de usuario detectado en Navbar:", userType);
    if (userType === 'company') {
      router.push('/21/view21');
    } else {
      router.push('/7/perfilUsuario');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("userId");
    localStorage.removeItem("cuenta");
    localStorage.removeItem("type");
    setIsLoggedIn(false);
    closeMenu();
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const tokenCheckInterval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken && !isLoggedIn) {
        setIsLoggedIn(true);
      } else if (!currentToken && isLoggedIn) {
        setIsLoggedIn(false);
      }
    }, 500);

    return () => clearInterval(tokenCheckInterval);
  }, [isLoggedIn]);

  return (
    <header className="bg-white border-b shadow-md p-2">
      <nav className="flex items-center justify-between">
        <div className="ml-[30px] md:ml-[40px] flex-shrink-0 flex items-center space-x-2">
          <Link href="/" className="sm:block md:hidden text-xl font-bold hover:underline">
            <img src="/Union.svg" alt="Logo AccessGo simplificado" />
          </Link>
          <Link href="/" className="hidden md:block text-xl font-bold hover:underline">
            <img src="/logo2.svg" alt="Logo AccessGo" />
          </Link>
        </div>

        <div className="flex items-center space-x-4 mr-[30px] md:mr-[40px]">
          {!isLoggedIn && router.pathname !== '/login' && (
            <Link href="/login" className="hidden font-bold lg:block bg-white border-black border-2 hover:bg-[#2F4F4F] text-[#2F4F4F] hover:text-white px-4 py-2 rounded-l-full rounded-r-full">
              Inicia Sesión
            </Link>
          )}

          {!isLoggedIn && router.pathname !== '/signup' && (
            <Link href="/signup" className="bg-[#2F4F4F] font-bold hover:bg-[#4A6969] text-white px-4 py-2 rounded-l-full rounded-r-full flex items-center space-x-2 w-[117px]">
              <img src="/heart_plus_24dp_5F6368_FILL1_wght400_GRAD0_opsz24 (1) 1.svg" alt="heart with plus" className="w-6 h-6" />
              <span>¡Únete!</span>
            </Link>
          )}

          <div className="relative z-10">
            <button
              onClick={toggleMenu}
              className="bg-[#ECEFF1] hover:bg-[#B0BEC5] text-white p-2 rounded"
            >
              <img src="/menu.svg" alt="menú desplegable" />
            </button>

            {menuVisible && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg">
                {!isLoggedIn && (
                  <Link href="/login" className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>
                    Iniciar Sesión
                  </Link>
                )}
                {isLoggedIn && (
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleChangeDatos}>
                    Editar datos
                  </Link>
                )}
                {isLoggedIn && (
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleChangePerfil}>
                    Ir a mi perfil
                  </Link>
                )}
                <Link href="/" className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>
                  Ir a inicio
                </Link>
                <Link href="/socios" className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>
                  Realizar una búsqueda
                </Link>
                <Link href="/voluntariado" className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>
                  Ser Voluntario
                </Link>
                <Link href="/donaciones" className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>
                  Donar a la página
                </Link>
                {isLoggedIn && (
                  <Link href="/" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
                    Cerrar Sesión
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
