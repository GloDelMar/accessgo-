import React, { useState, useEffect } from "react";
import { createHotelAccessibility } from "@/pages/api/api_questionnaire";

const MotrizCheckpoints = () => {
  const [motrizData, setMotrizData] = useState({
    type: "Motriz",
    sections: [
      {
        name: "Accesos y Entradas",
        questions: [
          { question: "El hotel cuenta con rampas accesibles para sillas de ruedas.", response: false },
          { question: "Las puertas de acceso a las habitaciones y áreas comunes tienen un ancho mínimo de 90 cm.", response: false },
          { question: "Hay un camino accesible desde el estacionamiento hasta la entrada principal.", response: false },
        ],
      },
      {
        name: "Habitaciones",
        questions: [
          { question: "El hotel tiene habitaciones adaptadas para personas con movilidad reducida.", response: false },
          { question: "Las camas y muebles están diseñados para facilitar el acceso a personas en silla de ruedas.", response: false },
        ],
      },
      {
        name: "Baños",
        questions: [
          { question: "Los baños de las habitaciones adaptadas tienen barras de apoyo.", response: false },
          { question: "Las duchas son accesibles y tienen asientos o espacio para sillas de ruedas.", response: false },
          { question: "Hay suficiente espacio en el baño para el giro de una silla de ruedas (mínimo 1.50 m de diámetro).", response: false },
        ],
      },
      {
        name: "Albercas y Playas",
        questions: [
          { question: "La alberca cuenta con una rampa o silla hidráulica para facilitar el acceso.", response: false },
          { question: "Hay caminos accesibles hasta la alberca o playa.", response: false },
          { question: "Existen áreas adaptadas con sombra y descanso cerca de la alberca o playa.", response: false },
        ],
      },
      {
        name: "Otras áreas recreativas",
        questions: [
          { question: "Las áreas recreativas (gimnasios, jardines, etc.) son accesibles para personas con movilidad reducida.", response: false },
          { question: "Hay rutas accesibles hacia todas las áreas comunes.", response: false },
        ],
      },
      {
        name: "Estacionamiento",
        questions: [
          { question: "El hotel ofrece plazas de estacionamiento reservadas y señalizadas para personas con discapacidad.", response: false },
          { question: "El transporte interno del hotel es accesible para personas con movilidad reducida (si aplica).", response: false },
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
    const updatedSections = motrizData.sections.map((section, sIndex) => {
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

    setMotrizData({ ...motrizData, sections: updatedSections });
  };

  const handleSubmit = async () => {
    if (hotelId) {
      try {
        const payload = {
          hotelId,
          disabilities: [
            {
              type: motrizData.type,
              sections: motrizData.sections
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
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con Discapacidad Motriz</h2>
      </div>
      {motrizData.sections.map((section, sectionIndex) => (
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


export default MotrizCheckpoints;
