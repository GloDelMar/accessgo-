import { useState } from 'react';

const PlanDonation = ({ price, isSelected, onSelect }) => (
  <div
    className={`flex  justify-center  py-3 mt-10 w-40 text-center whitespace-nowrap bg-white rounded-xl border border-solid max-w-[249px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer ${
      isSelected ? 'border-blue-500' : 'border-black'
    }`}
    onClick={onSelect}
  >
    <div className='font-bold'>{price}</div>
  </div>
);

const PlanDonations = [
  { price: '$20' },
  { price: '$50' },
  { price: '$100' },
  { price: '$200' },
  { price: '$500' },
  { price: '$1000' }
];

export default function Donacion() {
  // Agregar estado para el plan seleccionado
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className='w-full h-full flex flex-col justify-center mt-8 md:mx-10 lg:p-16'>
      <div className='text-[#2F4F4F] text-center'>
        <p className='text-xl md:text-4xl lg:text-4xl font-bold'>
          ¡Ayúdanos a Hacer del Mundo un Lugar Más Accesible!
        </p>
        <p className='text-sm mt-6 md:text-xl lg:text-xl font-semibold'>
          En AccesGo nos dedicamos a ofrecer información sobre la accesibilidad
          en establecimientos para que todos puedan disfrutar de espacios
          inclusivos y cómodos. Tu apoyo es fundamental para mantener y mejorar
          continuamente nuestro sitio web.
        </p>
        <p className='text-xl font-bold mt-8 md:text-2xl lg:text-2xl'>
          ¿Cómo puedes ayudar?
        </p>
        <p className='text-sm mt-8 md:text-xl lg:text-xl font-semibold'>
          Cada contribución, grande o pequeña, tiene un impacto significativo.
          Contribuye a la causa de la accesibilidad y ayuda a mantener AccesoGo
          como una herramienta para todos. Puedes donar de manera rápida y
          segura.
        </p>
      </div>

      <div className='flex flex-col md:space-x-[95px] '>
        <div className='flex flex-col mt-2 items-center'>
          {PlanDonations.map((plan, index) => (
            <PlanDonation
              key={index}
              type={plan.type}
              price={plan.price}
              isSelected={selectedPlan === index}
              onSelect={() => setSelectedPlan(index)}
            />
          ))}
        </div>

        <div className='flex flex-col lg:flex-row mt-10 px-4'>
          <div className='bg-[#2F4F4F] h-auto text-center text-white rounded-xl mx-auto lg:mx-10 mt-8 p-4'>
            <p className='text-xl font-semibold text-balance'>
              Tu donativo nos permitirá:
            </p>
            <ul className='mt-4'>
              <li className='text-base md:text-xl mt-4 text-center mx-2 md:mx-6'>
                Actualizar la base de datos con la información más reciente.
              </li>
              <li className='text-base md:text-xl mt-4 text-center mx-2 md:mx-6'>
                Mejorar las funcionalidades del sitio para ofrecer una
                experiencia más fluida.
              </li>
              <li className='text-base md:text-xl mt-4 text-center mx-2 md:mx-6'>
                Garantizar el mantenimiento y la seguridad de la página.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className='text-[#2F4F4F] text-base md:text-2xl lg:text-4xl text-center mt-20 font-bold'>
        ¡Tu apoyo marca la diferencia!
      </p>
    </div>
  );
}
