const API_URL =  "https://backend-r159.onrender.com";

export async function changeUserPassword(userId, newPassword) {
        
    try {
        console.log('Sending request to API...'); // Indicamos que se está enviando la solicitud
        const response = await fetch(`${API_URL}/api/users/${userId}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        console.log('Response status:', response.status); // Mostrar el estado de la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al cambiar la contraseña');
        }

        const data = await response.json();
        console.log('Response data:', data); // Mostrar datos de la respuesta
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Error:', error); // Mostrar el error completo
        return { success: false, message: error.message };
    }
}



export async function changeCompanyPassword(userId, newPassword) {
   
    try {
        console.log('Sending request to API...'); // Indicamos que se está enviando la solicitud
        const response = await fetch(`${API_URL}/api/company/${userId}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        console.log('Response status:', response.status); // Mostrar el estado de la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al cambiar la contraseña');
        }

        const data = await response.json();
        console.log('Response data:', data); // Mostrar datos de la respuesta
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Error:', error); // Mostrar el error completo
        return { success: false, message: error.message };
    }
}