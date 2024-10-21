import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input } from "@/components/Molecules/FormStyles";
import { createAccount } from "../api/api_register";
import { sendVerificationCode } from "../api/api_verification";
import Modal from "@/components/Modal"; // Asegúrate de tener un componente Modal o crearlo

const View4 = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [resendVerificationVisible, setResendVerificationVisible] = useState(false);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('tipoUsuario');
    if (usuarioGuardado) {
      setTipoUsuario(usuarioGuardado);
    }
  }, []);

  const type = tipoUsuario;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await createAccount(email, password, type);
      console.log(response);
      if (response.success) {
        // Guardar el _id del usuario en localStorage
        localStorage.setItem('userId', response.data.register._id); // Asegúrate de que 'data._id' sea la ruta correcta para acceder al ID.

        // Si la cuenta se creó exitosamente, enviar el código de verificación
        await sendVerificationCode(email);
        router.push('/5/autentificacion');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Si el correo ya está registrado
        if (response.message.includes("ya está registrado")) {
          setModalMessage('El correo que estás ingresando ya está registrado en una cuenta AccessGo');
          setResendVerificationVisible(false);
        } else {
          // Mensaje para correos no verificados
          setModalMessage('Tu correo ya está registrado, pero no ha sido verificado. ¿Quieres que se te reenvíe el código de verificación?');
          setResendVerificationVisible(true);
        }
        setModalVisible(true); // Muestra el modal
      }
    } catch (error) {
      console.error('Error al crear cuenta o enviar código:', error);
      setError(`Error al crear cuenta o enviar código: ${error.message}. Inténtalo de nuevo.`);
    }
  };

  return (
    <>
      <div>
        <h1 className='text-center text-[#2F4F4F] text-2xl p-10 font-bold'>
          Bienvenid@ a AccessGo
        </h1>

        <div className='text-center flex justify-center '>
          <Form onSubmit={handleSubmit}>
            <div>
              <Input
                type='text'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Correo Electrónico o WhatsApp'
                className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
              />
            </div>

            <div className="relative">
              <Input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Contraseña'
                className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
              />
              <span
                onClick={() => {
                  const input = document.getElementsByName('password')[0];
                  input.type = input.type === 'password' ? 'text' : 'password';
                }}
                className="absolute right-3 top-3 text-[#546E7A] hover:underline hover:cursor-pointer text-xs md:text-sm"
              >
                Mostrar
              </span>
            </div>

            <div className="relative">
              <Input
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirma Contraseña'
                className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
              />
              <span
                onClick={() => {
                  const input = document.getElementsByName('confirmPassword')[0];
                  input.type = input.type === 'password' ? 'text' : 'password';
                }}
                className="absolute right-3 top-3 text-[#546E7A] hover:underline hover:cursor-pointer text-xs md:text-sm"
              >
                Mostrar
              </span>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              className='px-6 py-2 mt-4 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
            >
              Registrarse
            </button>
          </Form>
        </div>
      </div>

      {/* Modal para mostrar mensajes */}
      {modalVisible && (
        <Modal onClose={() => setModalVisible(false)}>
          <p>{modalMessage}</p>
          {resendVerificationVisible && (
            <button
              onClick={handleResendVerification}
              className='px-4 py-2 mt-4 bg-[#2F4F4F] text-white rounded-md hover:bg-[#004D40]'
            >
              Enviar código
            </button>
          )}
        </Modal>
      )}
    </>
  );
};

export default View4;