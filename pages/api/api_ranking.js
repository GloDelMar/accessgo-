import axios from 'axios';

const API_BASE_URL = 'https://backend-r159.onrender.com/api/rankings';

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
