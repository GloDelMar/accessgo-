const API_URL = "https://backend-r159.onrender.com";

export const createComment = async (userId, content, businessId, rankingId) => {
    try {
        const body = {
            userId,
            content,
            businessId,
            rankingId
        };

        console.log("Datos enviados al crear comentario:", body);

        const response = await fetch(`${API_URL}/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        console.log("Respuesta del servidor al crear comentario:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Detalles del error en la creación del comentario:", errorData);

            const errorMessage = errorData.message || "Error en la solicitud";
            if (response.status >= 500) {
                throw new Error("Error del servidor. Intenta nuevamente más tarde.");
            }
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        console.log("Datos de respuesta al crear comentario:", responseData);

        return responseData;
    } catch (error) {
        console.error("Error al crear comentario:", error.message);
        throw error;
    }
};

export function getCommentByUserId(userId) {
    console.log("Obteniendo comentario por userId:", userId);

    return fetch(`${API_URL}/api/comments/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            console.log("Respuesta del servidor al obtener comentario por userId:", response);

            if (!response.ok) {
                console.log("Error al obtener comentario por userId:", userId);
                throw new Error(`Error fetching comment with user ID ${userId}`);
            }

            return response.json();
        })
        .then(data => {
            console.log("Datos obtenidos al buscar comentario por userId:", data);
            return data;
        })
        .catch(error => {
            console.error("Error al obtener el comentario por userId:", error.message);
            throw error;
        });
}

// Obtener comentarios por `companyId`
export function getCommentsByCompanyId(companyId) {
    console.log("Obteniendo comentarios por companyId:", companyId);

    return fetch(`${API_URL}/api/comments/company/${companyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            console.log("Respuesta del servidor al obtener comentarios por companyId:", response);

            if (!response.ok) {
                console.log("Error al obtener comentarios por companyId:", companyId);
                throw new Error(`Error fetching comments with company ID ${companyId}`);
            }

            return response.json();
        })
        .then(data => {
            console.log("Datos obtenidos al buscar comentarios por companyId:", data);
            return data;
        })
        .catch(error => {
            console.error("Error al obtener el comentario por companyId:", error.message);
            throw error;
        });
}
