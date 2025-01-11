import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getUserById } from '@/pages/api/api_getById';
import { getCompanyById } from '@/pages/api/api_company';
import { sendVerificationCode } from '@/pages/api/api_verification';

const Navbar = () => {
  const router = useRouter();
  const menuRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userType = typeof window !== 'undefined' ? localStorage.getItem('tipoUsuario') : null;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleChangeDatos = () => {
    const userType = localStorage.getItem('tipoUsuario');

    if (userType === 'company') {
      router.push('/datos-negocio1'); 
    } else {
      router.push('/datos-de-usuario');
    }
  };
 const handleChangeAccesibilidad = ()=>{
  router.push('/formulario-de-accesibilidad');
 }

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const user = localStorage.getItem('tipoUsuario'); // "user" o "company"

    // Determina el tipo de usuario
    const userType = user === 'user' ? 'recuperaUser' : 'recuperaCompany';

    // Almacena el tipo de usuario actualizado en localStorage
    localStorage.setItem('tipoUsuario', userType);

    const userId = localStorage.getItem('userId'); // ID del usuario o la compañía

    try {
      // Llama a la función adecuada dependiendo del tipo de usuario
      const data = userType === 'recuperaUser'
        ? await getUserById(userId)
        : await getCompanyById(userId);

      // Obtiene el email correcto según el tipo de usuario
      const email = userType === 'recuperaUser'
        ? data.data.user.email
        : data.data.company.email;

      await sendVerificationCode(email)
      // Guarda el email en el localStorage para recuperación
      localStorage.setItem('recuperacion', email);

      // Redirige a la página de autenticación
      router.push('/autentificacion');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };

  const handleChangePerfil = async () => {
    const userType = localStorage.getItem('tipoUsuario');
  
    if (userType === 'company') {
      const userId = localStorage.getItem("userId");
  
      try {
        const Data = await getCompanyById(userId);
  
        console.log("data", Data);
        const cuentaUsuario = Data.data.company.cuenta;
        console.log("cuenta de compañia", cuentaUsuario);
  
        if (cuentaUsuario === 'free') {
          router.push('/sesion-base');
        } else if (cuentaUsuario === 'premium') {
          router.push('/sesion-prem');
        } else {
          console.error('Tipo de cuenta no reconocido.');
        }
      } catch (error) {
        console.error("Error al obtener los datos de la compañía:", error);
      }
    } else {
      router.push('/mi-perfil');
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
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
      setIsLoggedIn(!!currentToken);
    }, 500);

    return () => clearInterval(tokenCheckInterval);
  }, []);

  return (
    <header className="bg-white border-b shadow-md p-2">
      <nav className="flex items-center justify-between">
        <div className="ml-[30px] md:ml-[40px] flex-shrink-0 flex items-center space-x-2">
          <Link href="/">
            <img src="/Union.svg" alt="Logo AccessGo simplificado" className="sm:block md:hidden" />
          </Link>
          <Link href="/">
            <img src="/logo2.svg" alt="Logo AccessGo" className="hidden md:block" />
          </Link>
        </div>

        <div className="flex items-center space-x-4 mr-[30px] md:mr-[40px]">
          {!isLoggedIn && router.pathname !== '/login' && (
            <Link href="/login" className="hidden lg:block bg-white border-black border-2 px-4 py-2 rounded-full text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white font-bold">
              Inicia Sesión
            </Link>
          )}

          {!isLoggedIn && router.pathname !== '/signup' && (
            <Link href="/signup" className="bg-[#2F4F4F] px-4 py-2 rounded-full text-white hover:bg-[#4A6969] font-bold flex items-center">
              <img src="/heart_plus_24dp_5F6368_FILL1_wght400_GRAD0_opsz24 (1) 1.svg" alt="Únete" className="w-6 h-6" />
              <span>¡Únete!</span>
            </Link>
          )}

          <div className="relative z-10">
            <button
              onClick={toggleMenu}
              className="bg-[#ECEFF1] hover:bg-[#B0BEC5] text-white p-2 rounded"
            >
              <img src="/menu.svg" alt="Menú desplegable" />
            </button>

            {menuVisible && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg">
                {!isLoggedIn && (
                  <Link href="/login" className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>
                    Iniciar Sesión
                  </Link>
                )}
                <Link href="/" className="block px-4 py-2 hover:bg-gray-100" onClick={closeMenu}>
                  Ir a inicio
                </Link>
               
                
                {isLoggedIn && (
                  <>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleChangeDatos}>
                      Editar datos
                    </Link>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleChangePerfil}>
                      Ir a mi perfil
                    </Link>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleChangePassword}>
                      Cambiar contraseña
                    </Link>
                    {userType === "company" && (
                      <Link
                        href="/formulario-de-accesibilidad"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          localStorage.setItem("accesibilidad", "actualización");
                          closeMenu();
                        }}
                      >
                        Modificar datos sobre accesibilidad
                      </Link>
                    )}

                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
                      Cerrar Sesión
                    </Link>
                  </>
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
