import React from 'react';



function SocialMediaSection() {
  const socialMedias = [
    {
      name: 'facebook',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/72bdc2e79652a9f256dedaef67126ca05409a4b7ecf6e69697a2a291e73c317d?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0'
    },
    {
      name: 'X',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4fc71aed47a1e9c483da2e5e5522f8399dd48e791344d4c7e4c4c2a38c2953b4?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0'
    },
    {
      name: 'Instagram',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b7b5bb2852aa4228092338b702e05cabfdf93febf6933db1723a7aa015e8b540?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0'
    },
    {
      name: 'tik tok',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d3014b6b4996c301f4594bb96f5c4fc3d50e8a0525573b428dfafabd62307abd?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0'
    }
  ];

  return (
    <section className='flex flex-col px-1.5 pt-2 pb-7 mt-10 w-full bg-white border border-gray-100 border-solid shadow-lg max-w-[632px] rounded-[30px] text-slate-500 max-md:max-w-full'>
      <h2 className='self-start ml-7 text-base font-medium text-black max-md:ml-2.5'>
        Datos De Redes Sociales
      </h2>
      <div className='flex flex-wrap gap-5 mt-9 w-full whitespace-nowrap max-md:mr-0.5 max-md:max-w-full'>
        {socialMedias.map((media, index) => (
          <div
            key={index}
            className='flex overflow-hidden flex-1 flex-auto gap-10 justify-center items-start px-5 py-1.5 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50'
          >
            <img
              loading='lazy'
              src={media.icon}
              alt={`${media.name} icon`}
              className='object-contain shrink-0 self-start w-7 aspect-square'
            />
            <div className='my-auto'>{media.name}</div>
          </div>
        ))}
      </div>
      <button className='self-center px-8 py-3.5 mt-10 max-w-full text-xl font-semibold text-white whitespace-nowrap rounded-lg bg-slate-700 shadow-[0px_6px_28px_rgba(0,0,0,0.16)] w-[114px] max-md:px-5'>
        LISTO
      </button>
    </section>
  );
}

