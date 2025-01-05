// const API_URL = "https://backend-r159.onrender.com";
const API_URL = "http://localhost:8080";

/**
 * Crear un nuevo comentario
 * @param {string} userId - ID del usuario
 * @param {string} content - Contenido del comentario
 * @param {string} businessId - ID del negocio
 * @param {string} rankingId - ID del ranking asociado
 * @returns {Object} - Respuesta del servidor
 */
export const createComment = async (userId, content, businessId, rankingId) => {
    try {
        const body = {
            userId,
            content,
            businessId,
            rankingId,
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

/**
 * Obtener comentarios por ID de usuario
 * @param {string} userId - ID del usuario
 * @returns {Object} - Comentarios del usuario
 */
export function getCommentByUserId(userId) {
    return fetch(`${API_URL}/api/comments/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching comment with user ID ${userId}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error al obtener el comentario por userId:", error.message);
            throw error;
        });
}

/**
 * Obtener comentarios por ID de compañía
 * @param {string} companyId - ID de la compañía
 * @returns {Object} - Comentarios de la compañía
 */
export function getCommentsByCompanyId(companyId) {
    return fetch(`${API_URL}/api/comments/company/${companyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error al obtener el comentario por companyId:", error.message);
            throw error;
        });
}

/**
 * Agregar un like a un comentario
 * @param {string} commentId - ID del comentario
 * @param {string} userId - ID del usuario
 * @returns {Object} - Respuesta del servidor
 */
export async function addLike(commentId, userId) {
    try {
        const response = await fetch(`${API_URL}/api/comments/like/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
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

/**
 * Agregar un dislike a un comentario
 * @param {string} commentId - ID del comentario
 * @param {string} userId - ID del usuario
 * @returns {Object} - Respuesta del servidor
 */
export async function addDislike(commentId, userId) {
    try {
        const response = await fetch(`${API_URL}/api/comments/dislike/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
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

/**
 * Quitar un like de un comentario
 * @param {string} commentId - ID del comentario
 * @param {string} userId - ID del usuario
 * @returns {Object} - Respuesta del servidor
 */
export async function removeLike(commentId, userId) {
    try {
        const response = await fetch(`${API_URL}/api/comments/removeLike/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Error al quitar like.";
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
}

/**
 * Quitar un dislike de un comentario
 * @param {string} commentId - ID del comentario
 * @param {string} userId - ID del usuario
 * @returns {Object} - Respuesta del servidor
 */
export async function removeDislike(commentId, userId) {
    try {
        const response = await fetch(`${API_URL}/api/comments/removeDislike/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Error al quitar dislike.";
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
}