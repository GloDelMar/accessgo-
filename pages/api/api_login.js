export async function login(email, password) {
  try {
    const response = await fetch(`https://backend-r159.onrender.com/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    if (!response.ok) {
      if (response.status === 401) { 
        throw new Error("Email or password incorrect. Please try again.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const json = await response.json();
    console.log(json);

    const { token, userId } = json.data; 
    return { token, userId };

  } catch (error) {
    if (error instanceof TypeError || error.message.includes('failed to fetch')) {
      throw new Error("Failed to connect to server. Please check your internet connection.");
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
