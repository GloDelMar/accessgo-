import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deleteUser, getUserById } from '@/pages/api/api_getById';
import { deleteCompany, getCompanyById } from '@/pages/api/api_company';
import { sendVerificationCode } from '@/pages/api/api_verification';
import Image from 'next/image';
import ConfirmationModal from './Modals/ConfirmationModal';
import { House, User, Lock, Trash2, LogOut, Settings } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const menuRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});


  const userType = typeof window !== 'undefined' ? localStorage.getItem('tipoUsuario') : null;

  // Modal para cerrar sesión
  const handleOpenLogoutModal = () => {
    setModalConfig({
      title: "Confirmar Cierre de Sesión",
      message: "¿Estás seguro de que deseas cerrar tu sesión?",
      confirmText: "Sí, Cerrar",
      finalTitle: "¿Seguro que deseas cerrar sesión?",
      finalMessage: "Presiona 'Confirmar Cierre' para salir.",
      finalConfirmText: "Confirmar Cierre",
      onConfirm: () => {
        handleLogout();
        setTimeout(() => setShowModal(false), 200);
      },
    });
    setShowModal(true);
  };

  // Modal para eliminar la cuenta
  const handleOpenDeleteAccountModal = () => {
    setModalConfig({
      title: "Eliminar Cuenta",
      message: "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
      confirmText: "Eliminar Cuenta",
      finalTitle: "¿Seguro que desea eliminar su cuenta?",
      finalMessage: "Presiona 'Confirmar Eliminación' para eliminar tu cuenta permanentemente.",
      finalConfirmText: "Confirmar Eliminación",
      onConfirm: () => {
        handleDeleteAccount();
        setTimeout(() => setShowModal(false), 200);
      },
    });
    setShowModal(true);
  };

  // Función para eliminar cuenta (ya sea de usuario o empresa)
  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const userType = localStorage.getItem("tipoUsuario");

      if (!userId) {
        throw new Error("No se encontró el ID del usuario.");
      }

      if (userType === "user") {
        await deleteUser(userId);
      } else if (userType === "company") {
        await deleteCompany(userId);
      }

      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.error("Error eliminando la cuenta:", error);
    }
  };


  const toggleMenu = () => setMenuVisible(!menuVisible);

  const closeMenu = () => setMenuVisible(false);

  const handleChangeDatos = () => {
    const userType = localStorage.getItem('tipoUsuario');

    if (userType === 'company') {
      router.push('/datos-negocio1');
    } else {
      router.push('/datos-de-usuario');
    }
  };
  const handleChangeAccesibilidad = () => router.push('/formulario-de-accesibilidad');

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
            <Image
              src="/Union.svg"
              alt="Logo AccessGo simplificado"
              className="sm:block md:hidden w-[50px] h-[50px]"
              width={40}
              height={40}
              priority={true}
            />

          </Link>
          <Link href="/" className="relative w-[80px] h-[50px] md:w-[100px] md:h-[50px]">
            <Image
              src="/logo2.svg"
              alt="Logo AccessGo"
              fill
              sizes="(max-width: 768px) 80px, 100px"
              priority={true}
              className="object-contain hidden md:block"
            />
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
              <Image
                src="/heart_plus_24dp_5F6368_FILL1_wght400_GRAD0_opsz24 (1) 1.svg"
                alt="Únete"
                className="w-6 h-6"
                width={24} // Ajusta el tamaño en píxeles
                height={24} />
              <span>¡Únete!</span>
            </Link>
          )}

          <div className="relative z-10">
            <button
              onClick={toggleMenu}
              className="bg-[#ECEFF1] hover:bg-[#B0BEC5] text-white p-2 rounded"
            >
              <Image
                src="/menu.svg"
                alt="Menú desplegable"
                width={24} // Ajusta el tamaño en píxeles
                height={24} />
            </button>

            {menuVisible && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg"
              >
                <div className="py-2">
                  {!isLoggedIn && (
                    <>
                      <Link
                        href="/"
                        className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={closeMenu}
                      >
                        <House className="mr-3 h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium">Ir a Inicio</span>
                      </Link>
                      <Link
                        href="/login"
                        className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                      >
                        <LogOut className="mr-3 h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium">Iniciar Sesión</span>
                      </Link>
                    </>
                  )}

                  {isLoggedIn && (
                    <>
                      <Link
                        href="#"
                        className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={handleChangeDatos}
                      >
                        <Settings className="mr-3 h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium">Editar Datos</span>
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={handleChangePerfil}
                      >
                        <User className="mr-3 h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium">Ir a mi Perfil</span>
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={handleChangePassword}
                      >
                        <Lock className="mr-3 h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium">Cambiar Contraseña</span>
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center px-5 py-3 text-red-600 hover:bg-red-50 transition-all"
                        onClick={handleOpenDeleteAccountModal}
                      >
                        <Trash2 className="mr-3 h-5 w-5 text-red-600" />
                        <span className="text-sm font-medium">Eliminar Cuenta</span>
                      </Link>

                      {userType === "company" && (
                        <Link
                          href="/formulario-de-accesibilidad"
                          className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                          onClick={() => {
                            localStorage.setItem("accesibilidad", "actualización");
                            closeMenu();
                          }}
                        >
                          <Settings className="mr-3 h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium">Modificar Accesibilidad</span>
                        </Link>
                      )}

                      <div className="border-t border-gray-200 my-2"></div>

                      <Link
                        href="#"
                        className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={handleOpenLogoutModal}
                      >
                        <LogOut className="mr-3 h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium">Cerrar Sesión</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </nav>
      <ConfirmationModal
        isOpen={showModal}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        finalTitle={modalConfig.finalTitle}
        finalMessage={modalConfig.finalMessage}
        finalConfirmText={modalConfig.finalConfirmText}
        cancelText="Cancelar"
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setShowModal(false)}
      />
    </header>
  );
};

export default Navbar;
