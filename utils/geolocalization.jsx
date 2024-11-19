const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocalización no es soportada por este navegador."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        // Manejo más detallado de errores
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Permiso denegado para acceder a la ubicación."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("La ubicación no está disponible en este momento."));
            break;
          case error.TIMEOUT:
            reject(new Error("El tiempo de espera para obtener la ubicación expiró."));
            break;
          default:
            reject(new Error("Ocurrió un error desconocido al obtener la ubicación."));
            break;
        }
      },
      {
        enableHighAccuracy: true, // Intenta obtener mayor precisión
        timeout: 10000, // Tiempo límite para obtener la ubicación (10 segundos)
        maximumAge: 0, // No usa caché, fuerza a obtener datos actuales
      }
    );
  });
};

export default getUserLocation;
