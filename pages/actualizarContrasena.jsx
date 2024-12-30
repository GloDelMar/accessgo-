import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Input } from '@/components/Molecules/FormStyles';
import { toast } from 'react-toastify';
import { changeCompanyPassword, changeUserPassword } from './api/api_newPassword';

const ActualizarContrasena = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('tipoUsuario');

    if (!userId || !userType) {
      console.log('userId o tipoUsuario no encontrado. Redirigiendo a login.');
      toast.error('Información del usuario no encontrada.');
      router.push('/login');
    }
  }, [router]);

  const validatePassword = (password) => {
    const regex = /^.{6,}$/; // Contraseña debe tener al menos 8 caracteres
    return regex.test(password);
  };

  const handlePasswordUpdate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('tipoUsuario');
      const email = localStorage.getItem('recuperacion');

      if (!userId || !userType || !email || !newPassword || !confirmPassword) {
        throw new Error('Información del usuario no encontrada.');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden.');
      }

      if (!validatePassword(newPassword)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres.');
      }

      let updateResponse;
      if (userType === 'recuperaUser') {
        updateResponse = await changeUserPassword(userId, newPassword);
      } else if (userType === 'recuperaCompany') {
        updateResponse = await changeCompanyPassword(userId, newPassword);
      }

      if (!updateResponse.success) {
        throw new Error('No se pudo actualizar la contraseña.');
      }
      
      console.log('Contraseña actualizada para el tipo de usuario:', userType);
      toast.success('Contraseña actualizada correctamente.');

      // Iniciar sesión con la nueva contraseña
      const loginResponse = await axios.post(`https://backend-r159.onrender.com/api/auth`, {
        email,
        password: newPassword,
      });

      if (loginResponse.data && loginResponse.data.data && loginResponse.data.data.token) {
        const { token, type, cuenta } = loginResponse.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', loginResponse.data.data.id);
        localStorage.setItem('tipoUsuario', type);
        localStorage.setItem('cuentaUsuario', cuenta);

        console.log('Token:', token);
        console.log('Tipo de Usuario:', type);
        console.log('Cuenta del Usuario:', cuenta);

        toast.success('Sesión iniciada correctamente.', {
          style: {
            background: 'blue',
            color: 'white',
          },
        });

        // Redirigir según el tipo y la cuenta del usuario
        setTimeout(() => {

          localStorage.removeItem('recuperacion');
          
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
        throw new Error('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('[login error]', error?.response?.data?.message || error.message);
      toast.error('Error al iniciar sesión, verifica los datos.', {
        style: {
          background: 'red',
          color: 'white',
        },
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    console.log('Formulario enviado, intentando actualizar contraseña...');
    await handlePasswordUpdate();
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-5 space-y-4">
      <h1 className="text-center text-2xl text-[#2F4F4F] font-extrabold">Anota tu nueva contraseña</h1>
      <h3 className="text-center text-[#2F4F4F] p-1 font-extrabold">
        Al darle en el botón  &quot;Actualizar&quot; serás redirigido a la página de tu perfil.
      </h3>
      <div className="w-full">
        <Form onSubmit={onSubmit}>
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva Contraseña"
              className="w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
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

          <div className="relative mt-4">
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma Contraseña"
              className="w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
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

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            type="submit"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
          >
            Actualizar
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ActualizarContrasena;
