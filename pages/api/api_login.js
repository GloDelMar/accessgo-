const API_URL = 'https://backend-r159.onrender.com';

export async function login(email, password) {
  if (!email || !password) {
      throw new Error("Email and password are required");
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error("Invalid data");
  }

  try {
      const response = await fetch(`${API_URL}/auth/login`, {
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
          throw new Error("Failed to ");
      } else {
          throw new Error("Unexpected. Try again later");
      }
  }
}
