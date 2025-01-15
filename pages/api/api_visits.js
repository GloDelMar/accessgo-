
const API_URL = "https://backend-r159.onrender.com"
export const contarVisita = async (page, id) => {
    try {
        if (!page || !id) {
            throw new Error('Los parámetros "page" y "id" son obligatorios');
        }

        const response = await fetch(`${API_URL}/api/visitas`, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ page, id })  
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Visita registrada:', data);

    } catch (error) {
        console.error('Error al registrar la visita:', error);
    }
};
export const conteoVisita = async (id, periodo) => {
    try {
        if (!id || !periodo) {
            throw new Error('El parámetro "id" y "periodo" son obligatorios');
        }

        const response = await fetch(`${API_URL}/api/visitas/${id}?rango=${periodo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.visitas) {
            console.log(`Estadísticas de visitas para el período ${periodo}:`, data.visitas);
        } else {
            console.log(`No se encontraron visitas para el período ${periodo}.`);
        }

    } catch (error) {
        console.error('Error al obtener las visitas:', error);
    }
};

