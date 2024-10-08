import React from 'react';

const Header = () => (
  <header className="flex overflow-hidden flex-wrap gap-5 justify-between self-stretch px-10 py-3 w-full bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.08)] max-md:px-5 max-md:max-w-full">
    <div className="flex gap-1.5 my-auto text-sm font-medium text-green-600">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d28aefeba461c1862228836d6e11f7884983ed8cb5dc869829b5b909d656ab38?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="" className="object-contain shrink-0 w-10 aspect-[1.33]" />
      <div className="my-auto">
        <span className="font-extrabold text-yellow-500">A</span>
        <span className="font-extrabold">ccess</span>
        <span className="font-extrabold text-slate-700">G</span>
        <span className="font-extrabold">o</span>
      </div>
    </div>
    <nav className="flex gap-3.5 text-xs font-semibold text-white whitespace-nowrap">
      <button className="flex gap-3 items-center py-1 pr-2 pl-5 my-auto rounded-2xl bg-slate-700 min-h-[28px]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f90f1c2279400d2bb1af1bb06f0d952eaf5612816f1734378cc728bc738ecf7?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
        <span className="self-stretch my-auto">¡Únete!</span>
      </button>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2dc8d2c5604f18eed715acf3b05000739b04fcf0dc25823b9beda56836cb9d4?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="User profile" className="object-contain shrink-0 w-10 rounded-none aspect-square" />
    </nav>
  </header>
);

const ProfilePhoto = () => (
  <section className="flex flex-col justify-end px-6 pt-10 pb-3.5 mt-10 max-w-full text-sm bg-white rounded-2xl border border-gray-100 border-solid shadow-lg w-[300px] max-md:pl-5">
    <div className="flex flex-col justify-center items-center self-center px-3 leading-5 text-center text-white bg-white rounded-full border border-gray-300 border-solid fill-white h-[168px] stroke-[1px] stroke-gray-300 w-[168px]">
      <div className="flex relative flex-col justify-center items-center w-full aspect-square">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/062252b061b7fa1097135895d1fade6188fa81c25d6513b506274d614aa49657?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="Current profile" className="object-cover absolute inset-0 size-full" />
        <div className="flex relative flex-col px-6 py-9 w-full h-36 rounded-full bg-neutral-700 bg-opacity-70 max-md:pr-5">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc421f796df26da330e3f41c0f03e1819e9987f7fff1c3edaa67d8cb5f8d684e?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="" className="object-contain self-center w-6 aspect-square" />
          <p className="mt-2">
            Actualizar foto <br /> de perfil
          </p>
        </div>
      </div>
    </div>
    <div className="px-8 py-5 mt-5 font-medium leading-6 text-gray-800 whitespace-nowrap bg-gray-100 rounded-lg max-md:px-5">
      Nombre
    </div>
  </section>
);

const BusinessDetails = () => (
  <section>
    <h2 className="text-xl font-bold text-gray-800 mb-6">Datos del negocio</h2>
    <div className="flex gap-5 justify-between max-w-full w-[334px]">
      <div className="flex flex-col">
        <label htmlFor="businessName" className="text-base font-medium text-slate-500">
          Nombre comercial
        </label>
        <p className="self-start mt-3 text-xs font-medium text-slate-500">
          Nombre comercial de tu negocio
        </p>
      </div>
      <label htmlFor="rfc" className="self-end mt-20 text-xs font-medium text-slate-500 max-md:mt-10">
        RFC
      </label>
    </div>
    <div className="flex flex-wrap gap-4 mt-3 text-sm leading-none text-slate-500 max-md:max-w-full">
      <input
        id="businessName"
        type="text"
        placeholder="Ingresar dato"
        className="overflow-hidden grow px-5 py-3 rounded-lg border border-gray-400 border-solid bg-stone-50 w-fit max-md:pr-5"
      />
      <input
        id="rfc"
        type="text"
        placeholder="Ingresar dato"
        className="overflow-hidden grow px-5 py-3 rounded-lg border border-gray-400 border-solid bg-stone-50 w-fit max-md:pr-5"
      />
    </div>
    <label htmlFor="legalRepresentative" className="block mt-8 text-base font-medium text-slate-500">
      Persona moral
    </label>
    <p className="mt-3 text-xs font-medium text-slate-500">
      Nombre y apellido representante legal del negocio
    </p>
    <input
      id="legalRepresentative"
      type="text"
      placeholder="Ingresar dato"
      className="overflow-hidden px-5 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500 max-md:pr-5 max-md:max-w-full w-full"
    />
    <div className="mt-4 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <label htmlFor="businessType" className="text-xs font-medium text-slate-500">
            Giro de tu negocio
          </label>
          <select
            id="businessType"
            className="flex overflow-hidden gap-10 justify-center px-5 py-3 mt-3 text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500"
          >
            <option>Giro de tu negocio</option>
          </select>
          <label htmlFor="businessDescription" className="mt-4 text-xs font-medium text-slate-500">
            Descripción de tu negocio
          </label>
          <textarea
            id="businessDescription"
            placeholder="Ingresar dato"
            className="overflow-hidden px-5 pt-3 pb-20 mt-3 max-w-full text-sm leading-none rounded-lg border border-gray-400 border-solid bg-stone-50 text-slate-500 w-[300px] max-md:pr-5 max-md:mr-0.5"
          ></textarea>
        </div>
      </div>
    </div>
  </section>
);

