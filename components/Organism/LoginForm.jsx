import React from 'react';
import { Form, Input } from '../Molecules/FormStyles'; 
import Link from 'next/link';
// imports para login
import { useForm } from 'react-hook-form';
import { login } from '@/pages/api/api_login';
import { useRouter } from 'next/router';
import { useIsLogged } from "@/hooks/isLogged"

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useIsLogged('/')

  async function onSubmit(data) {
      try {
          const token = await login(data.email, data.password);

          localStorage.setItem('token', token);
          router.push("/");

      } catch (error) {
          alert('Incorrect Email or Password');
      }
  }



  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
     
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-[#546E7A] mb-1">
          Correo Electrónico o Número de WhatsApp
        </label>
        <input
        {...register("email", {
          required: "Email is required",
          pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address"
          }
      })}
          type="tel"
          id="whatsapp"
          placeholder="Introduce tu Email o número de WhatsApp"
          className="w-full px-3 py-2 border border-[#B0BEC5] text-xs md:text-sm bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
        />
      </div>

      <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-[#546E7A] mb-1"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                    value: 6,
                    message: "Invalida data"
                }
            })}
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
              className="w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            <span 
              // onClick={() => {
              //   const input = document.getElementById('password');
              //   input.type = input.type === 'password' ? 'text' : 'password';
              // }} 
              className="absolute right-3 top-3 text-[#546E7A] hover:underline hover:cursor-pointer text-xs md:text-sm"
            >
              Mostrar
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center ">
        <Link href="7/perfilUsuario">
            <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#F5F0E5] hover:bg-[#E0D7C6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]">
              INICIAR SESIÓN
            </button>
            </Link>
        </div>
        {errors.root?.credentials && (
        <p className='text-red-500 text-center'>Credenciales Invalidas</p>
      )}
    </Form>
  );
};

