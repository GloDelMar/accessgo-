
export const sendVerificationCode = async (email) => {
    try {
      const response = await fetch('https://backend-r159.onrender.com/api/verification/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      // Asegúrate de que la respuesta se parsee correctamente
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error en la solicitud:', data.message || 'Error desconocido');
        
      }
  
      return data; // Esto debería devolver un objeto JSON
    } catch (error) {
      console.error('Error en la comunicación con el servidor:', error.message);
      throw error;
    }
  };
  


export const verifyUserCode = async (userId, code) => {
    try {
       const response = await fetch(`https://backend-r159.onrender.com/api/verification/verify-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, code }),
        });

        if (!response.ok) {
            throw new Error('Error al verificar el código');
        }

       
        const data = await response.json();

       
        return data.message || 'Código verificado con éxito';
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateVerificationStatus = async (userId)=> {
    try {
        const response = await fetch('https://backend-r159.onrender.com/api/verification/verified-true', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }) 
        });

        if (!response.ok) {
          
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el estado de verificación.');
        }

        const data = await response.json();
        console.log('Estado de verificación actualizado:', data);
    } catch (error) {
        console.error('Error en la actualización del estado de verificación:', error);
    }
}

export function loginUser(email, password) {
    return fetch(`https://backend-r159.onrender.com/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas')
        }
        return response.json()
    })
    .then(data => {
        
        localStorage.setItem('token', data.data.token)
        console.log("recibo",data.data.token )
        return data;
    })
 }
 