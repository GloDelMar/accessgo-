import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { toast, Toaster } from 'sonner';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ImagenSubiryBorrar = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Cargar imágenes del servidor
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://backend-r159.onrender.com/api/images/${userId}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error("Expected an array, but got:", data);
        setImages([]);
      }
    };
    fetchImages();
  }, [userId]);

  const handleUpload = async (index, file) => {
    if (!file || !userId) {
      toast.error("Imagen incompatible prueba con otra imagen diferente");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    try {
      const response = await fetch(
        "https://backend-r159.onrender.com/api/uploadacc",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.url) {
        // Actualizar la imagen en la lista después de subirla con éxito
        const newImages = [...images];
        newImages[index] = data.url;
        setImages(newImages);
        toast.success("Imagen subida exitosamente");
      } else {
        toast.error("Error al subir imagen");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (index) => {
    const imageToDelete = images[index];
  
    if (!imageToDelete) {
      toast.error("No se encontró la URL de la imagen");
      return;
    }
  
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas borrar esta imagen?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:8080/api/deleteacc`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ url: imageToDelete }),
                }
              );
  
              if (response.ok) {
                const newImages = [...images];
                newImages.splice(index, 1); // Elimina del estado
                setImages(newImages);
                toast.success("Imagen borrada exitosamente");
              } else {
                toast.error("Error al borrar la imagen");
              }
            } catch (error) {
              console.error("Failed to delete image:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada"),
        },
      ],
    });
  };
  
  

  return (
    <div className="w-full max-w-[1022px] mx-auto">
      {/* Uploader Section */}
      <div className="flex gap-4 flex-wrap mb-8">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="relative w-[150px] h-[150px] border border-gray-300 flex justify-center items-center rounded-lg overflow-hidden"
            >
              {images[index] ? (
                <>
                  <img
                    src={images[index]}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <img
                    src="/foto.jpg"
                    alt="Upload Placeholder"
                    className="w-8 h-8"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(index, e.target.files[0])}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          ))}
      </div>
      <Toaster />
    </div>
  );
};

export default ImagenSubiryBorrar;
