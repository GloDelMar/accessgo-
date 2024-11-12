async function geocodeAddress(address) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
        
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.length > 0) {
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);
            console.log('Coordenadas:', latitude, longitude);
            return { latitude, longitude }; // Devuelve un objeto con las coordenadas
        } else {
            console.error('No se encontraron coordenadas para esta dirección');
            return { latitude: null, longitude: null }; // Devuelve null si no se encuentran coordenadas
        }
    } catch (error) {
        console.error('Error al geocodificar la dirección:', error);
        return { latitude: null, longitude: null }; // En caso de error en la solicitud
    }
}

// Llama a la función con la dirección que deseas convertir
//geocodeAddress('1600 Amphitheatre Parkway, Mountain View, CA');
