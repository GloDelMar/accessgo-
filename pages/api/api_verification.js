export const sendVerificationCode = async (email) => {
    try {
        const requestBody = JSON.stringify({ email });
        console.log('Datos enviados en la solicitud:', requestBody);

        const response = await fetch(`http://localhost:8080/api/verification/send-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al enviar el código de verificación: ${errorData.message || 'Error desconocido'}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const verifyUserCode = async (userId, code) => {
    try {
        const response = await fetch(`http://localhost:8080/api/verification/verify-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, code,
verified:true
             }),
        });

        if (!response.ok) {
            throw new Error('Error al verificar el código');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

