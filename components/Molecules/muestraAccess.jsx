import React, { useState, useEffect } from "react";
import { getHotelAccessibility, getRestaurantAccessibility } from "@/pages/api/api_questionnaire";
import { getCompanyById } from "@/pages/api/api_company";
import IconButton from "../atoms/IconButton";
import Modal from "./DisabilitiesInfo";

const AccessVisibility = ({ companyId }) => {
  const [data, setData] = useState(null);
  const [showCondition, setShowCondition] = useState(null);
  const [company, setCompany] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDisability, setModalDisability] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await getCompanyById(companyId);
        setCompany(companyData);

        if (companyData.data.company.giro === "HOTEL") {
          const accessibilityData = await getHotelAccessibility(companyId);
          setData(accessibilityData);
        } else if (companyData.data.company.giro === "RESTAURANTE") {
          const accessibilityData = await getRestaurantAccessibility(companyId);
          setData(accessibilityData);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleConditionClick = (condition) => {
    setShowCondition(showCondition === condition ? null : condition);
  };

  const handleShowModal = (condition) => {
    setModalDisability(condition);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalDisability("");
  };

  if (!data || !company) {
    return <p>Cargando...</p>;
  }

  // Filtrar los tipos de discapacidad con datos válidos
  const validConditions = data.disabilities?.filter((disability) =>
    disability.sections.some((section) =>
      section.questions.some((question) => question.response === true)
    )
  );

  const conditionData = data.disabilities?.find(
    (disability) =>
      disability.type.toLowerCase() === showCondition?.toLowerCase() &&
      disability.sections.some((section) =>
        section.questions.some((question) => question.response === true)
      )
  );

  return (
    <div className="md:w-full text-[#2F4F4F] h-full mt-2 flex flex-col items-center align-center p-2 max-w-screen-sm md:p-4 lg:p-8">
      <Modal isOpen={modalOpen} onClose={handleModalClose} disabilityType={modalDisability} />
      {/* Botones de condiciones */}
      <div className="border p-3 rounded mt-4 bg-[#ECEFF1] w-[290px]  md:w-full  justify-center flex flex-col items-center text-[#455A64]">
        <p>Haz clic en los <span className="font-bold"> íconos</span> para descubrir cómo trabajamos en
          mejorar la accesibilidad y qué aspectos de tu experiencia hemos
          optimizado para hacer tu visita más cómoda y accesible. Conoce las
          acciones que hemos tomado para garantizar un entorno inclusivo.</p>
        <p className="mt-2">Haz clic una vez más en el mismo ícono para ocultar la información.</p> </div>

      <div className="flex justify-evenly space-x-4 md:space-x-6 items-center mt-3 mb-6">
        {validConditions?.map((disability) => (
          <div
            key={disability.type}
            className="flex flex-col md:max-w-[100px] items-center justify-center text-center gap-2"
          >
            <IconButton
              condition={disability.type}
              onClick={() => handleConditionClick(disability.type)}
              onMouseEnter={() => setTooltipVisible(disability.type)}
              onMouseLeave={() => setTooltipVisible(null)}
              size="large"
              className="w-10 h-10"
            />
            <button
              id={`boton-de-texto-${disability.type}`}
              className="hidden md:block text-2xs md:text-sm text-[#2F4F4F]"
              onClick={() => handleShowModal(disability.type)}
              onMouseEnter={() => setTooltipVisible(disability.type)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              {disability.type}
            </button>
            {tooltipVisible === disability.type && (
              <div className="absolute bg-gray-200 p-2 rounded-md shadow-lg top-12 left-1/2 transform -translate-x-1/2 z-10">
                ¿Saber más...?
              </div>
            )}
          </div>
        ))}
      </div>


      {showCondition && (
        <div className="max-w-[500px] border rounded p-4 shadow-xl bg-white mt-4 flex flex-col items-center">
          {conditionData ? (
            conditionData.sections.map((section, sectionIndex) => {
              const validQuestions = section.questions.filter((question) => question.response);
              return validQuestions.length > 0 ? (
                <div key={sectionIndex} className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">{section.name}:</h3>
                  <ul className="ml-4 list-disc">
                    {validQuestions.map((question, questionIndex) => (
                      <li key={questionIndex} className="text-sm">
                        {question.question}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            })
          ) : (
            <p className="text-sm text-gray-600">
              No hay información sobre accesibilidad para este tipo de discapacidad.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessVisibility;
