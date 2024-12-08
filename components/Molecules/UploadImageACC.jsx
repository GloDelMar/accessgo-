import { useState, useEffect } from 'react';

const UploadImageACC = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [userId, setUserId] = useState(null); 

  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('No userId found in localStorage');
    }
  }, []); 

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image || !userId) {
      alert('User ID or image missing');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId); 

    try {
      const response = await fetch('https://backend-r159.onrender.com/api/uploadacc', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      
      <label
        htmlFor="file-upload"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
      >
        {image ? image.name : 'Seleccionar archivo'}
      </label>
      <input
        type="file"
        id="file-upload"
        className="hidden" 
        onChange={handleFileChange}
      />

     
      <button
        onClick={handleUpload}
        disabled={uploading || !image}
        className={`px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none disabled:bg-gray-400`}
      >
        {uploading ? 'Subiendo...' : 'Subir'}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p>Imagen subida con éxito!</p>
          <img src={imageUrl} alt="Uploaded" width={200} className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default UploadImageACC;
