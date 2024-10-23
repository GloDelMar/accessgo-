import React, { useState } from 'react'; // Importa useState solo una vez
import Link from 'next/link';

const ProfileCard = ({ name }) => (
  <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col grow px-5 py-10 w-full text-2xl font-medium leading-none text-center text-black whitespace-nowrap bg-white rounded-3xl border border-gray-100 border-solid shadow-lg max-md:mt-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e3daf47cc4d48f90b028d56cf11af6dab8ced9625bcc7732ba4f52e4ab6ed6e?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0"
        alt="Profile picture"
        className="object-contain aspect-[0.9] rounded-[100px] w-[188px]"
      />
      <div className="self-center mt-12 max-md:mt-10">{name}</div>
    </div>
  </div>
);

const RatingSection = () => {
  const [showAllComments, setShowAllComments] = useState(false);
  const comments = [
    "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones",
    "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones",
    "Additional comment 1",
    "Additional comment 2",
  ];

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
      <section className="flex flex-col items-start px-8 pt-6 pb-11 mx-auto w-full text-xl font-medium text-center text-cyan-900 bg-white rounded-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-4 leading-tight">
          <div className="grow">Tu calificación es de :</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ad3e0d4f70d2d1a1e52ea1e08da5b3651e93af814fe7e929b73d7b9efaa942c?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0"
            alt="Rating stars"
            className="object-contain shrink-0 my-auto w-28 max-w-full aspect-[5.59]"
          />
        </div>
        <h3 className="mt-10 leading-tight">Ultimos comentarios:</h3>
        <div className="flex flex-col gap-5 self-stretch mt-10 text-xs leading-6 text-slate-700">
          {displayedComments.map((comment, index) => (
            <div key={index} className="px-2 pt-1.5 pb-4 bg-lime-50">
              {comment}
            </div>
          ))}
        </div>
        <button
          className="px-2.5 py-0.5 mt-11 text-base bg-lime-50 rounded-[30px] max-md:mt-10"
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments ? "Mostrar menos" : "Todos los comentarios"}
        </button>
      </section>
    </div>
  );
};

const ImageGallery = () => {
  const images = [
    // Lista de imágenes...
  ];

  return (
    <div className="flex flex-wrap gap-10 self-start mt-12 max-md:mt-10">
      {images.map((image, index) => (
        <img
          key={index}
          loading="lazy"
          src={image.src}
          alt={image.alt}
          className={image.className}
        />
      ))}
    </div>
  );
};

const EventTable = () => {
  const [events, setEvents] = useState([
    { evento: 'Evento de ejemplo', fecha: '2024-10-18', horario: '10:00 AM' },
  ]);

  const addEvent = () => {
    setEvents([...events, { evento: '', fecha: '', horario: '' }]);
  };

  const updateEvent = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div className="overflow-x-auto w-full mt-10">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">EVENTO</th>
            <th className="py-2 px-4 border-b">FECHA</th>
            <th className="py-2 px-4 border-b">HORARIO</th>
            <th className="py-2 px-4 border-b">EDITAR</th>
            <th className="py-2 px-4 border-b">ELIMINAR</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={event.evento}
                  onChange={(e) => updateEvent(index, 'evento', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="date"
                  value={event.fecha}
                  onChange={(e) => updateEvent(index, 'fecha', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="time"
                  value={event.horario}
                  onChange={(e) => updateEvent(index, 'horario', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => alert('Editar evento en desarrollo')}
                >
                  Editar
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={() => deleteEvent(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={addEvent}
      >
        Agregar Nueva Fila
      </button>
    </div>
  );
};

// Exporta solo el componente principal como default
const sesionPremium = () => {
  return (
    <main className="flex overflow-hidden flex-col items-center px-20 pt-28 bg-white pb-[1572px] max-md:px-5 max-md:py-24">
      <div className="flex flex-col ml-7 max-w-full w-[806px]">
        <h1 className="self-center text-6xl font-bold leading-none text-slate-700 max-md:text-4xl">
          ¡Bienvenido!
        </h1>
        <div className="flex flex-col pl-3.5 mt-14 w-full max-md:mt-10 max-md:max-w-full">
          <div className="max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <ProfileCard name="nombre" />
              <RatingSection />
            </div>
          </div>
          <h2 className="self-start mt-20 ml-4 text-xl font-medium leading-tight text-center text-cyan-900 max-md:mt-10 max-md:ml-2.5">
            Cambia tus imagenes
          </h2>
        </div>
        <ImageGallery />
        <EventTable />
      </div>

      <div className="flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]">
        <button className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          <Link legacyBehavior href="/cardPremium10"><a>Cancelar</a></Link>
        </button>
        <button className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center">
          <Link legacyBehavior href="/22/sesionPremium"><a>Guardar Cambios</a></Link>
        </button>
      </div>
    
    </main>

  );
};

export default sesionPremium;
