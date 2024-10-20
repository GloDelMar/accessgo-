import React from "react";
import Link from "next/link";
import { Form, Input } from "@/components/Molecules/FormStyles";



 const view4 = () => {
    return (
      <>
        <div>
          <h1 className='text-center text-[#2F4F4F] text-2xl p-10 font-bold'>
            Bienvenid@ a AccessGo
          </h1>
     
          <div className='text-center flex justify-center '>
            <Form>
              <div>
                <Input
                  type='text'
                  name='email'
                  placeholder='Correo Electronico o WhatsApp'
                  className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                />
              </div>

              <div className="relative">
                <Input
                  type='password'
                  name='contraseña'
                  placeholder='Contraseña'
                  className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
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

              <div className="relative">
                <Input
                  type='password'
                  name='confirmacion'
                  placeholder='Confirma Contraseña'
                  className='w-full px-3 py-2 border text-xs md:text-sm border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
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
            </Form>
          </div>
         
          <div className='flex justify-center items-center py-5'>
            <Link legacyBehavior href='/5/autentificacion'>
              <button
                className='px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
              >
                Inicia Sesion
              </button>
            </Link>
          </div>
        </div>
      </>
    );
}

export default view4; 