
const API_URL =  "https://backend-r159.onrender.com"

export const contarVisita = async (page, companyId) => {
    try {
        if (!page || !companyId) {
            throw new Error('Los parámetros "page" y "companyId" son obligatorios');
        }

        const userIp = await obtenerIP(); // Obtén la IP del usuario
        if (!userIp) {
            console.warn('No se pudo obtener la IP del usuario');
            return;
        }

        const response = await fetch(`${API_URL}/api/visitas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page, companyId, ip: userIp }), // Envía la IP al backend
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.message && data.message === 'Ya tiene visita registrada.') {
            console.log('Ya tiene visita registrada.');
        } else {
            console.log('Visita registrada:', data);
        }

    } catch (error) {
        console.error('Error al registrar la visita:', error);
    }
};



export const conteoVisita = async (companyId, rango) => {
    try {
        if (!companyId || !rango) {
            throw new Error('El parámetro "id" y "periodo" son obligatorios');
        }

        const response = await fetch(`${API_URL}/api/visitas/${companyId}?rango=${rango}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.visits) {
            console.log(`Estadísticas de visitas para el período ${rango}:`, data.visits);
        } else {
            console.log(`No se encontraron visitas para el período ${rango}.`);
        }

    } catch (error) {
        console.error('Error al obtener las visitas:', error);
    }
};


export const obtenerIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error(`Error al obtener la IP: ${response.statusText}`);
        }
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error al obtener la IP:', error);
        return null; // Manejar el caso en que no se pueda obtener la IP
    }
};
