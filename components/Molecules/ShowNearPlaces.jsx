import { useState, useEffect } from "react";
import { getCompanyById } from "@/pages/api/api_company";
import { useRouter } from 'next/router';

const ShowNearPlaces = () => {
  const [recreativos, setRecreativos] = useState([]); 
  const [emergencia, setEmergencia] = useState([]); 
   const router = useRouter();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { id } = router.query;
        const companyId = id
        if (!companyId) {
          console.error("No se encontró el ID de la empresa en localStorage");
          return;
        }

        const companyData = await getCompanyById(companyId);
        console.log("datos de compañia", companyData)
        // Asignar datos a los estados
        setRecreativos(companyData.data.company.lugares.recreativos || []);
        setEmergencia(companyData.data.company.lugares.emergencia || []);
      } catch (error) {
        console.error("Error al obtener los datos de la empresa:", error);
      }
    };

    fetchCompanyData(); // Llama a la función
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Lugares Cercanos a Nosotros
      </h1>
      <div className="flex space-x-4 w-full max-w-4xl">
        {/* Recuadro de lugares recreativos */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-4 text-center">
            Lugares Recreativos
          </h2>
          {recreativos.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recreativos.map((lugar, index) => (
                <li key={index} className="pl-2">
                  {lugar}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay lugares recreativos disponibles.</p>
          )}
        </div>

        {/* Recuadro de lugares de emergencia */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg text-center font-semibold text-red-600 mb-4">
            Lugares de Emergencia
          </h2>
          {emergencia.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {emergencia.map((lugar, index) => (
                <li key={index} className="pl-2">
                  {lugar}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay lugares de emergencia disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowNearPlaces;
