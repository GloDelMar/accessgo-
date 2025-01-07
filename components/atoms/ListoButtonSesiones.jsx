import Link from 'next/link';
import { useEffect } from 'react';

const ListoButtonSesiones = ({ userId }) => {

    const [companyId, setCompanyId] = useState(null);
    
  useEffect(() => {
    const companyIdFromLocalStorage = localStorage.getItem('userId');
    if (companyIdFromLocalStorage) {
      setCompanyId(companyIdFromLocalStorage);
    } else {
      console.error('No se encontró el ID de la empresa en localStorage');
    }
  }, []);

  const handleCardClick = async (id) => {
    try {
      const companyData = await getCompanyById(id);
      const companyType = companyData?.data?.company?.cuenta;

      if (companyType === 'free') {
        router.push(`vista-base?id=${id}`);
      } else if (companyType === 'premium') {
        router.push(`vista-prem?id=${id}`);
      } else {
        throw new Error('Tipo de compañía inválido.');
      }
    } catch (error) {
      console.error('Error al manejar el clic de la tarjeta:', error.message);
      toast.error('Error al redirigir a la página de la compañía.');
    }
  };
};

export default ListoButtonSesiones;
