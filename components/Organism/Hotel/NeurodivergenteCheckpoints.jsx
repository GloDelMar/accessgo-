import React, { useState, useEffect } from "react";
import { createHotelAccessibility } from "@/pages/api/api_questionnaire"; // Adjust the import based on your actual file structure


const NeurodivergentesCheckpoints = () => {
  const [neurodivergent, setNeurodivergent] = useState({
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "La entrada al hotel tiene señalización clara y sencilla, con rutas visuales fáciles de seguir.", response: false },
          { question: "Existen zonas de espera tranquilas, con luz tenue y sin ruido excesivo para quienes necesiten menos estimulación sensorial.", response: false },
        ],
      },
      {
        name: "Habitaciones",
        questions: [
          { question: "Las habitaciones tienen opciones de iluminación suave, regulable, y están libres de estímulos visuales o auditivos intrusivos.", response: false },
          { question: "Las habitaciones se encuentran organizadas de manera estructurada y sin decoración excesiva para reducir la sobrecarga sensorial.", response: false },
          { question: "Existe la opción de seleccionar una habitación en una zona más tranquila del hotel (alejada de ascensores o áreas comunes).", response: false },
        ],
      },
      {
        name: "Baños",
        questions: [
          { question: "Los baños en las habitaciones y áreas comunes tienen señalización sencilla y clara, con símbolos fáciles de entender.", response: false },
          { question: "Las instrucciones de uso para las duchas y otros dispositivos están explicadas visualmente de manera clara y simple.", response: false },
        ],
      },
      {
        name: "Áreas Comunes y Recreativas",
        questions: [
          { question: "Las áreas comunes cuentan con zonas de menor estimulación sensorial, donde se pueda descansar de ruidos o luces intensas.", response: false },
          { question: "Las actividades recreativas tienen opciones para ser realizadas en un ambiente controlado sensorialmente, con luz y sonido suaves.", response: false },
        ],
      },
      {
        name: "Señalización General",
        questions: [
          { question: "Todas las señales dentro del hotel (salidas de emergencia, ascensores, áreas de servicios) están diseñadas de manera clara y sin sobrecarga visual.", response: false },
          { question: "Existen mapas visuales sencillos que permiten a los huéspedes neurodivergentes orientarse fácilmente por el hotel.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El hotel tiene señalización visual clara y sencilla en las áreas de estacionamiento, con colores o símbolos que ayuden a la orientación.", response: false },
          { question: "Hay rutas visualmente claras desde el estacionamiento hasta las entradas principales del hotel.", response: false },
        ],
      },
      {
        name: "Personal Capacitado",
        questions: [
          { question: "El personal del hotel está capacitado en la sensibilización neurodivergente y está preparado para ofrecer interacciones comprensivas, calmas y no invasivas.", response: false },
          { question: "Existe la opción de informar al personal sobre las necesidades sensoriales de los huéspedes para adaptar la experiencia.", response: false },
        ],
      },
      {
        name: "Perros de Asistencia o de Terapia",
        questions: [
          { question: "El hotel acepta perros de asistencia o terapia para apoyar a personas neurodivergentes que puedan requerir su compañía.", response: false },
        ],
      },
      {
        name: "Asistencia en Actividades",
        questions: [
          { question: "Si el hotel organiza actividades, estas tienen guías o instructores capacitados para adaptar las explicaciones y reducir la estimulación sensorial, según las necesidades de los huéspedes neurodivergentes.", response: false },
        ],
      },
    ],
  });

  const [hotelId, setHotelId] = useState(null);

  // Obtener hotelId desde localStorage al montar el componente
  useEffect(() => {
    const id = localStorage.getItem('userId');
    setHotelId(id);
  }, []);


  const handleCheckboxChange = (sectionIndex, questionIndex) => {
    const updatedSections = neurodivergent.sections.map((section, sIndex) => {
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

    setNeurodivergent({ sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (hotelId) {
      try {
        const payload = {
          hotelId,
          disabilities: [
            {
              type: "Neurodivergentes", // Specify the disability type
              sections: neurodivergent.sections
                .map((section) => ({
                  name: section.name,
                  questions: section.questions.filter((question) => question.response),
                }))
                .filter((section) => section.questions.length > 0),
            },
          ],
        };

        const response = await createHotelAccessibility(payload);

        if (response?.status === 200 || response?.status === 201) {
          alert("Datos guardados exitosamente en el servidor.");
        } else {
          throw new Error("Error al guardar los datos en el servidor.");
        }
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Error al guardar los datos.");
      }
    } else {
      alert("No se encontró un ID de hotel válido.");
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas Neurodivergentes</h2>
      </div>
      {neurodivergent.sections.map((section, sectionIndex) => (
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

export default NeurodivergentesCheckpoints;