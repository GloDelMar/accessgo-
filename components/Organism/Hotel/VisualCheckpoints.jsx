import React, { useState, useEffect } from "react";
import { createHotelAccessibility } from "@/pages/api/api_questionnaire"; // Ajusta la ruta del archivo según tu estructura

const VisualCheckpoints = () => {
  const [visual, setVisual] = useState({
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "El hotel cuenta con señalización táctil o en braille en las entradas.", response: false },
          { question: "Las rutas hacia la entrada y las áreas comunes están marcadas con guías táctiles o sistemas podotáctiles.", response: false },
          { question: "Las puertas de acceso tienen texturas o contrastes visuales para su fácil identificación.", response: false },
        ],
      },
      {
        name: "Habitaciones",
        questions: [
          { question: "Las habitaciones adaptadas tienen numeración en braille y texto con alto contraste.", response: false },
          { question: "Los interruptores, enchufes y dispositivos electrónicos tienen señalización accesible.", response: false },
          { question: "Hay guías táctiles o rutas visualmente contrastantes para moverse dentro de la habitación.", response: false },
        ],
      },
      {
        name: "Baños",
        questions: [
          { question: "Los baños tienen señalización en braille o táctil para identificar las áreas (inodoro, ducha, etc.).", response: false },
          { question: "Los dispensadores de jabón y papel están marcados de manera accesible.", response: false },
        ],
      },
      {
        name: "Áreas Comunes y Recreativas",
        questions: [
          { question: "Las áreas comunes tienen guías táctiles o señalización con alto contraste para ayudar en la orientación.", response: false },
          { question: "Hay mapas en relieve o con braille disponibles para la orientación en el hotel.", response: false },
          { question: "Las albercas y áreas recreativas cuentan con señalización accesible y asistencia si es necesario.", response: false },
        ],
      },
      {
        name: "Señalización General",
        questions: [
          { question: "Toda la señalización del hotel (salidas de emergencia, ascensores, áreas de servicios) tiene alto contraste y braille.", response: false },
          { question: "Los ascensores tienen botones en braille y señales auditivas para indicar el piso.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El hotel ofrece asistencia o guías para personas con discapacidad visual en el estacionamiento.", response: false },
          { question: "Hay señalización accesible en las áreas de estacionamiento, con indicadores táctiles o visualmente contrastantes.", response: false },
        ],
      },
      {
        name: "Perros Guía",
        questions: [
          { question: "El hotel acepta perros guía y ofrece acceso sin restricciones para ellos.", response: false },
          { question: "Hay áreas designadas para el descanso de perros guía dentro del hotel.", response: false },
        ],
      },
      {
        name: "Asistencia y Personal",
        questions: [
          { question: "El personal del hotel está capacitado para asistir a personas con discapacidad visual.", response: false },
          { question: "Hay servicio de guías o asistencia disponible para el desplazamiento en áreas clave.", response: false },
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
    const updatedSections = visual.sections.map((section, sIndex) => {
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

    setVisual({ sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (hotelId) {
      try {
        const payload = {
          hotelId,
          disabilities: [
            {
              type: "Visual", // Tipo de discapacidad
              sections: visual.sections
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
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con Discapacidad Visual</h2>
      </div>
      {visual.sections.map((section, sectionIndex) => (
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

export default VisualCheckpoints;
