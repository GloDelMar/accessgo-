import React, { useState, useEffect } from "react";
import { getHotelAccessibility, getRestaurantAccessibility } from "@/pages/api/api_questionnaire";
import { getCompanyById } from "@/pages/api/api_company";
import IconButton from "../atoms/IconButton";

const AccessVisibility = ({ companyId }) => {
  const [data, setData] = useState(null);
  const [showCondition, setShowCondition] = useState(null);
  const [company, setCompany] = useState(null);

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

  if (!data || !company) {
    return <p>Cargando...</p>;
  }

  const conditionData = data.disabilities?.find(
    (disability) =>
      disability.type.toLowerCase() === showCondition?.toLowerCase() &&
      disability.sections.some((section) =>
        section.questions.some((question) => question.response === true)
      )
  );

  return (
    <div className="max-w-[500px] text-[#2F4F4F] h-full mt-2 flex flex-col align-center p-2 max-w-screen-sm md:p-4 lg:p-8">
      {/* Botones de condiciones */}
      <div className="flex justify-around space-x-2 mb-6">
        {["Motriz", "Visual", "Auditiva", "Intelectual", "Neurodivergente"].map((type) => (
          <IconButton
            key={type}
            condition={type}
            onClick={() => handleConditionClick(type)}
          />
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
