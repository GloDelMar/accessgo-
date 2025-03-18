import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { InputWithLabel } from '@/components/atoms/Input';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiUpload, FiX } from "react-icons/fi";

const View18 = () => {
  const router = useRouter();
  const [companyId, setCompanyId] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [description, setDescription] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    startDate: null,
    endDate: null,
    images: [],
  });

  
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formValues.images.length > 2) {
      alert("Solo puedes subir un máximo de 2 imágenes.");
      return;
    }
  
    // Las imágenes no se suben aquí, simplemente se guardan para el envío posterior
    const uploadedImages = files.map((file) => {
      return { preview: URL.createObjectURL(file), file }; // Solo crear vista previa
    });
  
    setFormValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, ...uploadedImages],
    }));
  
  };
  
  
  const handleRemoveImage = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: prevValues.images.filter((_, i) => i !== index),
    }));
  };

  const convertDateToISO = (date) => {
    if (!date) return '';
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    if (!formValues.name || !formValues.startDate || !formValues.endDate || formValues.images.length === 0) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    // Crear FormData
    const formData = new FormData();
    formData.append("businessId", companyId);
    formData.append("name", formValues.name);
    formData.append("description", description);
    formData.append("startDate", convertDateToISO(formValues.startDate));
    formData.append("endDate", convertDateToISO(formValues.endDate));
  
    // Enviar los archivos de imágenes, no las URLs
    formValues.images.forEach((image) => {
       formData.append("images", image.file);  // Enviar solo el archivo, no la URL
    });
  
    console.log("🚀 FormData a enviar:", formData);
  
    try {
      // Enviar los datos al backend
      const response = await axios.post("https://backend-r159.onrender.com/api/promos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("Promoción guardada exitosamente");
      router.push('/sesion-prem');
    } catch (error) {
      console.error("❌ Error al guardar la promoción:", error);
      alert("Error al guardar la promoción. Inténtalo de nuevo.");
    }
  };
  
  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#263238]">Editar Promoción</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 space-y-6 w-full">
          <InputWithLabel
            name="name"
            label="Nombre de la promoción"
            placeholder="Ingresar nombre"
            value={formValues.name}
            onChange={handleInputChange}
          />

          <div className="mb-6">
            <label className="block text-lg font-semibold text-[#2F4F4F] mb-3">
              Imágenes (máximo 2)
            </label>

            <div className="border-2 border-dashed border-[#2F4F4F] rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
              <FiUpload className="text-[#2F4F4F] text-4xl mb-2" />
              <p className="text-sm text-[#455A64]">Haz clic o arrastra tus imágenes</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="mt-2 cursor-pointer bg-[#2F4F4F] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#004D40] transition"
              >
                Subir Imágenes
              </label>
            </div>

            {formValues.images.length > 0 && (
              <div className="mt-4 flex justify-center gap-4">
                {formValues.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.preview}
                      alt={`Preview ${index}`}
                      className="w-32 h-32 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-80 group-hover:opacity-100 transition"
                    >
                      <FiX className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border p-2 rounded-md">
            {isClient && (
              <Editor
                apiKey="esznwqo0cg68h9ou432ytmrn9h4kv500lnfst1jo8v5r1dwa"
                value={description}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: ['advlist', 'lists', 'link'], 
                  toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={(content) => setDescription(content)}
              />
            )}
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:space-x-4">
            <div className="flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-[#455A64] text-left mb-2">
                Fecha de inicio
              </label>
              <DatePicker
                selected={formValues.startDate}
                onChange={(date) => setFormValues({ ...formValues, startDate: date })}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="w-full p-3 border-2 rounded-md text-[#455A64] bg-[#F5F5F5] border-[#2F4F4F] focus:ring-2 focus:ring-[#004D40] focus:outline-none"
              />
            </div>

            <div className="flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-[#455A64] text-left mb-2">
                Fecha de finalización
              </label>
              <DatePicker
                selected={formValues.endDate}
                onChange={(date) => setFormValues({ ...formValues, endDate: date })}
                dateFormat="dd/MM/yyyy"
                minDate={formValues.startDate || new Date()}
                className="w-full p-3 border-2 rounded-md text-[#455A64] bg-[#F5F5F5] border-[#2F4F4F] focus:ring-2 focus:ring-[#004D40] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-center space-x-4">
            <button
              type="button"
              className="w-[155px] h-[40px] bg-white border-2 rounded-lg"
              onClick={() => {
                setFormValues({ name: '', startDate: '', endDate: '', images: [] });
                setDescription('');
                router.push('/sesion-prem');
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-12 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40]"
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
