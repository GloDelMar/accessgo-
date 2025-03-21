import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createRestaurantAccessibility, createHotelAccessibility, updateHotelAccessibility, updateRestaurantAccessibility, getHotelAccessibility, getRestaurantAccessibility } from "@/pages/api/api_questionnaire";
import CheckpointsSection from "./Checkpoints";
import EstablishmentSelect from "../Molecules/TipoEstablecimiento";
import IconButton from "../atoms/IconButton";
import Button from "../atoms/Button";
import Link from "next/link";
import { FaWheelchair, FaEye, FaDeaf, FaBrain, FaPuzzlePiece } from "react-icons/fa";
import Modal from "../Molecules/DisabilitiesInfo";
import { restaurantQuestions, hotelQuestions } from "./AccesibilityData";
import { getCompanyById, updateCompany } from "@/pages/api/api_company";
import { toast, Toaster } from 'react-hot-toast';
import CustomModal from "../Molecules/CostumModal";


const AccesForm = () => {
  const [establishmentType, setEstablishmentType] = useState("");
  const [formData, setFormData] = useState(null);
  const [selectedDisability, setSelectedDisability] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDisability, setModalDisability] = useState("");
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const [showModal, setShowModal] = useState(false);


 
  const disabilityIcons = [
    { type: "Motriz", icon: <FaWheelchair /> },
    { type: "Visual", icon: <FaEye /> },
    { type: "Auditiva", icon: <FaDeaf /> },
    { type: "Intelectual", icon: <FaBrain /> },
    { type: "Neurodivergente", icon: <FaPuzzlePiece /> },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("No se encontró el usuario. Por favor, inicia sesión.");
          router.push("/login");
          return;
        }
  
        const companyData = await getCompanyById(userId);
        if (!companyData || !companyData.data?.company) {
          throw new Error("No se encontró la empresa.");
        }
  
        const { verified, giro } = companyData.data.company;
        
        if (!verified) {
          setShowModal(true); // Activamos el modal
          return;
        }
  
        const accesibilidad = localStorage.getItem("accesibilidad");
        if (accesibilidad) {
          setEstablishmentType(giro.toLowerCase());
  
          let accessibilityData = {};
          if (giro.toLowerCase() === "restaurante") {
            accessibilityData = await getRestaurantAccessibility(userId);
          } else if (giro.toLowerCase() === "hotel") {
            accessibilityData = await getHotelAccessibility(userId);
          }
  
          setFormData((prevData) => ({
            ...prevData,
            ...accessibilityData,
          }));
        } else {
          setEstablishmentType("");
          setFormData({});
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        toast.error("Hubo un problema al cargar los datos.");
        router.push("/login");
      }
    };
  
    loadData();
  }, [router]); 
  


  const handleEstablishmentChange = (e) => {
    const selectedType = e.target.value;
    setEstablishmentType(selectedType);

    if (selectedType === "restaurante") {
      setFormData(restaurantQuestions);
    } else if (selectedType === "hotel") {
      setFormData(hotelQuestions);
    } else {
      setFormData(null);
    }

    setSelectedDisability(""); 
  };

  const handleConditionClick = (disabilityType) => {
    setSelectedDisability(disabilityType);
  };

  const handleShowModal = (disabilityType) => {
    setModalDisability(disabilityType);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalDisability("");
  };

  const handleModal2Close = () => {
    setShowModal(false);
    router.push("/autentificacion");
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

    // Actualiza el estado con los nuevos datos
    setFormData(updatedFormData);

    // Puedes loguear para depurar
    console.log("Datos actualizados:", updatedFormData);
    console.log("FormData", formData)
  };
  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID obtenido:", userId);

      if (!userId) {
        alert("No se encontró el usuario. Por favor, inicia sesión.");
        return;
      }

      const accesibilidad = localStorage.getItem("accesibilidad");

      if (!accesibilidad) {
        // Crear nuevos datos de accesibilidad
        const dataToSave = {
          ...formData,
          restaurantId: establishmentType === "restaurante" ? userId : null,
          hotelId: establishmentType === "hotel" ? userId : null,
        };
        console.log("Datos a guardar:", dataToSave);

        const giro = establishmentType === "hotel" ? "HOTEL" : "RESTAURANTE";
        await updateCompany(userId, { giro });
        console.log("Se actualizó el giro en la empresa con éxito:", { giro });


        if (establishmentType === "hotel") {
          await createHotelAccessibility(dataToSave);
        } else if (establishmentType === "restaurante") {
          await createRestaurantAccessibility(dataToSave);
        }
  
        router.push("/planes");
      } else {
        // Actualizar datos existentes de accesibilidad
        let updateFunction;

        if (establishmentType === "restaurante") {
          updateFunction = await updateRestaurantAccessibility(userId, formData);
        } else if (establishmentType === "hotel") {
          updateFunction = await updateHotelAccessibility(userId, formData);
        }

        const companyData = await getCompanyById(userId);
        console.log("Datos de la empresa obtenidos:", companyData);

        const cuenta = companyData.data.company.cuenta.toLowerCase();


        if (cuenta === "premium") {
          router.push("/sesion-prem");
        } else if (cuenta === "free") {
          router.push("/sesion-base");
        } else {
          console.warn("Cuenta de usuario no válida");
        }
      }

      // Restablece el formulario
      setFormData({});
      setSelectedDisability("");
      setEstablishmentType("");
      alert("Datos guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert(`Ocurrió un error al guardar los datos. Detalles: ${error.message || error}`);
    }
  };



  return (
    <div>
      <Modal isOpen={modalOpen} onClose={handleModalClose} disabilityType={modalDisability} />
      {showModal && (
        <CustomModal 
          isOpen={showModal}
          onClose={handleModal2Close}
          title="Verificación requerida"
          message="Debes verificar tu cuenta para continuar."
          buttonText="Aceptar"
        />
      )}
      <div className="bg-white border border-[#E8DECF] shadow-sm rounded-[15px] px-8 pt-6 pb-8 mb-4 w-full md:w-[750px] lg:w-[1000px]">
        {/* Header y Selección */}
        <div className="flex flex-col mb-4 text-center items-center">
          <h1 className="text-[#2F4F4F] text-2xl md:text-4xl font-bold mb-2">¡AccessGo!</h1>
          <p className="mt-4 text-[#2F4F4F] font-bold">
            Su colaboración es fundamental para promover una verdadera inclusión.
          </p>
          <p className="mt-4 text-justify text-[#2F4F4F]">
            Por ello, le invitamos a completar el siguiente formulario para detallar
            la accesibilidad de su establecimiento. Este formulario está diseñado para destacar
            las acciones que ha implementado, asegurando que todas las personas, con o sin discapacidad,
            puedan disfrutar plenamente de los servicios que usted ofrece.
          </p>
          <p className="mt-4 text-justify text-[#2F4F4F]">
            Con el objetivo de facilitar el proceso, hemos categorizado la información según el tipo de servicio
            y clasificado por tipo de condición de vida. Esto permitirá que sus futuros clientes encuentren
            rápidamente las características que les brindan comodidad y confianza para elegir su establecimiento
            y disfrutar de una experiencia agradable.
          </p>
          <p className="mt-4 text-center text-[#2F4F4F]">Estos son los íconos que utilizamos para facilitar el llenado de tus datos:</p>
          <div className="mt-2">
          {disabilityIcons.map(({ type, icon }) => (
                <div key={type} className="flex flex-row items-center my-1 space-x-2 w-full">
                  <div>
                    <IconButton
                      id={`boton-de-icono-${type}`}
                      condition={type}
                      icon={icon}
                      isSelected={selectedDisability === type}
                      onClick={() => handleShowModal(type)} 
                      onMouseEnter={() => setTooltipVisible(type)} 
                      onMouseLeave={() => setTooltipVisible(null)}  
                      />
                  </div>
                  <div className="relative m-2 text-sm text-[#2F4F4F] mt-1">
                    {/* Botón con Tooltip */}
                    <button
                      id={`boton-de-texto-${type}`} // Asigna un ID único basado en el tipo.
                      className="texto-boton text-sm text-[#2F4F4F] relative"
                      onClick={() => handleShowModal(type)} 
                      onMouseEnter={() => setTooltipVisible(type)}
                      onMouseLeave={() => setTooltipVisible(null)} 
                    >
                      {type}
                    </button>
                    {/* Tooltip solo visible si se está haciendo hover */}
                    {tooltipVisible === type && (
                      <div className="absolute bg-gray-200 p-2 rounded-md shadow-lg top-8 left-0 z-10">
                        ¿Saber más...?
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <p className="mt-4 text-justify text-[#2F4F4F]">
            Dada la importancia de esta información, le pedimos cordialmente que dedique un momento a
            revisar cuidadosamente cada sección y marque aquellas particularidades que lo hacen un espacio
            verdaderamente incluyente.
          </p>
          <p className="mt-4 text-[#2F4F4F] font-bold">¡Muchas gracias por su valiosa participación!</p>
        </div>

        <p className="my-4 text-[#2F4F4F] font-bold">
          1. Para comenzar, elige el tipo de establecimiento que deseas registrar. Este es el primer paso para
          destacar las características que hacen tu espacio accesible e incluyente.
        </p>
        <EstablishmentSelect onChange={handleEstablishmentChange} selectedValue={establishmentType} />
        {formData && establishmentType && (
          <>
            <p className="my-4 text-[#2F4F4F] font-bold">
              2. Da clic en uno de los cinco botones a continuación para explorar las preguntas del formulario.
              Cada botón representa una categoría de condición de vida: discapacidad motriz, visual, auditiva, intelectual y neurodivergente.
            </p>
            <div className="flex flex-wrap justify-between mb-6">
              {disabilityIcons.map(({ type, icon }) => (
                <div key={type} className="flex flex-col items-center space-x-2 w-1/5">
                  <div>
                    <IconButton
                      id={`boton-de-icono-${type}`}
                      condition={type}
                      icon={icon}
                      isSelected={selectedDisability === type} // Para resaltar el botón seleccionado.
                      onClick={() => handleConditionClick(type)}
                    />
                  </div>
                  </div>
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
          className="px-12 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
          onClick={handleSubmit}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AccesForm;