function ImageUploader({ label }) {
  return (
    <div className='flex overflow-hidden flex-col grow px-16 py-3.5 w-full rounded-lg border border-gray-400 border-solid bg-stone-50 max-md:px-5 max-md:mt-4'>
      <div className='self-start text-xs leading-tight text-slate-500'>
        {label}
      </div>
      <div className='flex flex-col justify-center items-center self-center px-3 mt-2 text-sm leading-5 text-center text-white bg-white rounded-full border border-gray-300 border-solid fill-white h-[168px] stroke-[1px] stroke-gray-300 w-[168px]'>
        <div className='flex relative flex-col justify-center items-center w-full aspect-square'>
          <img
            loading='lazy'
            src='http://b.io/ext_23-'
            alt=''
            className='object-cover absolute inset-0 size-full'
          />
          <div className='flex relative flex-col px-6 py-9 w-full h-36 rounded-full bg-neutral-700 bg-opacity-70 max-md:pr-5'>
            <img
              loading='lazy'
              src='http://b.io/ext_24-'
              alt=''
              className='object-contain self-center w-6 aspect-square'
            />
            <div className='mt-2'>
              Actualizar foto <br /> de perfil
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventForm() {
  return (
    <form className='flex flex-col px-2 pt-2 pb-10 mt-10 w-full bg-white border border-gray-100 border-solid shadow-lg max-w-[632px] rounded-[30px] max-md:max-w-full'>
      <h2 className='self-start ml-6 text-base font-medium text-black max-md:ml-2.5'>
        Datos del evento
      </h2>
      <div className='mt-3 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col'>
          <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col items-start w-full text-xs font-medium text-black max-md:mt-3.5'>
              <label htmlFor='eventName'>Nombre de tu evento</label>
              <input
                id='eventName'
                type='text'
                className='overflow-hidden self-stretch px-5 py-3 mt-3 w-full text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500 max-md:pr-5 max-md:mr-0.5'
                placeholder='Ingresar dato'
              />
              <label htmlFor='eventDescription' className='mt-4'>
                descripción
              </label>
              <textarea
                id='eventDescription'
                className='overflow-hidden self-stretch px-5 pt-3 pb-20 mt-3 w-full text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500 max-md:pr-5 max-md:mr-0.5'
                placeholder='Ingresa una descripción'
              ></textarea>
            </div>
          </div>
          <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
            <ImageUploader label='Sube imagenes de tu evento' />
          </div>
        </div>
      </div>
      <h3 className='mt-8 ml-6 text-base font-medium text-black max-md:ml-2.5'>
        Horario del evento
      </h3>
      <div className='mt-6 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col'>
          <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col w-full text-xs font-medium text-black max-md:mt-4'>
              <label htmlFor='startDate'>Fecha de INICIO</label>
              <input
                id='startDate'
                type='date'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none whitespace-nowrap rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
              <label htmlFor='startTime' className='mt-4'>
                HORA de INICIO
              </label>
              <input
                id='startTime'
                type='time'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
            </div>
          </div>
          <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col w-full text-xs font-medium text-black max-md:mt-4'>
              <label htmlFor='endDate'>Fecha de FIN</label>
              <input
                id='endDate'
                type='date'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none whitespace-nowrap rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
              <label htmlFor='endTime' className='mt-4'>
                HORA de FINALIZACIÓN
              </label>
              <input
                id='endTime'
                type='time'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='self-center px-12 py-3.5 mt-10 max-w-full text-lg font-semibold text-white rounded-lg bg-slate-700 shadow-[0px_6px_28px_rgba(0,0,0,0.16)] w-[250px] max-md:px-5'
      >
        PUBLICAR EVENTO
      </button>
    </form>
  );
}

function PromotionForm() {
  return (
    <form className='flex flex-col pt-2 pr-1 pb-10 pl-3 mt-10 w-full bg-white border border-gray-100 border-solid shadow-lg max-w-[632px] rounded-[30px] max-md:max-w-full'>
      <h2 className='self-start ml-5 text-base font-medium text-black max-md:ml-2.5'>
        Datos de la promoción
      </h2>
      <label
        htmlFor='promotionName'
        className='self-start mt-3 text-xs font-medium text-black'
      >
        Nombre de tu promociÓn
      </label>
      <div className='mt-3 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col'>
          <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col text-sm text-slate-500 max-md:mt-4'>
              <input
                id='promotionName'
                type='text'
                className='overflow-hidden px-5 py-3 leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 max-md:pr-5'
                placeholder='Ingresar dato'
              />
              <label
                htmlFor='promotionDescription'
                className='self-start mt-4 text-xs font-medium text-black'
              >
                descripciÓn
              </label>
              <textarea
                id='promotionDescription'
                className='overflow-hidden px-5 pt-3 pb-20 mt-3 leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 max-md:pr-5'
                placeholder='Ingresa una descripción'
              ></textarea>
            </div>
          </div>
          <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
            <ImageUploader label='Sube imagenes de tu promoción' />
          </div>
        </div>
      </div>
      <div className='mt-6 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col'>
          <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col w-full text-xs font-medium text-black max-md:mt-4'>
              <label htmlFor='promotionStartDate'>Fecha de INICIO</label>
              <input
                id='promotionStartDate'
                type='date'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none whitespace-nowrap rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
              <label htmlFor='promotionStartTime' className='mt-4'>
                HORA de INICIO
              </label>
              <input
                id='promotionStartTime'
                type='time'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
            </div>
          </div>
          <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col w-full text-xs font-medium text-black max-md:mt-4'>
              <label htmlFor='promotionEndDate'>Fecha de FINALIZACIÓN</label>
              <input
                id='promotionEndDate'
                type='date'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none whitespace-nowrap rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
              <label htmlFor='promotionEndTime' className='mt-4'>
                HORA de FINALIZACIÓN
              </label>
              <input
                id='promotionEndTime'
                type='time'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='self-center px-7 py-3.5 mt-10 max-w-full text-lg font-semibold text-white rounded-lg bg-slate-700 shadow-[0px_6px_28px_rgba(0,0,0,0.16)] w-[250px] max-md:px-5'
      >
        PUBLICAR PROMOCIÓN
      </button>
    </form>
  );
}

function MenuForm() {
  return (
    <form className='flex flex-col pt-2 pr-1 pb-10 pl-3.5 mt-10 w-full bg-white border border-gray-100 border-solid shadow-lg max-w-[632px] rounded-[30px] max-md:max-w-full'>
      <h2 className='self-start ml-5 text-base font-medium text-black max-md:ml-2.5'>
        Tu Menú
      </h2>
      <label
        htmlFor='menuName'
        className='self-start mt-3 text-xs font-medium text-black'
      >
        Nombre de tu menú
      </label>
      <div className='mt-3 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col'>
          <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col text-sm text-slate-500 max-md:mt-4'>
              <input
                id='menuName'
                type='text'
                className='overflow-hidden px-5 py-3 leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 max-md:pr-5'
                placeholder='Ingresar dato'
              />
              <label
                htmlFor='menuDescription'
                className='self-start mt-4 text-xs font-medium text-black'
              >
                descripción
              </label>
              <textarea
                id='menuDescription'
                className='overflow-hidden px-5 pt-3 pb-20 mt-3 leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 max-md:pr-5'
                placeholder='Ingresa una descripción'
              ></textarea>
            </div>
          </div>
          <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
            <ImageUploader label='Sube imagenes de tu menú' />
          </div>
        </div>
      </div>
      <div className='mt-6 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col'>
          <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col w-full text-xs font-medium text-black max-md:mt-4'>
              <label htmlFor='menuStartDate'>Fecha de INICIO</label>
              <input
                id='menuStartDate'
                type='date'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none whitespace-nowrap rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
              <label htmlFor='menuStartTime' className='mt-4'>
                HORA de INICIO
              </label>
              <input
                id='menuStartTime'
                type='time'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
            </div>
          </div>
          <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col w-full text-xs font-medium text-black max-md:mt-4'>
              <label htmlFor='menuEndDate'>Fecha de FINALIZACIÓN</label>
              <input
                id='menuEndDate'
                type='date'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none whitespace-nowrap rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
              <label htmlFor='menuEndTime' className='mt-4'>
                HORA de FINALIZACIÓN
              </label>
              <input
                id='menuEndTime'
                type='time'
                className='flex overflow-hidden gap-10 justify-end px-4 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500'
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='self-center px-14 py-3.5 mt-10 max-w-full text-lg font-semibold text-white rounded-lg bg-slate-700 shadow-[0px_6px_28px_rgba(0,0,0,0.16)] w-[250px] max-md:px-5'
      >
        PUBLICAR MENÚ
      </button>
    </form>
  );
}

function View18() {
  return (
    <div className='flex overflow-hidden flex-col items-center pb-28 bg-white max-w-[744px] max-md:pb-24'>
     
      <div className='mt-10 text-xl font-bold leading-[62px] text-slate-700 max-md:max-w-full'>
        Este espacio es para que des a conocer tus próximos eventos
      </div>
      <SocialMediaSection />
      <EventForm />
      <PromotionForm />
      <MenuForm />
    </div>
  );
}

export default View18;
