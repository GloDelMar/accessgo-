import axios from 'axios';

const BASE_URL = 'backend-r159.onrender.com/api/volunteers';

/**
 * Crea un registro de voluntariado
 * @param {Object} volunteerData - Datos del voluntariado
 * @returns {Promise<Object>} Respuesta de la API
 */
export const createVolunteer = async (volunteerData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, volunteerData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el voluntariado:', error);
    throw error;
  }
};

/**
 * Obtiene todos los voluntariados
 * @returns {Promise<Object[]>} Lista de voluntariados
 */
export const getAllVolunteers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los voluntariados:', error);
    throw error;
  }
};

/**
 * Obtiene voluntariados de una empresa específica
 * @param {string} companyId - ID de la empresa
 * @returns {Promise<Object[]>} Lista de voluntariados
 */
export const getVolunteersByCompany = async (companyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener voluntariados por empresa:', error);
    throw error;
  }
};

/**
 * Obtiene voluntariados de un usuario específico
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object[]>} Lista de voluntariados
 */
export const getVolunteersByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener voluntariados por usuario:', error);
    throw error;
  }
};

/**
 * Actualiza un registro de voluntariado
 * @param {string} id - ID del voluntariado
 * @param {Object} volunteerData - Datos del voluntariado
 * @returns {Promise<Object>} Voluntariado actualizado
 */
export const updateVolunteer = async (id, volunteerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, volunteerData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el voluntariado:', error);
    throw error;
  }
};

/**
 * Elimina un voluntariado
 * @param {string} id - ID del voluntariado
 * @returns {Promise<Object>} Confirmación de eliminación
 */
export const deleteVolunteer = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el voluntariado:', error);
    throw error;
  }
};
