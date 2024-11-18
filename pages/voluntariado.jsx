'use client';

import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { createVolunteer, getAllVolunteers } from './api/api_volunteer';

const Voluntario = () => {
  const [association, setAssociation] = useState({
    name: '',
    address: '',
    contact: '',
    activities: '',
  });

  const [volunteers, setVolunteers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssociation((prev) => ({ ...prev, [name]: value }));
  };

  const fetchVolunteers = async () => {
    try {
      const data = await getAllVolunteers();
      setVolunteers(data.data);
    } catch (error) {
      console.error('Error al obtener voluntarios:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await createVolunteer(association);
      if (response.success) {
        setSubmitted(true);
        setAssociation({
          name: '',
          address: '',
          contact: '',
          activities: '',
        });
        toast.success('Participación exitosa');
        fetchVolunteers();
      } else {
        toast.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      toast.error('Error en la solicitud');
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
        <h2 className="text-2xl font-semibold mb-4">Detalles de la Asociación</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            name="name"
            placeholder="Nombre de la asociación"
            value={association.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]"
          />
          <input
            name="address"
            placeholder="Dirección"
            value={association.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]"
          />
          <input
            name="contact"
            placeholder="Contacto"
            value={association.contact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]"
          />
          <textarea
            name="activities"
            placeholder="Actividades que requieren voluntarios"
            value={association.activities}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] h-32 resize-none"
          />
        </div>
      </section>

      <section>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Participar
        </button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Voluntarios</h2>
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
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          ¡Tu Participación Puede Hacer Una Gran Diferencia!
        </h2>
        <p className="text-lg text-center text-white">
          Gracias por considerar unirte a estas organizaciones y ayudar a construir una comunidad más inclusiva y solidaria.
        </p>
      </section>
    </div>
  );
};

export default Voluntario;
