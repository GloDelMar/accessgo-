import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/rankings';

// Crear una nueva calificación
export const createRanking = async (rankingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, rankingData);
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Obtener todas las calificaciones de un negocio
export const getBusinessRankings = async (businessId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/business/${businessId}`);
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

// Obtener la calificación promedio de un negocio
export const getBusinessAverageRanking = async (businessId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/business/${businessId}/average`);
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};


export const getRankingById = async (rankingId) => {
  try {
    const response = await fetch(`https://backend-r159.onrender.com/api/rankings/${rankingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Ranking obtenido:', data);
  } catch (error) {
    console.error('Error al obtener el ranking:', error.message);
  }
}