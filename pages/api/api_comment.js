const API_URL = "http://localhost:8080";

export const createComment = async (userId, content, businessId) => {
    try {
        const body = {
            userId,
            content,
            businessId
       };

        const response = await fetch(`${API_URL}/api/comments`, { // Añadir coma y corregir sintaxis
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Error en la solicitud";
            if (response.status >= 500) {
                throw new Error("Error del servidor. Intenta nuevamente más tarde.");
            }
            throw new Error(errorMessage);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error al crear comentario:", error.message);
        throw error;
    }
};

export function getCommentByUserId(userId) {
    return fetch(`${API_URL}/api/comments/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error fetching comment with user ID ${userId}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error al obtener el comentario:", error.message);
        throw error;
    });
}

// Obtener comentarios por `companyId`
export async function getCommentsByCompanyId(companyId) {
    try {
      const response = await fetch(`${API_URL}/api/comments/company/${companyId}`);
      if (!response.ok) throw new Error('Error al obtener los comentarios');
      
      const data = await response.json();
      
      // Agregar el console.log para ver lo que recibes
      console.log('Datos recibidos:', data);
      
      return data;
    } catch (error) {
      console.error(error.message);
      return { success: false, data: [], message: error.message };
    }
  }
  