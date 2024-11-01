const API_URL = "http://localhost:8080"


export function getUserById(id) {
    return fetch(`${API_URL}/api/users/${id}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching user with id ${id}`);
        }
        return response.json();
      });
  }
  
  // api/api_getById.js

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'PATCH', // O 'PATCH' si solo actualizas algunos campos
      headers: {
        'Content-Type': 'application/json',
        // Añade otros encabezados si es necesario, como autenticación
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }

    const data = await response.json();
    return data; // Devuelve la información del usuario actualizado
  } catch (error) {
    console.error('Error en la función updateUser:', error);
    throw error; // Re-lanza el error para manejarlo en el componente
  }
};
