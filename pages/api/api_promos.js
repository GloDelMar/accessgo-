const API_URL = "https://backend-r159.onrender.com"


export const createpromo = async () => {
    try {
        const response = await fetch('/api/promotions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Promoción agregada:', data);
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
  return response.json();
})
.then(data => console.log('Promoción obtenida:', data))
.catch(error => console.error('Error:', error));
}


export const getPromoByCompanyId = async (businessId) => {
    

fetch(`${API_URL}/api/promos/business/${businessId}`)
  .then(response => {
    if (!response.ok) throw new Error('Error al obtener promociones');
    return response.json();
  })
  .then(data => console.log('Promociones del negocio:', data))
  .catch(error => console.error('Error:', error));

}


export const deletePromo = async (promoId ) =>{
  

fetch(`/api/promos/${promoId}`, {
  method: 'DELETE'
})
  .then(response => {
    if (!response.ok) throw new Error('Error al eliminar la promoción');
    return response.json();
  })
  .then(data => console.log('Promoción eliminada:', data))
  .catch(error => console.error('Error:', error));

}

export const updatePromoById = async (promoId)=>{


fetch(`/api/promos/${promoId}`, {
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