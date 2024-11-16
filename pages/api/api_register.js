const API_URL = "https://backend-r159.onrender.com";

export const createAccount = async (email, password, type) => {
  try {
    const body = {
      email,
      password,
      type,
    };
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

    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud de registro:", error.message);
    throw error;
  }
};
