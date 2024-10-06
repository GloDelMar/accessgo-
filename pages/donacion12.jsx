import Layout from '../components/Layout';

export default function Donacion() {
  return (
    <div className='w-full h-full flex flex-col justify-center mt-8 md:mx-10 lg:p-16 '>
      <div className='text-[#2F4F4F] text-center'>
        <p className='text-xl md:text-4xl lg:text-4xl font-bold '>
          ¡Ayúdanos a Hacer del Mundo un Lugar Más Accesible!
        </p>
        <p className='text-sm mt-6 md:text-xl lg:text-xl font-semibold '>
          <strong>En AccesGo,</strong> nos dedicamos a ofrecerte la mejor
          información sobre la accesibilidad en establecimientos para que todos
          puedan disfrutar de espacios inclusivos y cómodos. Tu apoyo es
          fundamental para mantener y mejorar continúamente nuestro sitio web,
          asegurando que puedas encontrar la información que necesitas.
        </p>
        <p className='text-xl font-bold mt-8 md:text-2xl lg:text-2xl'>
          ¿Cómo puedes ayudar?
        </p>
        <p className='text-sm mt-8 md:text-xl lg:text-xl font-semibold'>
          Cada contribución, grande o pequeña, tiene un impacto significativo.
          Contribuye a la causa de la accesibilidad y ayuda a mantener AccesoGo
          como una herramienta esencial para todos. Puedes donar de manera
          rápida y segura
        </p>
      </div>

      <div className='flex flex-col lg:flex-row '>
      <div className='bg-gray-100 rounded-xl w-full lg:w-1/2 h-full flex flex-col justify-center items-center mt-8'>
        <button className='w-[194px] h-[50px] md:w-[300px] md:h-[85px] bg-[#2F4F4F] text-white mt-6 rounded-full tex-sm md:text-2xl'>
          <img src='' alt='' />
          Tarjeta de crédito
        </button>
        <input
          className='text-sm md:text-base mt-8 border-b border-black h-[37px] w-3/4 whitespace-pre text-[#2F4F4F]'
          type='text'
          placeholder='    Banco'
        />
        <input
          className='text-sm md:text-base mt-8 border-b border-black h-[37px] w-3/4 whitespace-pre text-[#2F4F4F]'
          type='text'
          name=''
          id=''
          placeholder='    Monto$$'
        />
        <input
          className='text-sm md:text-base mt-8 border-b border-black h-[37px] w-1/2 whitespace-pre text-[#2F4F4F]'
          type='text'
          placeholder='    MM/AA'
        />
        <input
          className='text-sm md:text-base mt-8 border-b border-black h-[37px] w-1/2 whitespace-pre text-[#2F4F4F]'
          type='text'
          placeholder='    CVV'
        />
        <button className='w-[111px] h-[30px] bg-[#2F4F4F] rounded-xl mt-6 mb-6 grid grid-cols-5 text-white items-center'>
          <img
            className='col-start-2 col-end-2 w-[20px] h-[20px]'
            src='Union.svg'
            alt=''
          />
          <p className='col-start-3 col-end-3'>Donar</p>
        </button>
      </div>

      <div className='p-0 mx-6 lg:w-1/2 '>
        <div className='bg-[#2F4F4F] h-[250px] text-center text-white rounded-xl mx-4 mt-8 p-2'>
          <p className='text-xl font-semibold text-center text-balance'>
            Tu donativo nos permitirá:{' '}
          </p>
          <ul>
            <li className='text-base md:text-xl mt-6 text-center text-balance mx-2  md:mx-6 '>
              Actualizar la base de datos con la información más reciente.
              Mejorar las funcionalidades del sitio para ofrecer una experiencia
              más fluída. Garantizar el mantenimiento y la seguradad de la
              página.
            </li>
          </ul>
        </div>

        <div>
          <textarea
            className='w-full h-[158px] bg-gray-200  text-center mt-8 rounded-lg text-white-500 resize-none overflow-y-auto p-4 pt-6'
            placeholder='Escríbenos algún comentario'
            maxlength='700'
          ></textarea>
        </div>
      </div>

      </div>

      <p className='text-[#2F4F4F] text-base md:text-2xl lg:text-4xl text-center mt-8 font-bold'>
        ¡Tu apoyo marca la diferencia!
      </p>
    </div>
  );
}
