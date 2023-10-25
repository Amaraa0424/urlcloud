"use client";
import React, { useState } from "react";
import axios from "axios";

const ImageInput: React.FC<{ onImageSubmit: (url: string) => void }> = ({
  onImageSubmit,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = () => {
    onImageSubmit(imageUrl);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Upload Image</button>
    </div>
  );
};

export default ImageInput;

export const uploadToCloudinary = async (imageUrl: string) => {
  try {
    // Replace with your Cloudinary credentials
    const cloudName = "dyazf5drt";
    const apiKey = "644472723997976";
    const apiSecret = "vUGsmQVVEFXIYoCx0t55MBZbwrs";

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        file: imageUrl,
        upload_preset: "lz2yucbp",
        api_key: apiKey,
        api_secret: apiSecret,
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
