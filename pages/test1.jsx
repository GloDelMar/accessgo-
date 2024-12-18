import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const ImageUploader = () => {
  const [images, setImages] = useState([null, null, null, null]);

  const handleUpload = (index, file) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file);
    setImages(newImages);
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          {image ? (
            <>
              <img
                src={image}
                alt={`Uploaded ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <button
                  onClick={() => handleDelete(index)}
                  style={{ padding: "5px", background: "#f0f0f0", border: "none", borderRadius: "50%" }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <label
                style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <img
                  src="/foto.jpg"
                  alt="Camera Placeholder"
                  style={{ width: "32px", height: "32px" }}
                />
                <input
                  id={`file-input-${index}`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleUpload(index, e.target.files[0])}
                />
              </label>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
