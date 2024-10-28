const API_URL = "http://localhost:8080"

export const handleEmailCheck = async (email, context) => {
    try {
        const response = await fetch(`${API_URL}/api/verification/checkEmail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, context }) // Enviamos el contexto (login o crearAccount)
        });

        const data = await response.json();

        // Aquí puedes manejar la lógica siguiente dependiendo de "data.exists" y "data.verified"
        if (response.ok) {
            setModalMessage(data.message); // Mostrar mensaje basado en el contexto
            setIsModalOpen(true);
        } else {
            setModalMessage('Hubo un error al procesar tu solicitud.');
            setIsModalOpen(true);
        }

        return data; // Retornar los datos para usarlos en la lógica de View4
    } catch (error) {
        console.error('Error en la verificación del correo:', error);
        setModalMessage('Hubo un error al procesar tu solicitud.');
        setIsModalOpen(true);
    }
};
