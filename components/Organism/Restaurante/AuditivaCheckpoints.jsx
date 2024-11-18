import React, { useState, useEffect } from "react";
import { createRestaurantAccessibility } from "@/pages/api/api_questionnaire"; // Ajusta la ruta del archivo según tu estructura

const RestAuditivaCheckpoints = () => {
  const [auditiva, setAuditiva] = useState({
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "Las señales de entrada y salida están claramente indicadas con símbolos visuales.", response: false },
          { question: "Hay alarmas visuales (luces intermitentes) en caso de emergencia.", response: false },
        ],
      },
      {
        name: "Circulación Interior",
        questions: [
          { question: "El personal está capacitado en lengua de señas o hay un servicio de intérprete disponible.", response: false },
          { question: "Existen pantallas o señalización digital visual para informar sobre los servicios, menús o promociones.", response: false },
        ],
      },
      {
        name: "Mobiliario",
        questions: [
          { question: "El restaurante ofrece dispositivos visuales de llamada en las mesas (por ejemplo, luces o sistemas vibratorios).", response: false },
          { question: "Las áreas de servicio y el mobiliario tienen señalización visual adecuada para facilitar la orientación.", response: false },
        ],
      },
      {
        name: "Señalización",
        questions: [
          { question: "La señalización de emergencia está reforzada con alarmas visuales (luces intermitentes) y texto claro.", response: false },
          { question: "Hay sistemas de comunicación visual disponibles para los clientes, como pantallas o menús digitales.", response: false },
        ],
      },
      {
        name: "Sanitarios",
        questions: [
          { question: "Los baños están equipados con señales visuales de emergencia (luces o pantallas).", response: false },
          { question: "La señalización dentro de los baños es clara y visible, con símbolos visuales.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El restaurante cuenta con señalización visual en las áreas de estacionamiento para personas con discapacidad auditiva.", response: false },
          { question: "Hay alarmas visuales o guías indicativas para la evacuación en caso de emergencia.", response: false },
        ],
      },
      {
        name: "Perros de Servicio",
        questions: [
          { question: "El restaurante acepta perros de servicio auditivo y permite su acceso sin restricciones.", response: false },
          { question: "Hay áreas designadas donde los perros de servicio auditivo pueden descansar mientras sus dueños comen.", response: false },
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
    const updatedSections = auditiva.sections.map((section, sIndex) => {
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

    setAuditiva({ sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (restaurantId) {
      try {
        const payload = {
          restaurantId,
          disabilities: [
            {
              type: "Auditiva", // Tipo de discapacidad
              sections: auditiva.sections
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
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con discapacidad Auditiva</h2>
      </div>
      {auditiva.sections.map((section, sectionIndex) => (
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

export default RestAuditivaCheckpoints;
