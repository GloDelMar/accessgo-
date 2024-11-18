import React, { useState, useEffect } from "react";
import { createHotelAccessibility } from "@/pages/api/api_questionnaire"; // Ajusta la ruta del archivo según tu estructura

const RestNeurodivergenteCheckpoints = () => {
  const [neurodivergente, setNeurodivergente] = useState({
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "La entrada al restaurante tiene señalización clara y sencilla, con símbolos o gráficos que faciliten la orientación.", response: false },
          { question: "Existen zonas de espera o entrada libres de aglomeraciones y con ruido controlado.", response: false },
        ],
      },
      {
        name: "Ambiente Sensorial",
        questions: [
          { question: "El restaurante cuenta con zonas de menor estimulación sensorial, como áreas con menos ruido y luz tenue.", response: false },
          { question: "La iluminación del restaurante es regulable o hay opciones de áreas con luz suave, sin luces intermitentes.", response: false },
          { question: "La música de fondo o los sonidos ambientales están controlados y no resultan intrusivos para los clientes.", response: false },
        ],
      },
      {
        name: "Circulación Interior",
        questions: [
          { question: "Los pasillos y zonas de circulación están bien definidos, con señalización visual clara y sin distracciones excesivas.", response: false },
          { question: "El espacio está organizado de manera que minimiza la sobrecarga sensorial y permite una circulación fluida.", response: false },
        ],
      },
      {
        name: "Mobiliario",
        questions: [
          { question: "El mobiliario está organizado de manera estructurada y permite a los clientes tener un espacio propio y cómodo.", response: false },
          { question: "Se ofrecen mesas en zonas más tranquilas o apartadas para quienes prefieran menos interacción social o estímulos.", response: false },
        ],
      },
      {
        name: "Menú y Pedidos",
        questions: [
          { question: "El menú está disponible en un formato visual claro, con pictogramas o descripciones sencillas para facilitar la toma de decisiones.", response: false },
          { question: "Existe la opción de realizar pedidos por medio de aplicaciones o pantallas para minimizar la interacción social si es necesario.", response: false },
        ],
      },
      {
        name: "Señalización",
        questions: [
          { question: "Las señales dentro del restaurante están organizadas de manera clara y sencilla, sin sobrecargar visualmente a los clientes.", response: false },
          { question: "Las rutas de salida de emergencia y las áreas importantes están bien señalizadas con colores y símbolos claros.", response: false },
        ],
      },
      {
        name: "Sanitarios",
        questions: [
          { question: "Los baños tienen señalización visual sencilla y accesible, con símbolos que ayuden a identificar las áreas.", response: false },
          { question: "Existen áreas de sanitarios que proporcionan un ambiente tranquilo y cómodo, con iluminación suave.", response: false },
        ],
      },
      {
        name: "Perros de Asistencia o de Terapia",
        questions: [
          { question: "El restaurante acepta perros de asistencia o terapia para apoyar a personas neurodivergentes que puedan requerir su compañía.", response: false },
        ],
      },
      {
        name: "Personal Capacitado",
        questions: [
          { question: "El personal está capacitado en sensibilización neurodivergente y está preparado para interactuar de manera comprensiva y calmada.", response: false },
          { question: "Existe la opción de informar al personal sobre necesidades específicas de los clientes para una experiencia personalizada.", response: false },
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
    const updatedSections = neurodivergente.sections.map((section, sIndex) => {
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
    setNeurodivergente({ sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (hotelId) {
      try {
        const payload = {
          hotelId,
          disabilities: [
            {
              type: "Neurodivergente", // Tipo de discapacidad
              sections: neurodivergente.sections
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
    {neurodivergente.sections.map((section, sectionIndex) => (
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

export default RestNeurodivergenteCheckpoints;
