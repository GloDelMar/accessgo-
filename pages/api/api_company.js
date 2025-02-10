

const API_URL = "https://backend-r159.onrender.com";

export const createCompany = async (email, password, type) => {
  try {
    // Construir el objeto con la estructura solicitada
    const body = {
      email,
      password,
      type,
    };

    // Realizar la solicitud de registro
    const response = await fetch(`${API_URL}/api/company`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Error en la solicitud";
      if (response.status >= 500) {
        throw new Error("Error del servidor. Intenta nuevamente más tarde.");
      }
      throw new Error(errorMessage);
    }

    return await response.json(); // Devolver los datos de la cuenta creada
  } catch (error) {
    console.error("Error en la solicitud de registro:", error.message);
    throw error; // Propagar el error al frontend
  }
};



export function getCompanyById(id) {
  return fetch(`${API_URL}/api/company/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
    
      return response.json(); // Convertir la respuesta a JSON
    })
    .catch(error => {
      console.error("Error obteniendo la empresa:", error);
      throw error; // Reenviar el error para manejarlo donde se llame la función
    });
}



export function updateCompany(id, companyData) {
  return fetch(`${API_URL}/api/company/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyData), // Convertir datos a JSON
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error updating company with id ${id}`);
      }
      return response.json(); // Devolver la respuesta actualizada si es necesario
    });
}

export async function getAllCompanies() {
  try {
    const response = await fetch(`${API_URL}/api/company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();



    if (!Array.isArray(data.data.companies)) {
      throw new Error("La respuesta de la API no es un array de empresas");
    }

    return data.data.companies;
  } catch (error) {
    console.error("Error fetching or parsing companies:", error);
    throw error;
  }
}

export const getCompanyByEmail = async (email) => {
  try {
    if (typeof email !== 'string' || !email.includes('@')) {
      throw new Error('Correo inválido');
    }

    const response = await fetch(`${API_URL}/api/company/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Usuario no encontrado

        return null;
      }

      // Manejo de otros errores
      const error = await response.json();
      console.error('Error de la API:', error);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la función getUserByEmail:', error);
    return null; // Retorna null en caso de error para continuar la búsqueda en otro lugar
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/api/company/${companyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la empresa');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en la función deleteCompany:', error);
    throw error; 
  }
};
