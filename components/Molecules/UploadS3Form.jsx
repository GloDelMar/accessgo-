
import { useState } from "react";
 
const UploadS3Form = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/apiAWS", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data.status);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  return (
    <>
      <div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center text-xl text-center text-[#2F4F4F] mb-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "enviando..." : "Subir foto"}
        </button>
      </form>

      </div>

    </>
  );
};

export default UploadS3Form;