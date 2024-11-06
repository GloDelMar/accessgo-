import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input } from "@/components/Molecules/FormStyles";
import { createAccount } from "../api/api_register";
import { sendVerificationCode } from "../api/api_verification";
import { login } from "../api/api_login";
import { toast } from "sonner";
import { createCompany } from "../api/api_company";

const View4 = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const userType = localStorage.getItem('tipoUsuario');
    if (userType) {
      setType(userType);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("Datos recibidos en handleSubmit:", {
      email,
      password,
      confirmPassword,
      type
    });


    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      console.log("tipo de usuario", type);
      let response;

      // Usa createAccount o createCompany según el tipo de usuario
      if (type === "user") {
        response = await createAccount(email, password, type);
      } else if (type === "company") {
        response = await createCompany(email, password, type);
      }

      if (response && response.success) {
        let userId;
        if (type === "user") {
          userId = response.data.user._id;
        } else if (type === "company") {
          userId = response.data.company._id;
        }
        console.log("respuesta", response);


        // Inicia sesión automáticamente después de crear la cuenta
        const token = await login(email, password); // Asegúrate de que no se necesite un token aquí.

        if (token) { // Asegúrate de que se recibe un token válido.
          // Guarda el token y el ID del usuario en el localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          toast.success('Cuenta creada',{
            style: {
              background: 'blue',
              color: 'white'
            }
          });

          // Envía el código de verificación
          await sendVerificationCode(email);

          // Redirige a la pantalla de autenticación
          setTimeout(() => {
            router.push('/5/autentificacion');
          }, 2000);

          // Limpia los campos
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          setError('Error al crear la cuenta. Inténtalo de nuevo.');
        }
      }
    } catch (error) {
      console.error("Error al crear cuenta o enviar código:", error);
      toast.error(`${error.message}`, {
        style: {
          background: 'red',
          color: 'white'
        }
      });
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
      <Toaster position="top-center" />
    </div>
  );
};

export default View4;
