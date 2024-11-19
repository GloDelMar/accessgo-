import React, { useState, useEffect } from 'react';
import { checkIfAccessibilityExists, createHotelAccessibility, updateHotelAccessibility } from '@/pages/api/api_questionnaire';


const AuditivaCheckpoints = () => {
  const [auditivaData, setAuditivaData] = useState({
    type: "Auditiva",
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "El hotel tiene señalización visual clara en las entradas y salidas, utilizando símbolos y texto.", response: false, },
          { question: "Hay alarmas visuales (luces intermitentes) en caso de emergencia en todas las áreas de entrada.", response: false, },
        ],
      },
      {
        name: "Habitaciones",
        questions: [
          { question: "Las habitaciones están equipadas con alarmas visuales (luces intermitentes) para emergencias.", response: false },
          { question: "Las habitaciones cuentan con dispositivos visuales o vibratorios para llamadas a la puerta.", response: false },
          { question: "El televisor tiene subtítulos disponibles para los huéspedes.", response: false },
        ],
      },
      {
        name: "Baños",
        questions: [
          { question: "Los baños tienen alarmas visuales de emergencia.", response: false },
          { question: "Los dispensadores y otras instalaciones están bien señalizadas con texto y símbolos.", response: false },
        ],
      },
      {
        name: "Áreas Comunes y Recreativas",
        questions: [
          { question: "Las áreas comunes tienen alarmas visuales (luces intermitentes) y señalización clara en caso de emergencia.", response: false },
          { question: "Los servicios ofrecidos en las áreas recreativas tienen señalización visual adecuada y personal capacitado.", response: false },
        ],
      },
      {
        name: "Señalización General",
        questions: [
          { question: "Todas las áreas del hotel (salidas de emergencia, ascensores, áreas de servicios) tienen señalización visual clara.", response: false },
          { question: "Los ascensores están equipados con señales visuales para indicar los pisos y las direcciones.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El hotel tiene señalización visual clara y alarmas visuales en las áreas de estacionamiento.", response: false },
          { question: "Hay guías visuales para facilitar la evacuación en caso de emergencia.", response: false },
        ],
      },
      {
        name: "Perros de Servicio",
        questions: [
          { question: "El hotel acepta perros de servicio auditivo y permite su acceso sin restricciones.", response: false },
          { question: "Hay áreas designadas para el descanso de perros de servicio auditivo dentro del hotel.", response: false },
        ],
      },
      {
        name: "Asistencia y Personal",
        questions: [
          { question: "El personal del hotel está capacitado en lengua de señas o tiene acceso a intérpretes.", response: false },
          { question: "Hay dispositivos de asistencia auditiva disponibles (como bucles de inducción o sistemas de amplificación).", response: false },
        ],
      },
    ],
  });

  const [hotelId, setHotelId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setHotelId(id);
  }, []);

  const handleCheckboxChange = (sectionIndex, questionIndex) => {
    const updatedSections = auditivaData.sections.map((section, sIndex) => {
      if (sIndex === sectionIndex) {
        return {
          ...section,
          questions: section.questions.map((question, qIndex) =>
            qIndex === questionIndex
              ? { ...question, response: !question.response }
              : question
          ),
        };
      }
      return section;
    });

    setAuditivaData({ ...auditivaData, sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (hotelId) {
      try {
        // Prepara el payload para el cuestionario
        const payload = {
          hotelId,
          disabilities: [
            {
              type: auditivaData.type,
              sections: auditivaData.sections
                .map((section) => ({
                  name: section.name,
                  questions: section.questions.filter((question) => question.response),
                }))
                .filter((section) => section.questions.length > 0),
            },
          ],
        };
  
        // Verifica si el cuestionario ya existe
        const existingData = await checkIfAccessibilityExists(hotelId, auditivaData.type);
  
        let response;
        if (existingData) {
          // Si existe, actualiza
          response = await updateHotelAccessibility(existingData._id, payload);
        } else {
          // Si no existe, crea
          response = await createHotelAccessibility(payload);
        }
  
        console.log("Respuesta del servidor:", response);
        alert('Información de accesibilidad para personas con discapacidad Auditiva enviada correctamente');
      } catch (error) {
        console.error('Error al enviar el cuestionario:', error);
        alert('Error al enviar el cuestionario');
      }
    }
  };
  return (
    <div>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con Discapacidad Auditiva</h2>
      </div>
      {auditivaData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mt-4">
          <h4 className="text-lg font-semibold mb-2">{section.name}:</h4>
          <ul className="list-none">
            {section.questions.map((question, questionIndex) => (
              <li key={questionIndex}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={question.response}
                    onChange={() => handleCheckboxChange(sectionIndex, questionIndex)}
                  />
                  {question.question}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className='flex justify-center w-full'>
        <button
          onClick={handleSubmit}
          className="bg-[#2F4F4F] text-white flex px-4 py-2 rounded mt-4"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default AuditivaCheckpoints;
