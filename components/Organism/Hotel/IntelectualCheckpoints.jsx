import React, { useState, useEffect } from "react";
import { createHotelAccessibility, checkIfAccessibilityExists, updateHotelAccessibility } from "@/pages/api/api_questionnaire";

const IntelectualCheckpoints = () => {
  const [intelectualData, setIntelectualData] = useState({
    type: "Intelectual",
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "La entrada del hotel tiene señalización clara y sencilla con pictogramas y símbolos fáciles de entender.", response: false },
          { question: "Hay personal disponible para asistir en la orientación y registro si es necesario.", response: false },
        ],
      },
      {
        name: "Habitaciones",
        questions: [
          { question: "Las habitaciones tienen instrucciones sencillas para el uso de las instalaciones (luces, televisor, teléfono).", response: false },
          { question: "La señalización de la habitación incluye números grandes, con símbolos visuales o colores para fácil identificación.", response: false },
        ],
      },
      {
        name: "Baños",
        questions: [
          { question: "Los baños tienen señales claras y sencillas para indicar las áreas de uso (inodoro, ducha, etc.).", response: false },
          { question: "Las instrucciones de uso de los dispositivos (grifos, ducha) están simplificadas y visualmente accesibles.", response: false },
        ],
      },
      {
        name: "Áreas Comunes y Recreativas",
        questions: [
          { question: "Las áreas comunes tienen señalización simple y clara, utilizando pictogramas o texto sencillo.", response: false },
          { question: "Las instrucciones para el uso de las áreas recreativas o albercas están simplificadas, con gráficos o imágenes.", response: false },
        ],
      },
      {
        name: "Señalización General",
        questions: [
          { question: "Todas las señales dentro del hotel (salidas de emergencia, ascensores, áreas de servicios) son fáciles de entender, con símbolos o pictogramas claros.", response: false },
          { question: "Existen mapas o guías visuales con instrucciones sencillas para moverse por el hotel.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El hotel tiene señalización visual clara y sencilla en las áreas de estacionamiento, utilizando símbolos y texto comprensible.", response: false },
          { question: "Hay asistencia disponible en el estacionamiento para orientar a las personas con discapacidad intelectual si es necesario.", response: false },
        ],
      },
      {
        name: "Personal Capacitado",
        questions: [
          { question: "El personal del hotel está capacitado para asistir a personas con discapacidad intelectual utilizando lenguaje claro y directo.", response: false },
          { question: "Hay personal disponible para ofrecer ayuda en situaciones que puedan requerir mayor orientación o explicación.", response: false },
        ],
      },
      {
        name: "Asistencia en Actividades",
        questions: [
          { question: "Si el hotel organiza actividades, estas tienen guías o instructores capacitados para incluir a personas con discapacidad intelectual, adaptando las explicaciones de forma clara y sencilla.", response: false },
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
    const updatedSections = intelectualData.sections.map((section, sIndex) => {
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

    const updatedData = { ...intelectualData, sections: updatedSections };
    setIntelectualData(updatedData);
  };

  const handleSubmit = async () => {
    if (hotelId) {
      try {
        // Prepara el payload para el cuestionario
        const payload = {
          hotelId,
          disabilities: [
            {
              type: intelectualData.type,
              sections: intelectualData.sections
                .map((section) => ({
                  name: section.name,
                  questions: section.questions.filter((question) => question.response),
                }))
                .filter((section) => section.questions.length > 0),
            },
          ],
        };
  
        // Verifica si el cuestionario ya existe
        const existingData = await checkIfAccessibilityExists(hotelId, intelectualData.type);
  
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
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con Discapacidad Intelectual</h2>
      </div>
      {intelectualData.sections.map((section, sectionIndex) => (
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
      </button></div>
    </div>
  );
};


export default IntelectualCheckpoints;
