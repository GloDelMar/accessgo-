import React, { useState } from 'react';
import { Form, Input } from '../Molecules/FormStyles';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

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
    console.log('Formulario enviado');
    try {
      const response = await axios.post('http://localhost:8080/api/auth', {
        email,
        password,
      });

     
      const { token } = response.data.data;

      if (token) {
        window.localStorage.setItem('token', token);
        toast.success('Logged in');

       
        router.push('/2/view2');
      } else {
        toast.error('Usuario o contraseña incorrectos');
        setError('root.credentials', {
          type: 'manual',
          message: 'Credenciales invalidas',
        });
      }
    } catch (error) {
      toast.error('Error al iniciar sesion', {
        style: {
          background: 'red',
          color: 'white'
        }
      });
      console.error('[login error]', error);
    }
  }

  return (
    <Form onSubmit={onSubmit} className='grid gap-4'>
      <div>
        <label
          htmlFor='whatsapp'
          className='block text-sm font-medium text-[#546E7A] mb-1'
        >
          Correo Electrónico o Número de WhatsApp
        </label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='tel'
          id='whatsapp'
          placeholder='Introduce tu Email o número de WhatsApp'
          className='w-full px-3 py-2 border border-[#B0BEC5] text-xs md:text-sm bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
        />
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-[#546E7A] mb-1'
        >
          Contraseña
        </label>
        <div className='relative'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            id='password'
            placeholder='Introduce tu contraseña'
            className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
          />
          <span
            onClick={() => {
              const input = document.getElementById('password');
              input.type = input.type === 'password' ? 'text' : 'password';
            }}
            className='absolute right-3 top-3 text-[#546E7A] hover:underline hover:cursor-pointer text-xs md:text-sm'
          >
            Mostrar
          </span>
        </div>
      </div>

      <div className='mt-8 flex justify-center '>
        <button 
          className='px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#F5F0E5] hover:bg-[#E0D7C6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
        >
          INICIAR SESIÓN
        </button>
      </div>
      {errors.root?.credentials && (
        <p className='text-red-500 text-center'>Credenciales Invalidas</p>
      )}
      <Toaster />
    </Form>
  );
};

export default LoginForm;
