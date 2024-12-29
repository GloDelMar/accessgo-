import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Asegúrate de importar useRouter
import { sendVerificationCode } from './api/api_verification';
import 'react-toastify/dist/ReactToastify.css';

const OlvidoContraseña = () => {
  const [email, setEmail] = useState('');
  const router = useRouter(); // Inicializa router

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await sendVerificationCode(email);
  
      console.log('Respuesta completa del backend:', response); // Para depurar la respuesta completa
  
      if (response && response.success) {
        console.log('Código de verificación enviado exitosamente.');
        window.localStorage.setItem('recuperacion', email);
        router.push('/autentificacion');
      } else {
        console.error('Error en la respuesta:', response?.message || 'Respuesta inesperada');
        // Manejo de errores cuando el campo `message` no está disponible
      }
    } catch (error) {
      console.error('Error al enviar el código de verificación:', error.message);
    }
  };
  

  return (
    <div className="max-w-md w-full mx-auto">
      <h1 className="text-center text-2xl text-[#2F4F4F] p-10 font-extrabold">
        ¿Olvidaste tu contraseña?
      </h1>
      <h3 className="text-center text-[#2F4F4F] p-1 font-extrabold">
        Escribe el Correo Electrónico que usaste para registrarte y te enviaremos un código de verificación.
      </h3>
      <div className="text-center mt-4 flex justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
              className="w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
            />
          </div>
          <div className="flex justify-center items-center mt-5 py-5">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OlvidoContraseña;
