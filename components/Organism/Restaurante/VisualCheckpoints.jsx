import React, { useState, useEffect } from "react";
import { createHotelAccessibility } from "@/pages/api/api_questionnaire"; // Ajusta la ruta del archivo según tu estructura

const RestVisualCheckpoints = () => {
  const [visual, setVisual] = useState({
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "Hay señalización táctil o en braille en la entrada del restaurante.", response: false },
          { question: "Se cuenta con rutas accesibles y bien señalizadas hacia la entrada principal.", response: false },
          { question: "Las puertas de acceso tienen texturas o contrastes visuales para ser identificadas fácilmente.", response: false },
        ],
      },
      {
        name: "Circulación Interior",
        questions: [
          { question: "Los pasillos y rutas dentro del restaurante están bien señalizados con alto contraste.", response: false },
          { question: "Existen guías táctiles en el piso o sistemas podotáctiles para ayudar en la orientación.", response: false },
          { question: "Las mesas y el mobiliario tienen bordes contrastantes para su identificación.", response: false },
        ],
      },
      {
        name: "Mobiliario",
        questions: [
          { question: "Las cartas o menús están disponibles en formatos accesibles (braille, texto ampliado, o digitales con lector de pantalla).", response: false },
          { question: "Las áreas de servicio están bien iluminadas y señalizadas.", response: false },
        ],
      },
      {
        name: "Señalización",
        questions: [
          { question: "Las señalizaciones importantes (salidas de emergencia, baños, etc.) tienen alto contraste y están en braille.", response: false },
          { question: "Hay asistencia auditiva o personal capacitado para guiar a personas con discapacidad visual.", response: false },
        ],
      },
      {
        name: "Sanitarios",
        questions: [
          { question: "Los baños cuentan con señalización táctil o braille.", response: false },
          { question: "Los interruptores y dispensadores están bien ubicados y marcados de forma accesible.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El restaurante cuenta con señalización accesible para personas con discapacidad visual en las áreas de estacionamiento.", response: false },
          { question: "Hay asistencia o guía disponible para el desplazamiento desde el estacionamiento al restaurante.", response: false },
        ],
      },
      {
        name: "Perros Guía",
        questions: [
          { question: "El restaurante acepta perros guía y ofrece acceso sin restricciones para ellos.", response: false },
          { question: "Hay áreas designadas donde los perros guía pueden descansar mientras sus dueños comen.", response: false },
        ],
      },
    ],
  });

  const [hotelId, setHotelId] = useState(null);

  // Obtener hotelId desde localStorage al montar el componente
  useEffect(() => {
    const id = localStorage.getItem('hotelId');
    setHotelId(id);
  }, []);

  const handleCheckboxChange = (sectionIndex, questionIndex) => {
    // Crear una copia inmutable del estado
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

    // Actualizar el estado
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
      <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas Visual</h2>
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
      <div className="flex justify-center w-full">
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

export default RestVisualCheckpoints;
