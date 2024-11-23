import React, { useState } from 'react';
import { Form, Input } from '../Molecules/FormStyles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const {
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(e) {
    e.preventDefault();

  
    try {
      const response = await axios.post(`https://backend-r159.onrender.com/api/auth`, {
        email,
        password,
      });

  

      if (response.data && response.data.data && response.data.data.token) {
        const { token, type, cuenta } = response.data.data;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem("userId", response.data.data.id);
        window.localStorage.setItem("tipoUsuario", type); 
        window.localStorage.setItem("cuentaUsuario", cuenta);
        
        toast.success('Sesión iniciada', {
          style: {
            background: 'blue',
            color: 'white'
          }
        });
  
        setTimeout(() => {
          if (type === 'user') {
            router.push('/mi-perfil');
          } else if (type === 'company') {
            if (cuenta === 'free') {
              router.push('/sesion-base');
            } else if (cuenta === 'premium') {
              router.push('/sesion-prem');
            }
          }
        }, 2000);
        
      } else {
        throw new Error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('[login error]', error?.response?.data?.message || error.message);
      toast.error('Usuario o contraseña incorrectos', {
        style: {
          background: 'red',
          color: 'white'
        }
      });
      
      setError('root.credentials', {
        type: 'manual',
        message: 'Credenciales inválidas'
      });
    }
  }

  return (
    <Form onSubmit={onSubmit} className="grid gap-4">
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-[#546E7A] mb-1">
          Correo Electrónico o Número de WhatsApp
        </label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="whatsapp"
          placeholder="Introduce tu Email o número de WhatsApp"
          className="w-full px-3 py-2 border border-[#B0BEC5] text-xs md:text-sm bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#546E7A] mb-1">
          Contraseña
        </label>
        <div className="relative">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Introduce tu contraseña"
            className="w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
          />
          <span
            onClick={() => {
              const input = document.getElementById('password');
              input.type = input.type === 'password' ? 'text' : 'password';
            }}
            className="absolute right-3 top-3 text-[#546E7A] hover:underline hover:cursor-pointer text-xs md:text-sm"
          >
            Mostrar
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#F5F0E5] hover:bg-[#E0D7C6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
        >
          INICIAR SESIÓN
        </button>
      </div>

      {errors.root?.credentials && (
        <p className="text-red-500 text-center">{errors.root.credentials.message}</p>
      )}
      <Toaster />
    </Form>
  );
};

export default LoginForm;
