import React, { useState } from "react";
import { useRouter } from "next/router";
import { restaurantQuestions, hotelQuestions } from "./AccesibilityData";
import CheckpointsSection from "./Checkpoints";
import EstablishmentSelect from "../Molecules/TipoEstablecimiento";
import IconButton from "../atoms/IconButton";
import Button from "../atoms/Button";
import Link from "next/link";
import { FaWheelchair, FaEye, FaDeaf, FaBrain, FaPuzzlePiece } from "react-icons/fa";
import {
  createHotelAccessibility,
  createRestaurantAccessibility,
} from "@/pages/api/api_questionnaire";

const AccesForm = () => {
  const [establishmentType, setEstablishmentType] = useState("");
  const [formData, setFormData] = useState(null);
  const [selectedDisability, setSelectedDisability] = useState("");
  const router = useRouter();

  // Mapea las discapacidades con sus íconos correspondientes.
  const disabilityIcons = [
    { type: "Motriz", icon: <FaWheelchair /> },
    { type: "Visual", icon: <FaEye /> },
    { type: "Auditiva", icon: <FaDeaf /> },
    { type: "Intelectual", icon: <FaBrain /> },
    { type: "Neurodivergente", icon: <FaPuzzlePiece /> },
  ];

  const handleEstablishmentChange = (e) => {
    const selectedType = e.target.value;
    setEstablishmentType(selectedType);

    // Carga las preguntas correspondientes al tipo de establecimiento seleccionado.
    if (selectedType === "restaurante") {
      setFormData(restaurantQuestions);
    } else if (selectedType === "hotel") {
      setFormData(hotelQuestions);
    } else {
      setFormData(null);
    }

    setSelectedDisability(""); // Resetea la discapacidad seleccionada.
  };

  const handleConditionClick = (disabilityType) => {
    setSelectedDisability(disabilityType);
  };

  const handleUpdate = (updatedSections) => {
    const updatedFormData = {
      ...formData,
      disabilities: formData.disabilities.map((disability) =>
        disability.type === selectedDisability
          ? { ...disability, sections: updatedSections }
          : disability
      ),
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    try {
      if (!formData) {
        alert("Selecciona un tipo de establecimiento y completa el formulario.");
        return;
      }
  
      // Recupera el userId de localStorage.
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("No se encontró el usuario. Por favor, inicia sesión.");
        return;
      }
  
      // Crea el objeto dataToSave, asignando restaurantId o hotelId según corresponda.
      const dataToSave = {
        ...formData,
        restaurantId: establishmentType === "restaurante" ? userId : null,
        hotelId: establishmentType === "hotel" ? userId : null,
      };
  
      // Elimina las propiedades con valor null
      if (dataToSave.restaurantId === null) {
        delete dataToSave.restaurantId;
      }
      if (dataToSave.hotelId === null) {
        delete dataToSave.hotelId;
      }
  
      // Envía los datos al endpoint correspondiente.
      if (establishmentType === "hotel") {
        await createHotelAccessibility(dataToSave);
      } else if (establishmentType === "restaurante") {
        await createRestaurantAccessibility(dataToSave);
      }
  
      // Redirige y limpia los estados tras un guardado exitoso.
      setFormData(null);
      setSelectedDisability("");
      setEstablishmentType("");
      alert("Datos guardados exitosamente.");
      router.push("/planes");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert(`Ocurrió un error al guardar los datos. Detalles: ${error.message || error}`);
    }
  };
  

  return (
    <div>
      <div className="bg-white border border-[#E8DECF] shadow-sm rounded-[15px] px-8 pt-6 pb-8 mb-4 w-full md:w-[750px] lg:w-[1000px]">
        {/* Header y Selección */}
        <div className="flex flex-col mb-4 text-center items-center">
          <h1 className="text-[#2F4F4F] text-2xl md:text-4xl font-bold mb-2">
            ¡AccessGo!
          </h1>
          <p className="mt-4 text-[#2F4F4F] font-bold">
            Su colaboración es clave. Complete este formulario para informar
            sobre la accesibilidad de su establecimiento.
          </p>
        </div>
        <p className="my-2 text-[#2F4F4F]">
          1. Selecciona el tipo de establecimiento que deseas registrar.
        </p>
        <EstablishmentSelect onChange={handleEstablishmentChange} />

        {formData && (
          <>
            <div className="flex justify-around space-x-2 mb-6">
              {disabilityIcons.map(({ type, icon }) => (
                <IconButton
                  key={type}
                  condition={type}
                  icon={icon}
                  isSelected={selectedDisability === type} // Para resaltar el botón seleccionado.
                  onClick={() => handleConditionClick(type)}
                />
              ))}
            </div>

            {selectedDisability && (
              <CheckpointsSection
                sections={
                  formData.disabilities.find(
                    (disability) => disability.type === selectedDisability
                  )?.sections || []
                }
                onUpdate={handleUpdate}
              />
            )}
          </>
        )}
      </div>

      <div className="flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]">
        <Button className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          <Link legacyBehavior href="/">
            <a>Cancelar</a>
          </Link>
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default AccesForm;
