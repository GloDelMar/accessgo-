const API_URL = "http://localhost:8080";

export async function login(email, password) {
  if (!email || !password) {
      throw new Error("Email and password are required");
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error("Invalid input type");
  }

  try {
      const response = await fetch(`${API_URL}/api/auth`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email,
              password,
          }),
      });

      if (!response.ok) {
          if (response.status === 409) {
              throw new Error("Email or password incorrect. Please try again.");
          } else {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
      }

      const json = await response.json();
      const { token } = json.data;
      return token;
  } catch (error) {
      if (error instanceof TypeError || error.message.includes('failed to fetch')) {
          throw new Error("Failed to connect to server. Please check your internet connection.");
      } else {
          throw new Error("An unexpected error occurred. Please try again later.");
      }
  }
}
