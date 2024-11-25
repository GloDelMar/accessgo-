import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createpromo, getPromoByCompanyId } from './api/api_promos'; // Asegúrate de tener estas funciones definidas
import { InputWithLabel } from '@/components/atoms/Input';

const View18 = () => {
  const router = useRouter();
  const { id } = router.query; // Tomamos el businessId del query de la URL

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
     });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const convertDateToISO = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert('No se encontró el ID del negocio en la URL.');
      return;
    }

    // Validación de fechas y horarios
    if (new Date(formValues.startDate) >= new Date(formValues.endDate)) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

 
    try {
      // Obtener el número de promociones existentes para el negocio
      const promoCount = await getPromoByCompanyId(id);
      if (promoCount >= 3) {
        alert('Este negocio ya alcanzó el límite máximo de 3 promociones.');
        return;
      }
const businessId = id
      // Preparar los datos para enviar
      const promoData = {
        businessId,
        ...formValues,
        startDate: convertDateToISO(formValues.startDate),
        endDate: convertDateToISO(formValues.endDate),
      };

     console.log("así se envía:", promoData)
      const response = await createpromo(promoData);
      console.log("la respuesta", response)
      if (response.success) {
        alert('Promoción guardada exitosamente');
        router.push('/sesion-prem');
      } else {
        alert('Error al guardar la promoción');
      }
    } catch (error) {
      console.error('Error al guardar la promoción:', error);
      alert('Ocurrió un error al intentar guardar la promoción.');
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#263238]">
        Editar Promoción
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 space-y-6 w-full">
          <InputWithLabel
            name="name"
            label="Nombre de la promoción"
            placeholder="Ingresar nombre"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formValues.description}
            onChange={handleInputChange}
            className="w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
          />
          <div className="grid gap-4 md:grid-cols-2">
        <InputWithLabel
          name="startDate"
          type="text" // Usamos 'text' para permitir el formato personalizado
          label="Fecha de inicio"
          value={formValues.startDate}
          onChange={handleInputChange}
          placeholder="DD/MM/YYYY"
        />
        <InputWithLabel
          name="endDate"
          type="text" // Usamos 'text' para permitir el formato personalizado
          label="Fecha de fin"
          value={formValues.endDate}
          onChange={handleInputChange}
          placeholder="DD/MM/YYYY"
        />
      </div>
        
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className="px-12 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default View18;
