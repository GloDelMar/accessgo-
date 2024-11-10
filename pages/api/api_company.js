

const API_URL = "http://localhost:8080"

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
    


export function getCompanyById(id){
    return fetch (`${API_URL}/api/company/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response =>{
        if(!response.ok){
            throw new Error (`Error fetching company with id ${id}`);
        }
        return response.json();
    })
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