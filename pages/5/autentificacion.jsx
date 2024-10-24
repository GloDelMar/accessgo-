import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { verifyUserCode, sendVerificationCode, updateVerificationStatus } from '../api/api_verification';

const View5 = () => {
  const router = useRouter();
  const [code, setCode] = useState(""); // Estado para el código de verificación
  const [error, setError] = useState(""); // Estado para manejar errores
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    };
  }, [timer]);

  const handleSendAgain = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
      await sendVerificationCode(userId);
      setCanResend(false);

      // Iniciar el temporizador de reenvío
      const countdown = setTimeout(() => {
        setCanResend(true);
      }, 3600000); // 1 hora en milisegundos

      setTimer(countdown); // Almacenar el temporizador para limpiar más tarde
    } catch (error) {
      console.error('Error al enviar el código de verificación:', error);
      setError('Error al enviar el código. Inténtalo de nuevo.');
    }
  };

  const handleVerification = async () => {
    if (code.length !== 6) {
      setError('El código debe tener 6 caracteres.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
      const userType = localStorage.getItem('tipoUsuario'); // Obtener tipo de usuario de localStorage
      setLoading(true); // Activar el estado de carga

      // Comprobar si userId es nulo o indefinido
      if (!userId) {
        throw new Error('userId no está disponible en localStorage');
      }

      // Mover el console.log aquí
      console.log('Verificando código con los siguientes datos:', { userId, code });

      // Verificar el código pasando userId y código
      const isVerified = await verifyUserCode(userId, code);

      if (isVerified) {
        await updateVerificationStatus(userId);
        handleRedirect(userType); // Redirigir según tipo de usuario
      } else {
        setError('Código de verificación inválido o expirado.');
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      setError('Error al verificar el código. Inténtalo de nuevo.');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  const handleRedirect = (userType) => {
    if (userType === 'company') {
      router.push('/formularioAccesibilidad');
    } else if (userType === 'user') {
      router.push('/6/datosUsuario');
    } else {
      console.log("Tipo de usuario no definido.");
    }

    localStorage.removeItem('tipoUsuario'); // Corregido el nombre
  };

  return (
    <div className='max-w-md w-full mx-auto'>
      <h1 className='text-center text-2xl text-[#2F4F4F] p-10 font-extrabold'>
        ¡Revisa tu correo o tu WhatsApp!
      </h1>
      <h3 className='text-center text-[#2F4F4F] p-1 font-extrabold'>
        Te hemos enviado un código de verificación. A continuación, escribe el código que te enviamos para validar tu cuenta.
      </h3>

      <div className='text-center flex justify-center p-10'>
        <div>
          <a className='text-center flex justify-center text-[#2F4F4F] p-1 font-bold'>
            Confirma Tu Código
          </a>
          <input
            type='text'
            name='code'
            value={code}
            onChange={(e) => setCode(e.target.value)} // Actualizar estado con el código ingresado
            placeholder='555-555'
            className='px-10 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]'
          />
        </div>
      </div>

      <div className='flex justify-center items-center py-5'>
        <button
          onClick={handleVerification} // Llamar función de verificación
          disabled={loading} // Deshabilitar el botón si está en carga
          className='px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
        >
          {loading ? 'Verificando...' : 'Confirmar'}
        </button>
      </div>
      <div className="flex flex-col items-center mt-5 ">
        {/* Mostrar el botón de enviar de nuevo */}
        <button onClick={handleSendAgain} disabled={!canResend} className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          {canResend ? 'Reenviar código' : 'Esperar 1:00'} {/* Cambia esto por un contador si deseas */}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>} {/* Mostrar errores */}
      </div>
    </div>
  );
};

export default View5;
