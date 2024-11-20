

const API_URL = "https://backend-r159.onrender.com/api/accesibilidad";


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

  export const updateHotelAccessibility = async (hotelId, accessibilityData) => {
    try {
      const response = await fetch(`https://backend-r159.onrender.com/api/accesibilidad/hotels/${hotelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accessibilityData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Cuestionario actualizado:', data);
      } else {
        console.log('Error al actualizar cuestionario:', data.message);
      }
    } catch (error) {
      console.error('Error al actualizar cuestionario:', error);
    }
  };
  
  export const updateRestaurantAccessibility = async (restaurantId, accessibilityData) => {
    try {
      const response = await fetch(`https://backend-r159.onrender.com/api/accesibilidad/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accessibilityData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Cuestionario actualizado:', data);
      } else {
        console.log('Error al actualizar cuestionario:', data.message);
      }
    } catch (error) {
      console.error('Error al actualizar cuestionario:', error);
    }
  };
  
  export const checkIfAccessibilityExists = async (hotelId, type) => {
    try {
      const response = await fetch(`https://backend-r159.onrender.com/api/accesibilidad/hotels/${hotelId}`);
      const data = await response.json();
  
      // Verifica si ya existe un cuestionario para la discapacidad Auditiva
      const disability = data.disabilities.find(disability => disability.type === type);
  
      return disability || null; // Si no se encuentra, retorna null
    } catch (error) {
      console.error('Error al verificar la accesibilidad:', error);
      return null; // Si hay error en la petición, retorna null
    }
  };
  