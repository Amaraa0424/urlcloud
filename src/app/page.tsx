"use client";
import React, { useState } from "react";
import ImageInput from "../components/ImageInput";
import { uploadToCloudinary } from "../components/ImageInput";

const Home: React.FC = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleImageSubmit = async (imageUrl: string) => {
    try {
      const cloudinaryUrl = await uploadToCloudinary(imageUrl);
      setUploadedImageUrl(cloudinaryUrl);
      setIsCopied(false); 
      console.log("Image uploaded to Cloudinary:", cloudinaryUrl);
    } catch (error) {
      console.error("Error handling image:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Image Uploader</h1>
      <ImageInput onImageSubmit={handleImageSubmit} />

      {uploadedImageUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Uploaded Image:</h2>
          <img src={uploadedImageUrl} alt="Uploaded" className="max-w-full" />

          <p className="text-blue-600 mt-2">
            Image Link:
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 cursor-pointer"
            >
              {isCopied ? (
                <p
                  className="text-4xl font-bold text-yellow-600"
                  onClick={() => {
                    navigator.clipboard.writeText(uploadedImageUrl);
                  }}
                >
                  Copied!
                </p>
              ) : (
                <p className="text-4xl font-bold text-indigo-600">Copy</p>
              )}
              {uploadedImageUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
