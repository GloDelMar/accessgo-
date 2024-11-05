const API_URL = "http://localhost:8080";

export const createComment = async (userId, content, token) => {
    try {
        const body = {
            userId,
            content,
       };

        const response = await fetch(`${API_URL}/api/comments`, { // Añadir coma y corregir sintaxis
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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