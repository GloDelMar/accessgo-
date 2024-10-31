

export async function login(email, password) {
  try {
    const response = await fetch(`http://localhost:8080/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // Manejo de la respuesta
    if (!response.ok) {
      if (response.status === 401) { // Cambiado a 401 para manejar errores de autenticación
        throw new Error("Email or password incorrect. Please try again.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const json = await response.json();
    const { token } = json.data; // Asegúrate de que la respuesta tenga la estructura correcta
    return token;

  } catch (error) {
    // Manejo de errores de conexión y otros errores
    if (error instanceof TypeError || error.message.includes('failed to fetch')) {
      throw new Error("Failed to connect to server. Please check your internet connection.");
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
