const API_URL = "http://localhost:8080"; 

export const createAccount = async (email, password, type) => {
  try {
    const body = { email, password, type };

    // Seleccionar la URL en función del tipo de cuenta (ejemplo)
    // const endpoint = type === 'empresa' ? '/api/empresas' : '/api/usuarios'; // Agrega tu lógica aquí

    const response = await fetch(`${API_URL}/api/users`, { // Corrección aquí
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Error en la solicitud";
      if (response.status >= 500) {
        throw new Error("Error del servidor. Intenta nuevamente más tarde.");
      }
      throw new Error(errorMessage);
    }

    return await response.json(); // Devolver los datos de la cuenta creada
  } catch (error) {
    console.error("Error en la solicitud de registro:", error.message);
    throw error; // Propagar el error al frontend
  }
};
