import React, { useState, useEffect } from "react";
import { createRestaurantAccessibility } from "@/pages/api/api_questionnaire"; // Ajusta la ruta del archivo según tu estructura

const RestMotrizCheckpoints = () => {
  const [motriz, setMotriz] = useState({
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "El restaurante cuenta con rampas accesibles para sillas de ruedas.", response: false },
          { question: "Las puertas tienen un ancho mínimo de 90 cm para permitir el acceso.", response: false },
          { question: "Hay un camino accesible desde el estacionamiento hasta la entrada principal.", response: false },
        ],
      },
      {
        name: "Circulación Interior",
        questions: [
          { question: "Los pasillos tienen un ancho mínimo de 1.20 m para facilitar la circulación de sillas de ruedas.", response: false },
          { question: "Las mesas tienen una altura mínima de 70 cm en la parte inferior para permitir el acceso de sillas de ruedas.", response: false },
        ],
      },
      {
        name: "Mobiliario",
        questions: [
          { question: "Existen mesas reservadas y adaptadas para personas con movilidad reducida.", response: false },
          { question: "El mobiliario está dispuesto de forma que permite la movilidad de sillas de ruedas.", response: false },
        ],
      },
      {
        name: "Sanitarios",
        questions: [
          { question: "El restaurante cuenta con baños adaptados, con barras de apoyo.", response: false },
          { question: "Hay suficiente espacio en el baño para el giro de una silla de ruedas (mínimo 1.50 m de diámetro).", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El restaurante tiene plazas de estacionamiento reservadas para personas con discapacidad.", response: false },
          { question: "Los espacios de estacionamiento están señalizados y son accesibles.", response: false },
        ],
      },
    ],
  });

  const [restaurantId, setRestaurantId] = useState(null);

  // Obtener restaurantId desde localStorage al montar el componente
  useEffect(() => {
    const id = localStorage.getItem('restaurantId');
    setRestaurantId(id);
  }, []);

  const handleCheckboxChange = (sectionIndex, questionIndex) => {
    const updatedSections = motriz.sections.map((section, sIndex) => {
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

    setMotriz({ sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (restaurantId) {
      try {
        const payload = {
          restaurantId,
          disabilities: [
            {
              type: "Motriz", // Tipo de discapacidad
              sections: motriz.sections
                .map((section) => ({
                  name: section.name,
                  questions: section.questions.filter((question) => question.response),
                }))
                .filter((section) => section.questions.length > 0),
            },
          ],
        };

        const response = await createRestaurantAccessibility(payload);

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
      alert("No se encontró un ID de restaurante válido.");
    }
  };

  return (
    <div>
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con discapacidad Motriz</h2>
    </div>
    {motriz.sections.map((section, sectionIndex) => (
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
      <div className="text-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default RestMotrizCheckpoints;
