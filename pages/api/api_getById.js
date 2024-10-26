const API_URL = "http://localhost:8080"


export function getUserById(id) {
    return fetch(`${API_URL}/api/${id}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching user with id ${id}`);
        }
        return response.json();
      });
  }
  