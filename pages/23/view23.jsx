import { Link, StyledButton, } from '@/components/atoms/Index';
import { InputWithLabel } from '@/components/atoms/Input';
import Image from 'next/image';
import { useState } from 'react';

const View23 = () => {

  const [selectedDays, setselectedDays] = useState([])

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Todos los días']

  /**
   * Alterna la selección de un día dado en el estado selectedDays.
   * Si el día ya está seleccionado, se eliminará de la selección.
   * Si el día no está seleccionado, se añadirá a la selección.
   *
   * @param {string} day - El día a alternar en el estado selectedDays.
   */
  const toggleDay = (day) => setselectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#263238]">¡Cuentanos sobre ustedes!</h1>
        <p className="text-center mb-8 text-[#546E7A]">Para personalizar el perfil te pedimos que respondas los siguientes campos</p>

        <div className="grid lg:grid-cols-[300px,1fr] gap-8">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-[#ECEFF1] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#B0BEC5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <button className="px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] md:hidden">
              Actualizar foto de perfil
            </button>
            <br />
            <InputWithLabel placeholder='Nombre' />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#263238]">Datos del negocio</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <InputWithLabel
                  label='Nombre comercial de tu negocio'
                  id='nombre-comercial'
                  placeholder='Ingresar dato'
                />
              </div>
              <div>
                <InputWithLabel
                  label='RFC'
                  id='rfc'
                  placeholder='Ingresar dato'
                />
              </div>
            </div>
            <div>
              <label htmlFor="persona-moral" className="block text-sm font-medium text-[#546E7A] mb-1">Persona moral</label>
              <InputWithLabel
                label='Nombre y apellido representante legal del negocio'
                id='persona-moral'
                placeholder='Ingresar dato'
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="giro" className="block text-sm font-medium text-[#546E7A] mb-1">Giro de tu negocio</label>
                <select
                  id="giro"
                  className="w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
                >
                  <option>Giro de tu negocio</option>
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                  <option>Opción 3</option>
                </select>
              </div>
              <div>
                <label htmlFor="horario" className="block text-sm font-medium text-[#546E7A] mb-1">Horario de servicio</label>
                <div className="flex items-center space-x-2">
                  <input type="time" className="flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50" />
                  <span className="text-[#546E7A]">a</span>
                  <input type="time" className="flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50" />
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-[#546E7A] mb-1">Descripción de tu negocio</label>
                <textarea
                  id="descripcion"
                  placeholder="Ingresar dato"
                  className="w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-[#546E7A] mb-2">Días de servicio</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {days.map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        id={day}
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleDay(day)}
                        className="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] bg-[#F9F9F9] rounded"
                      />
                      <label htmlFor={day} className="ml-2 block text-sm text-[#546E7A]">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <InputWithLabel
                label='Dirección de tu negocio'
                id='direccion'
                placeholder='Ingresar dato'
              />
            </div>
            <div className="aspect-video relative rounded-md overflow-hidden">
              <Image
                src="/mapa21.png"
                alt="Mapa"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center md:justify-end space-x-4">
          <StyledButton variant="blancoCuadrado">CANCELAR</StyledButton>
          <Link legacyBehavior href="/cardFree09" >
            <StyledButton variant="verdeCuadrado">CONTINUAR</StyledButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default View23;