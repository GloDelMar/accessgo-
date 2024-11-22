
const API_URL = "http://localhost:8080"

export const contarVisita = async (page, id)=> {
    fetch(`${API_URL}/api/visitas`, {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ page,
        id})  
    })
    .then(response => response.json())
    .then(data => {
        console.log('Visita registrada:', data);
    })
    .catch(error => {
        console.error('Error al registrar la visita:', error);
    });
}

export const conteoVisita = async (id, periodo) => {
    try {
        // Asegúrate de que 'id' y 'periodo' sean válidos
        if (!id || !periodo) {
            throw new Error('El parámetro "id" y "periodo" son obligatorios');
        }

        // Realizamos la solicitud GET pasando el id y el periodo en la URL
        const response = await fetch(`${API_URL}/api/visitas/${id}/estadisticas?periodo=${periodo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Obtenemos los datos de la respuesta
        const data = await response.json();

        // Si los datos contienen estadísticas válidas, los mostramos
        if (data && data.visitas) {
            console.log(`Estadísticas de visitas para el período ${periodo}:`, data.visitas);
        } else {
            console.log(`No se encontraron visitas para el período ${periodo}.`);
        }
    } catch (error) {
        console.error('Error al obtener las visitas:', error);
    }
}
