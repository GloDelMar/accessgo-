const API_URL = "https://backend-r159.onrender.com";



export const createComment = async (userId, content, businessId, rankingId) => {
    try {
        const body = {
            userId,
            content,
            businessId,
            rankingId
        };

       

        const response = await fetch(`${API_URL}/api/comments`, {
            method: "POST",
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

        const responseData = await response.json();
      
        return responseData;
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
        },
    })
        .then(response => {
           

            if (!response.ok) {
            
                throw new Error(`Error fetching comment with user ID ${userId}`);
            }

            return response.json();
        })
        .then(data => {
            
            return data;
        })
        .catch(error => {
            console.error("Error al obtener el comentario por userId:", error.message);
            throw error;
        });
}

// Obtener comentarios por `companyId`
export function getCommentsByCompanyId(companyId) {
 

    return fetch(`${API_URL}/api/comments/company/${companyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
          

          
            return response.json();
        })
        .then(data => {
          
            return data;
        })
        .catch(error => {
            console.error("Error al obtener el comentario por companyId:", error.message);
            throw error;
        });
}

export async function addLike(commentId) {
    try {
        const response = await fetch(`${API_URL}/api/comments/like/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Error al agregar like.";
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
}

export async function addDislike(commentId) {
    try {
        const response = await fetch(`${API_URL}/api/comments/dislike/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Error al agregar dislike.";
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
}
