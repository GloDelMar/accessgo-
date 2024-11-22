import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { verifyUserCode, sendVerificationCode, updateVerificationStatus } from './api/api_verification';

const View5 = () => {
  const router = useRouter();
  const [code, setCode] = useState(""); 
  const [error, setError] = useState(""); 
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer); 
    };
  }, [timer]);

  const handleSendAgain = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
      await sendVerificationCode(userId);
      setCanResend(false);


      const countdown = setTimeout(() => {
        setCanResend(true);
      }, 3600000); 

      setTimer(countdown); 
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
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('tipoUsuario'); 
      setLoading(true); 

      if (!userId) {
        throw new Error('userId no está disponible en localStorage');
      }

   

      const isVerified = await verifyUserCode(userId, code);

      if (isVerified) {
        await updateVerificationStatus(userId);
        handleRedirect(userType); 
      } else {
        setError('Código de verificación inválido o expirado.');
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      setError('Error al verificar el código. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (userType) => {
    if (userType === 'company') {
      router.push('/formulario-de-accesibilidad');
    } else if (userType === 'user') {
      router.push('/datos-de-usuario');
    } else {
      console.log("Tipo de usuario no definido.");
    }
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
            onChange={(e) => setCode(e.target.value)} 
            placeholder='555-555'
            className='px-10 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]'
          />
        </div>
      </div>

      <div className='flex justify-center items-center py-5'>
        <button
          onClick={handleVerification} 
          disabled={loading} 
          className='px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
        >
          {loading ? 'Verificando...' : 'Confirmar'}
        </button>
      </div>
      <div className="flex flex-col items-center mt-5 ">
        <button onClick={handleSendAgain} disabled={!canResend} className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          {canResend ? 'Reenviar código' : 'Esperar 1:00'} 
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default View5;
