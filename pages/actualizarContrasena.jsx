/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Form, Input } from "@/components/Molecules/FormStyles";

const actualizarContrasena = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error] = useState('');

  return (
    <div className='flex items-center justify-center mx-auto mt-56'>
      <div className="max-w-md w-full mx-auto">
        <Form>
          <div className="relative">
            <Input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Nueva Contraseña'
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
            Actualizar Contraseña
          </button>
        </Form>
      </div>
    </div>
  );
}

export default actualizarContrasena;