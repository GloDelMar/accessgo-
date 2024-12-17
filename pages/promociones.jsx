import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { createpromo, getPromoByCompanyId } from './api/api_promos';
import { InputWithLabel } from '@/components/atoms/Input';

const View18 = () => {
  const router = useRouter();
  const [companyId, setCompanyId] = useState(null);
  const [description, setDescription] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setCompanyId(storedUserId);
      } else {
        alert('Company ID not found in localStorage');
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 2) {
      alert('Solo se pueden subir un máximo de 2 imágenes.');
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const convertDateToISO = (date) => {
    if (!date || !/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return '';
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId) {
      alert('No se encontró el ID del negocio en la URL.');
      return;
    }

    if (new Date(formValues.startDate) >= new Date(formValues.endDate)) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

    if (!formValues.name || !formValues.startDate || !formValues.endDate || !description) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const promoCount = await getPromoByCompanyId(companyId);
      if (promoCount >= 3) {
        alert('Este negocio ya alcanzó el límite máximo de 3 promociones.');
        return;
      }

      const promoData = {
        businessId: companyId,
        ...formValues,
        description,
        startDate: convertDateToISO(formValues.startDate),
        endDate: convertDateToISO(formValues.endDate),
        images, // Agrega las imágenes al objeto de datos de la promoción
      };

      const response = await createpromo(promoData);

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

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

          {/* Input para las imágenes */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800 mb-2">Imágenes (máximo 2)</label>
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] mb-3"
              />
              <button
                type="button"
                className="bg-[#2F4F4F] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#004D40] transition duration-200"
                onClick={() => {/* Aquí podrías agregar lógica si necesitas que el botón haga algo específico */ }}
              >
                Cargar Imágenes
              </button>
            </div>
            {images.length > 0 && (
              <div className="mt-4 flex justify-center gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      className="w-32 h-32 object-cover border border-gray-300 rounded-lg shadow-md"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <span className="text-xs font-bold">X</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border p-2 rounded-md">
            <Editor
              apiKey="esznwqo0cg68h9ou432ytmrn9h4kv500lnfst1jo8v5r1dwa"
              value={description}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={(content) => setDescription(content)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InputWithLabel
              name="startDate"
              type="text"
              label="Fecha de inicio"
              value={formValues.startDate}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
            />
            <InputWithLabel
              name="endDate"
              type="text"
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