const BusinessSchedule = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Todos los días'];

  return (
    <section className="mt-8">
      <h3 className="text-xs font-medium text-slate-500 mb-3">Horario de servicio</h3>
      <div className="flex gap-3.5 mt-3 max-md:ml-0.5">
        <div className="flex overflow-hidden gap-5 justify-end px-4 py-3 rounded-lg border border-gray-400 border-solid bg-stone-50">
          <span>00:00 pm</span>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c8ab00046bc25944d00f25850f6950a38fee8546ced4186830651a8f8199867?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="" className="object-contain shrink-0 w-4 aspect-square" />
        </div>
        <span className="my-auto text-xs font-medium text-slate-500">a:</span>
        <div className="flex overflow-hidden gap-5 justify-end px-4 py-3 rounded-lg border border-gray-400 border-solid bg-stone-50">
          <span>00:00 pm</span>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e52672a3756ebcf7528678e92472d05ea1c773ce37e296223264eecc0fcfa971?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="" className="object-contain shrink-0 w-4 aspect-square" />
        </div>
      </div>
      <h3 className="mt-4 ml-4 text-xs font-medium text-slate-500 max-md:ml-2.5">DÍAS de servicio</h3>
      <div className="flex flex-wrap gap-3 mt-4 whitespace-nowrap max-md:mr-0.5">
        {days.map((day, index) => (
          <div key={index} className="flex items-center gap-2">
            <img loading="lazy" src={`http://b.io/ext_${9 + index}-`} alt="" className="object-contain shrink-0 w-6 aspect-square" />
            <span>{day}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const BusinessAddress = () => (
  <section className="mt-8">
    <label htmlFor="businessAddress" className="text-xs font-medium text-slate-500">
      Dirección de tu negocio
    </label>
    <input
      id="businessAddress"
      type="text"
      className="flex shrink-0 mt-3 w-full h-12 bg-white rounded-lg border border-gray-400 border-solid"
      placeholder="Ingrese la dirección"
    />
  </section>
);

const BusinessPhotos = () => (
  <section className="flex overflow-hidden flex-col mt-4 w-full rounded-xl bg-neutral-200 shadow-[0px_0px_12px_rgba(89,89,89,0.16)] max-md:mr-1.5 max-md:max-w-full">
    <div className="px-20 pt-9 pb-16 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-20 max-md:mt-10">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d9167d6ec6e943346445f079ef965169f62e783713964fb675b42c3912ef86f?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="Business photo 1" className="object-contain self-end aspect-[1.2] w-[59px]" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d9167d6ec6e943346445f079ef965169f62e783713964fb675b42c3912ef86f?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="Business photo 2" className="object-contain aspect-[1.2] w-[59px]" />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
          <div className="flex gap-10 items-start max-md:mt-10">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e12af4bfe0fc912796434818e8480a420d0d8675df775ad31d8e16e0cc2ad52a?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="Business photo 3" className="object-contain shrink-0 self-end mt-11 aspect-[1.09] w-[59px] max-md:mt-10" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e12af4bfe0fc912796434818e8480a420d0d8675df775ad31d8e16e0cc2ad52a?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="Business photo 4" className="object-contain shrink-0 self-start aspect-[1.09] w-[59px]" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BusinessForm = () => (
  <form className="flex flex-col pt-8 pb-20 pl-4 mt-14 w-full bg-white rounded-2xl border border-gray-100 border-solid shadow-lg max-w-[633px] max-md:mt-10 max-md:max-w-full">
    <BusinessDetails />
    <BusinessSchedule />
    <BusinessAddress />
    <BusinessPhotos />
    <button
      type="submit"
      className="self-center px-16 py-3.5 mt-16 max-w-full text-lg font-semibold text-orange-100 whitespace-nowrap rounded-lg bg-slate-700 shadow-[0px_6px_28px_rgba(0,0,0,0.16)] w-[250px] max-md:px-5 max-md:mt-10"
    >
      Continuar
    </button>
  </form>
);

const View17 = () => {
  return (
    <main className="flex overflow-hidden flex-col items-center pb-28 bg-white max-w-[744px] max-md:pb-24">
      <Header />
      <section className="mt-10 text-2xl font-bold text-center text-slate-700 max-md:max-w-full">
        <h1 className="text-slate-700">¡Cuentanos sobre ustedes!</h1>
        <p className="text-xl text-slate-700 mt-4">
          Para personalizar el perfil te pedimos que respondas los siguientes campos
        </p>
      </section>
      <ProfilePhoto />
      <BusinessForm />
    </main>
  );
};

export default View17;