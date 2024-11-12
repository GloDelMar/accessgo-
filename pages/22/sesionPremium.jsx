import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ProfileCard = ({ name }) => (
  <div className="flex flex-col w-full md:w-[48%] lg:w-[31%] max-sm:ml-0">
    <div className="flex flex-col grow px-5 py-10 w-full text-2xl font-medium leading-none text-center text-black whitespace-nowrap bg-white rounded-3xl border border-gray-100 border-solid shadow-lg mt-10 md:mt-0">
      <Image
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e3daf47cc4d48f90b028d56cf11af6dab8ced9625bcc7732ba4f52e4ab6ed6e?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0"
        alt="Profile picture"
        width={188}
        height={188}
        className="object-contain aspect-[0.9] rounded-[100px]"
      />
      <div className="self-center mt-12 md:mt-10">{name}</div>
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
    <div className="flex flex-col w-full md:w-[48%] max-sm:ml-0">
      <section className="flex flex-col items-start px-8 pt-6 pb-11 mx-auto w-full text-xl font-medium text-center text-cyan-900 bg-white rounded-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mt-10 md:mt-0">
        <div className="flex gap-4 leading-tight">
          <div className="grow">Tu calificación es de :</div>
          <Image
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ad3e0d4f70d2d1a1e52ea1e08da5b3651e93af814fe7e929b73d7b9efaa942c?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0"
            alt="Rating stars"
            width={112}
            height={32}
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
          className="px-2.5 py-0.5 mt-11 text-base bg-lime-50 rounded-[30px] md:mt-10"
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments ? "Mostrar menos" : "Todos los comentarios"}
        </button>
      </section>
    </div>
  );
};

const ImageUploaderSection = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeAllImages = () => {
    setImages([]);
  };

  return (
    <div className="flex items-center gap-4 mt-10">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="w-24 h-24 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center hover:border-primary transition-colors">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
      </label>

      <div className="flex-1 flex gap-4 overflow-x-auto py-2">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="relative min-w-24 w-24 h-24 border rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`Uploaded image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-w-24 w-24 h-24 border rounded-lg flex items-center justify-center bg-muted"
            >
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 8a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          ))
        )}
      </div>

      <button
        className="w-24 h-24 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center hover:border-primary transition-colors"
        onClick={removeAllImages}
      >
        <Trash2 className="w-8 h-8 text-muted-foreground" />
      </button>
    </div>
  );
};

const ProfileVisitsChart = () => {
  const currentYear = new Date().getFullYear();
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: `Visitas en ${currentYear}`,
        data: [12, 19, 3, 5, 2, 3, 10, 15, 8, 6, 7, 9], // Datos de ejemplo
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full mt-10">
      <h3 className="text-2xl font-bold mb-4">Visitas a tu perfil</h3>
      <Line data={data} options={options} />
    </div>
  );
};

const Table = ({ title, comments, headers }) => (
  <div className="w-full mt-10">
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="py-2 px-4 border-b">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b">Dato 1</td>
          <td className="py-2 px-4 border-b">Dato 2</td>
          <td className="py-2 px-4 border-b">Dato 3</td>
        </tr>
        {comments.map((comment, index) => (
          <tr key={index}>
            <td colSpan={headers.length} className="py-2 px-4 border-b bg-lime-50">
              {comment}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const sesionPremium = () => {
  const eventComments = [
    "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones",
    "Otro comentario sobre el evento",
  ];

  const promotionComments = [
    "Comentario sobre una promoción",
    "Otro comentario sobre una promoción",
  ];

  const menuComments = [
    "Comentario sobre el menú",
    "Otro comentario sobre el menú",
  ];

  return (
    <main className="flex overflow-hidden flex-col items-center px-4 sm:px-10 md:px-20 pt-28 bg-white pb-[1572px] max-sm:px-5 max-sm:py-24">
      <div className="flex flex-col ml-7 max-w-full w-full lg:w-[806px]">
        <h1 className="self-center text-4xl sm:text-5xl lg:text-6xl font-bold leading-none text-slate-700">
          ¡Bienvenido!
        </h1>
        <div className="flex flex-col pl-3.5 mt-14 w-full max-sm:mt-10 max-sm:max-w-full">
          <div className="max-sm:max-w-full">
            <div className="flex flex-col md:flex-row gap-5">
              <ProfileCard name="nombre" />
              <RatingSection />
            </div>
          </div>
          <h2 className="self-start mt-20 ml-4 text-xl font-medium leading-tight text-center text-cyan-900 max-sm:mt-10 max-sm:ml-2.5">
            Cambia tus imagenes
          </h2>
          <ImageUploaderSection /> {/* Use the new ImageUploaderSection component here */}
        </div>
        <Table title="Todos tus Eventos" comments={eventComments} headers={['EVENTO', 'FECHA', 'HORARIO']} />
        <Table title="Todas tus Promociones" comments={promotionComments} headers={['PROMOCIÓN', 'FECHA', 'HORARIO']} />
        <Table title="Tu Menú" comments={menuComments} headers={['PLATILLO', 'FECHA', 'HORARIO']} />
        <ProfileVisitsChart /> {/* Add the new ProfileVisitsChart component here */}
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