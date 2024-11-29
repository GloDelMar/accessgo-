import React, { useState } from 'react'
import { createVolunteer } from './api/api_volunteer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const SolicitudVoluntario = () => {

  const [association, setAssociation] = useState({
    name: '',
    address: '',
    contact: '',
    activities: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssociation((prev) => ({ ...prev, [name]: value }));
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
        toast.success('Datos enviados correctamente');
        router.push('/voluntariado');
      } else {
        toast.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      toast.error('Error en la solicitud');
    }
  };

  return (
    <>
      <section>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
          Enviar
        </button>
      </section>
    </>
  )
}

export default SolicitudVoluntario