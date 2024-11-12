const API_URL = "https://backend-r159.onrender.com";


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

export const UserProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // Asegúrate de que el token esté guardado en localStorage o en algún lugar seguro

    const response = await fetch(`${API_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener el perfil del usuario");
    }

    const userData = await response.json();
    console.log("Datos del usuario:", userData);
  } catch (error) {
    console.error("Error:", error);
  }
};
