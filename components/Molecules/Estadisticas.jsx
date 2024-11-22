import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Importamos el componente Line para gráficas lineales
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { conteoVisita } from '@/pages/api/api_visits';

// Registramos los componentes de Chart.js que vamos a usar
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
          if (!companyId) {
            throw new Error('Company ID no está definido.');
          }
      
          const url = `http://localhost:8080/api/visitas/${companyId}?rango=${rango}`;
          console.log("URL Fetch: ", url);
      
          const response = await fetch(url);
      
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Datos recibidos: ", data);
      
          // Validar que success sea true
          if (!data.success) {
            throw new Error('La respuesta del servidor no indica éxito.');
          }
      
          setEstadisticas(data.data || []);
          const total = (data.data || []).reduce((sum, visita) => sum + (visita.visits || 0), 0);
          setTotalVisitas(total);
        } catch (error) {
          console.error("Error en fetchEstadisticas: ", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      
      

      fetchEstadisticas();
    }
  }, [rango, companyId]);

  if (loading) {
    return <div>Cargando estadísticas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (estadisticas.length === 0) {
    return (
      <div>
        <h4>Total de visitas del {rango}: 0</h4>
        <div>No hay visitas para este rango.</div>
      </div>
    );
  }

  // Configuración de la gráfica
  const chartData = {
    labels: estadisticas.map(visita => visita.date), // Fechas
    datasets: [
      {
        label: `Visitas de ${rango}`,  // Etiqueta de la gráfica
        data: estadisticas.map(visita => visita.visits), // Datos de visitas
        borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de la línea
        fill: true,  // Para que la gráfica sea área lineal
        tension: 0.1, // Para suavizar la curva
      },
    ],
  };

  return (
    <div>
      <h4>Total de visitas del {rango}: {totalVisitas}</h4>
      <Line data={chartData} /> {/* Renderizamos la gráfica */}
    </div>
  );
};

export default EstadisticasVisitas;
