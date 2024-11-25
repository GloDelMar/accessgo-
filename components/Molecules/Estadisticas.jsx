import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { conteoVisita } from '@/pages/api/api_visits';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EstadisticasVisitas = ({ rango }) => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalVisitas, setTotalVisitas] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setCompanyId(storedUserId);
      } else {
        setError("Company ID not found in localStorage");
        setLoading(false);
      }
    }
  }, []);
  useEffect(() => {
    if (companyId) {
      const fetchEstadisticas = async () => {
        try {
          console.log("Inicio de fetchEstadisticas");
          if (!companyId) {
            throw new Error("Company ID no está definido.");
          }
  
          const url = `http://localhost:8080/api/visitas/${companyId}?rango=${rango}`;
          console.log("URL generada: ", url);
  
          const response = await fetch(url);
          console.log("Respuesta de la API: ", response);
  
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
  
          const data = await response.json();
          console.log("Datos recibidos: ", data);
  
          if (!data.success) {
            throw new Error("La respuesta del servidor no indica éxito.");
          }
  
          setEstadisticas(data.data || []);
          console.log("Estadísticas establecidas: ", data, "o" ,data.data);
  
          const total = (data.data || []).reduce(
            (sum, visita) => sum + (visita.totalVisits || 0),
            0
          );
          setTotalVisitas(total);
          console.log("Total de visitas calculadas: ", total);
        } catch (error) {
          console.error("Error en fetchEstadisticas: ", error);
          setError(error.message);
        } finally {
          setLoading(false);
          console.log("Estado de carga finalizado");
        }
      };
  
      fetchEstadisticas();
    }
  }, [rango, companyId]);
  
  if (loading) {
    console.log("Cargando estadísticas...");
    return <div>Cargando estadísticas...</div>;
  }
  
  if (error) {
    console.error("Error mostrado en UI: ", error);
    return <div>Error: {error}</div>;
  }
  
  // Mostrar mensaje si totalVisitas es 0
  if (totalVisitas === 0) {
    console.log("Total de visitas es 0. Mostrando mensaje.");
    return (
      <div>
        <h4 className="text-xl text-center font-semibold mb-10 text-[#2F4F4F]">
          Aún no has recibido visita en este {rango}.
        </h4>
      </div>
    );
  }
  
  console.log("Datos para el gráfico: ", estadisticas);
  
  const chartData = {
    labels: estadisticas.map((visita) => visita.date),
    datasets: [
      {
        label: `Visitas de ${rango}`,
        data: estadisticas.map((visita) => visita.totalVisits),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };
  
  return (
    <div>
      <h4 className='text-xl text-center font-semibold mb-10 text-[#2F4F4F]'>
        Total de visitas del {rango}: {totalVisitas}
      </h4>
      <Line data={chartData} />
    </div>
  );
};

export default EstadisticasVisitas;