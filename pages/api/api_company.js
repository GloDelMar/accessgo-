

const API_URL = "http://localhost:8080"

export function createCompany(email, password, type) {
    return fetch(`${API_URL}/api/company`, {
        method: "POST",  
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, type })  
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación de la empresa');
        }
        return response.json();  // Devuelve la respuesta como JSON
    })
    .catch(error => {
        console.error('Error:', error);  // Manejo de errores
    });
}


export function getCompanyById(id){
    return fetch (`${API_URL}/api/company/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response =>{
        if(!response.ok){
            throw new Error (`Error fetching company with id ${id}`);
        }
        return response.json();
    })
}


export function updateCompany(id, companyData) {
    return fetch(`${API_URL}/api/company/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData), // Convertir datos a JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error updating company with id ${id}`);
        }
        return response.json(); // Devolver la respuesta actualizada si es necesario
    });
}
