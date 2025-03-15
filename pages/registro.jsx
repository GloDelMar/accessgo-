import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input } from "@/components/Molecules/FormStyles";
import { createAccount } from "./api/api_register";
import { sendVerificationCode } from "./api/api_verification";
import { login } from "./api/api_login";
import { toast } from "sonner";
import { createCompany } from "./api/api_company";
import { Toaster } from "sonner";

const View4 = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [type, setType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('tipoUsuario');
    if (userType) {
      setType(userType);
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      let response;

      if (type === "user") {
        response = await createAccount(email, password, type);
      } else if (type === "company") {
        response = await createCompany(email, password, type);
      }

      if (response && response.success) {
        let userId = type === "user" ? response.data.user._id : response.data.company._id;

        localStorage.setItem('tipoUsuario', type);
        const data = await login(email, password);

        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', userId);

          toast.success('Cuenta creada', {
            style: {
              background: 'blue',
              color: 'white'
            }
          });

          await sendVerificationCode(email);
          setTimeout(() => router.push('/autentificacion'), 2000);
        }
      }
    } catch (error) {
      if (error.message.includes("correo ya está registrado")) {
        setIsModalOpen(true);
      } else {
        toast.error("Error al crear la cuenta. Intenta nuevamente.", {
          style: { background: 'red', color: 'white' }
        });
      }
    }
  };


  return (
    <div>
      <h1 className='text-center text-[#2F4F4F] text-2xl p-10 font-bold'>
        Bienvenid@ a AccessGo
      </h1>

      <div className='text-center flex justify-center'>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Correo Electrónico'
              className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
            />
            {emailError && <p className="text-red-600">{emailError}</p>}  {/* Muestra el error de email */}
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
      {/* Modal de error */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-80 md:w-96">
            <h2 className="text-xl font-semibold text-[#2F4F4F]">
              Este correo ya está registrado
            </h2>
            <p className="mt-2">
              Dirígete a iniciar sesión o restablece tu contraseña si la has olvidado.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => router.push('/login')}
                className="w-full px-4 py-2 bg-[#00695C] text-white rounded-md hover:bg-[#004D40] transition duration-200"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => router.push('/olvidoContrasena')}
                className="w-full px-4 py-2 bg-[#78909C] text-white rounded-md hover:bg-[#546E7A] transition duration-200"
              >
                Restablecer Contraseña
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-[#546E7A] hover:underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default View4;
