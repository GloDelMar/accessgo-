

const API_URL = "http://localhost:8080/api/accesibilidad";


export const getHotelAccessibility = async (hotelId) => {
  try {
    const response = await fetch(`${API_URL}/hotels/${hotelId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el cuestionario de accesibilidad para el hotel');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createHotelAccessibility = async (hotelAccessibilityData) => {
  try {
    const response = await fetch(`${API_URL}/hotels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(hotelAccessibilityData),
    });

    console.log('Datos enviados:', hotelAccessibilityData);
console.log('Respuesta del servidor:', response);
    if (!response.ok) {
      throw new Error('Error al crear el cuestionario de accesibilidad para el hotel');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getRestaurantAccessibility = async (restaurantId) => {
    try {
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      
  
      if (!response.ok) {
        throw new Error('Error al obtener el cuestionario de accesibilidad para el restaurante');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  export const createRestaurantAccessibility = async (restaurantAccessibilityData) => {
    try {
      const response = await fetch(`${API_URL}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantAccessibilityData),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el cuestionario de accesibilidad para el restaurante');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };