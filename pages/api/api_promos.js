const API_URL = "http://localhost:8080"


export const createpromo = async (body) => {
  try {
    const response = await fetch(`${API_URL}/api/promos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error al agregar promoción:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

export const getPromoById = async (promoId) => {

  fetch(`${API_URL}/api/promos/${promoId}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener la promoción');
      return response.data.json();
    })
    .then(data => console.log('Promoción obtenida:', data))
    .catch(error => console.error('Error:', error));
}

export const getPromoByCompanyId = async (businessId) => {
  try {
    const response = await fetch(`${API_URL}/api/promos/company/${businessId}`);
    if (!response.ok) {
      throw new Error('Error al obtener promociones');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
};


export const deletePromo = async (promoId) => {


  fetch(`${API_URL}/api/promos/${promoId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) throw new Error('Error al eliminar la promoción');
      return response.json();
    })
    .then(data => console.log('Promoción eliminada:', data))
    .catch(error => console.error('Error:', error));

}

export const updatePromoById = async (promoId) => {


  fetch(`${API_URL}/api/promos/${promoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: "Descuento del 25%",
      description: "Promoción actualizada válida hasta fin de mes.",
      startDate: "2024-11-01",
      endDate: "2024-11-30"
    })
  })
    .then(response => {
      if (!response.ok) throw new Error('Error al actualizar la promoción');
      return response.json();
    })
    .then(data => console.log('Promoción actualizada:', data))
    .catch(error => console.error('Error:', error));

}