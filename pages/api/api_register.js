const API_URL = "http://localhost:8080";

export const createAccount = async (email, password, type) => {
  try {
    // Construir el objeto con la estructura solicitada
    const body = {
      email,
      password,
      type,
    };

       // Realizar la solicitud de registro
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
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
