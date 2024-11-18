import React, { useState, useEffect } from "react";
import { createHotelAccessibility } from "@/pages/api/api_questionnaire"; // Ajusta la ruta del archivo según tu estructura

const RestIntelectualCheckpoints = () => {
  const [intelectual, setIntelectual] = useState({
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "La entrada del restaurante tiene señalización clara y sencilla, con símbolos fáciles de entender.", response: false },
          { question: "Hay personal disponible para asistir en la orientación si es necesario.", response: false },
        ],
      },
      {
        name: "Circulación Interior",
        questions: [
          { question: "Los pasillos y rutas dentro del restaurante están bien marcados con señales visuales sencillas.", response: false },
          { question: "Las áreas de tránsito están libres de obstáculos y bien iluminadas para facilitar la orientación.", response: false },
        ],
      },
      {
        name: "Mobiliario",
        questions: [
          { question: "Las cartas o menús están disponibles en versiones simplificadas con pictogramas o imágenes.", response: false },
          { question: "Los precios y descripciones de los alimentos están escritos de manera clara y en un lenguaje sencillo.", response: false },
        ],
      },
      {
        name: "Señalización",
        questions: [
          { question: "La señalización de emergencia está claramente marcada con pictogramas y texto simple.", response: false },
          { question: "Existen mapas o guías visuales con instrucciones claras para moverse dentro del restaurante.", response: false },
        ],
      },
      {
        name: "Sanitarios",
        questions: [
          { question: "Los baños cuentan con señalización clara y visible que incluye símbolos y colores fácilmente comprensibles.", response: false },
          { question: "Las instrucciones de uso de los dispositivos (grifos, secadores de manos, etc.) están escritas de manera sencilla o ilustradas.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El restaurante tiene señalización visual clara y sencilla en las áreas de estacionamiento.", response: false },
          { question: "Hay asistencia disponible para ayudar con el desplazamiento desde el estacionamiento hasta el restaurante si es necesario.", response: false },
        ],
      },
      {
        name: "Personal Capacitado",
        questions: [
          { question: "El personal está capacitado en atención a personas con discapacidad intelectual, utilizando un lenguaje sencillo y claro.", response: false },
          { question: "Hay personal disponible para ofrecer ayuda o asistencia en caso de que los clientes lo necesiten.", response: false },
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
    const updatedSections = intelectual.sections.map((section, sIndex) => {
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

    setIntelectual({ sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (hotelId) {
      try {
        const payload = {
          hotelId,
          disabilities: [
            {
              type: "Intelectual", // Tipo de discapacidad
              sections: intelectual.sections
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
      <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con discapacidad Intelectual</h2>
    </div>
    {intelectual.sections.map((section, sectionIndex) => (
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

export default RestIntelectualCheckpoints;
