'use client';

import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { createVolunteer, getAllVolunteers } from './api/api_volunteer';
import { useRouter } from 'next/router';

const Voluntario = () => {
  const [volunteers, setVolunteers] = useState([]);
  const router = useRouter();
  const handleRedireccion = () => router.push('/solicitud-voluntario');

  const fetchVolunteers = async () => {
    try {
      const data = await getAllVolunteers();
      setVolunteers(data.data);
    } catch (error) {
      console.error('Error al obtener voluntarios:', error);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold text-center">
        Explora Oportunidades de Voluntariado en Instituciones Accesibles
      </h1>
      <p className="text-lg text-center">
        <strong>En AccesoGo,</strong> creemos que ser voluntario es una manera más de apoyar a las Personas con Discapacidad y contribuir a una Comunidad Inclusiva.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Instituciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <div className="font-bold text-lg mb-2">
                {volunteer.name || 'Nombre no disponible'}
              </div>
              <div className="text-gray-700">
                <p><strong>Contacto:</strong> {volunteer.contact || 'No disponible'}</p>
                <p><strong>Ubicación:</strong> {volunteer.address || 'No disponible'}</p>
                <p><strong>Actividades:</strong> {volunteer.activities || 'No especificadas'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <button
          onClick={handleRedireccion}
          className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Solicitar voluntario
        </button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">¿Cómo participar?</h2>
        <ol className="list-decimal space-y-2 pl-4">
          <li>
            <strong>Explora las instituciones:</strong> Revisa nuestro listado de instituciones. Cada una tiene su programa de voluntariado que busca personas comprometidas y apasionadas.
          </li>
          <li>
            <strong>Explora sobre sus Actividades:</strong> Visita sus sitios web a través de los enlaces que te proporcionamos para conocer más sobre sus programas y las oportunidades disponibles.
          </li>
          <li>
            <strong>Ponte en contacto con las Instituciones:</strong> Comunícate directamente con ellas para expresar tu interés y obtener detalles de cómo puedes colaborar.
          </li>
        </ol>
      </section>

      <section className="bg-[url('/raultemporaryImages/imagenCardPremium.png')] bg-cover bg-center p-8 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4 text-black">
          ¡Tu Participación Puede Hacer Una Gran Diferencia!
        </h2>
        <p className="text-lg text-center text-black">
          Gracias por considerar unirte a estas organizaciones y ayudar a construir una comunidad más inclusiva y solidaria.
        </p>
      </section>
    </div>
  );
};

export default Voluntario;
