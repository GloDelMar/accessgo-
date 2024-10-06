import { useState } from 'react';

const View25 = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-center text-3xl font-extrabold text-[#2F4F4F] mb-8">
            ¡Revisa tu correo o tu Whatsaap!
          </h1>
          <form className="mt-8 space-y-6" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-40">
                <div className="relative bg-[#F0F4F8] rounded-md text-center pt-2">
                  <label htmlFor="verification-code" className="block text-gray-600 text-sm">
                    Confirma tu código
                  </label>
                  <input
                    id="verification-code"
                    name="verification-code"
                    type="text"
                    required
                    className="block w-full text-center py-3 text-gray-600 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                    placeholder="5555-5555-5555"
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="relative bg-[#F0F4F8] rounded-md">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full pr-10 py-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent pl-3"
                    placeholder="Nueva Contraseña"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
              <br />
              <div>
                <div className="relative bg-[#F0F4F8] rounded-md">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="block w-full pr-10 py-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent pl-3"
                    placeholder="Confirma Nueva Contraseña"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-[#2F4F4F] bg-[#F0EAE0] hover:bg-[#E5DFD5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0EAE0]"
              >
                Inicia Sesion
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default View25;