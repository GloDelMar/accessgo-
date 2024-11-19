import React, { useState, useEffect } from "react";
import { getHotelAccessibility, getRestaurantAccessibility } from "@/pages/api/api_questionnaire";
import { getCompanyById } from "@/pages/api/api_company";
import IconButton from "../atoms/IconButton";

const AccessVisibility = ({ companyId }) => {
  const [data, setData] = useState(null); // Almacena los datos de accesibilidad
  const [showCondition, setShowCondition] = useState(null); // Controla la visibilidad de la condición seleccionada
  const [company, setCompany] = useState(null); // Información de la empresa


  console.log("el id de la empresa", companyId)
  useEffect(() => {
    // Obtener información de la empresa
    const fetchCompany = async () => {
      const companyData = await getCompanyById(companyId);
      setCompany(companyData);
console.log("datos que recibimos", companyData)
      // Obtener datos de accesibilidad según el giro
      if (companyData.data.company.giro === "HOTEL") {
        const accessibilityData = await getHotelAccessibility(companyId);
        setData(accessibilityData);
      } else if (companyData.data.company.giro === "RESTAURANTE") {
        const accessibilityData = await getRestaurantAccessibility(companyId);
        setData(accessibilityData);
      }
    };

    fetchCompany();
  }, [companyId]);

  // Alternar la visibilidad de la condición
  const handleConditionClick = (condition) => {
    setShowCondition(showCondition === condition ? null : condition); // Alternar visibilidad
  };

  if (!data || !company) {
    return <p>Cargando...</p>;
  }

  // Verifica si hay datos disponibles para la condición seleccionada
  const conditionData = data.disabilities?.find(
    (disability) => disability.type.toLowerCase() === showCondition?.toLowerCase()
  );

  return (
    <div className="max-w-[500px] text-[#2F4F4F] h-full mt-2 flex flex-col align-center p-2 max-w-screen-sm md:p-4 lg:p-8">
      {/* Botones de condiciones */}
      <div className="flex justify-around space-x-2 mb-6  ">
        {["Motriz", "Visual", "Auditiva", "Intelectual", "Neurodivergente"].map((type) => (
          <IconButton
            key={type}
            condition={type}
            onClick={() => handleConditionClick(type)}
          />
        ))}
      </div>

      {/* Mostrar o esconder el recuadro con las preguntas */}
      {showCondition && conditionData && (
        <div className="max-w-[500px] border rounded p-4 shadow-xl bg-white mt-4 flex flex-col items-center">
        {conditionData.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mt-4">
            <h3 className="text-lg font-semibold mb-2">{section.name}:</h3>
            {section.questions.map((question, questionIndex) => (
              <p key={questionIndex} className="ml-4 text-sm">
                {question.question}
              </p>
            ))}
          </div>
        ))}
      </div>
      
      )}
    </div>
  );
};

export default AccessVisibility;
