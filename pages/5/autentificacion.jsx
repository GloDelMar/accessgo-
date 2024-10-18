
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const View5 = () => {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    // Recuperamos el tipo de usuario del localStorage
    const usuarioGuardado = localStorage.getItem('tipoUsuario');

    if (usuarioGuardado) {
      setTipoUsuario(usuarioGuardado);
    }
  }, []);

  // Función para manejar la redirección después de la verificación
  const handleRedirect = () => {
    if (tipoUsuario === 'empresa') {
      // Redirigir al formulario de accesibilidad si es una empresa
      router.push('/formularioAccesibilidad');
    } else if (tipoUsuario === 'usuario') {
      // Redirigir a la página de datos del usuario si es un usuario normal
      router.push('/6/datosUsuario');
    } else {
      console.log("Tipo de usuario no definido.");
    }
  };

  return (
    <>
      <div className='max-w-md w-full mx-auto'>
        <h1 className='text-center text-2xl text-[#2F4F4F] p-10 font-extrabold'>
          ¡Revisa tu correo o tu WhatsApp!
        </h1>
        <h3 className='text-center text-[#2F4F4F] p-1 font-extrabold'>
          Te hemos enviado un código de verificación. A continuación, escribe el código que te enviamos para validar tu cuenta.
        </h3>

        <div className='text-center flex justify-center p-10'>
          <div>
            <div>
              <a className='text-center flex justify-center text-[#2F4F4F] p-1 font-bold'>
                Confirma Tu Código
              </a>
              <input
                type='text'
                name='codigo'
                placeholder='Código de verificación'
                className='px-10 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]'

              />
            </div>
          </div>
        </div>


        {tipoUsuario === 'empresa' ? (
          <p className='text-center text-[#2F4F4F] p-5'>
            Como empresa, asegúrate de completar todos los pasos requeridos para configurar tu perfil.
          </p>
        ) : (
          <p className='text-center text-[#2F4F4F] p-5'>
            Como usuario, puedes explorar los establecimientos que hemos seleccionado para ti.
          </p>
        )}

        <div className='flex justify-center items-center py-5'>
          <button
            onClick={handleRedirect}
            className='px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
          >
            Iniciar Sesión
          </button>

        </div>
      </div>
    </>
  );
};

import React from "react";
import Link from 'next/link';


 const view5 = () => {
    return (
      <>
        <div className='max-w-md w-full mx-auto'>
          <h1 className='text-center text-2xl text-[#2F4F4F] p-10 font-bold'>
            ¡Revisa tu correo o tu WhatsApp
          </h1>
          <h3 className='text-center text-[#2F4F4F] p-10 font-bold'>
            Te hemos enviado un codigo de verificacion. A continuacion escribe
            el codigo que te enviamos para validar tu cuenta
          </h3>
          <div className='text-center flex justify-center p-40 '>
            <div>
              <div>
                <a className='text-center flex justify-center text-[#2F4F4F] p-10 font-bold'>
                  Confirma Tu Codigo
                </a>
                <input
                  type='password'
                  name='contraseña'
                  placeholder='555-555-555'
                  className='px-10 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] '
                />
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center py-5'>
            <Link legacyBehavior href='/login'>
              <button
                className='px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
              >
                Inicia Sesion
              </button>
            </Link>
          </div>
        </div>
      </>
    );
}

export default view5;
>>>>>>>>> Temporary merge branch 2
