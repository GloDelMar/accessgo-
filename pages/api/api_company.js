

const API_URL = "http://localhost:8080";

export const createCompany = async (email, password, type) => {
    try {
        const body = {
          email,
          password,
          type,
        };
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
    
      } catch (error) {
        console.error("Error en la solicitud de registro:", error.message);
        throw error;
      }
    };
    


export async function getCompanyById(id){
    const response = await fetch(`${API_URL}/api/company/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Error fetching company with id ${id}`);
    }
    return await response.json();
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
    console.log("Data received from API:", data);

    
    if (!Array.isArray(data.data.companies)) {
        throw new Error("La respuesta de la API no es un array de empresas");
    }

    return data.data.companies;
} catch (error) {
    console.error("Error fetching or parsing companies:", error);
    throw error;
}
}