"use client";
import React, { useState, useEffect } from "react";
import ImageInput from "../components/ImageInput";
import { uploadToCloudinary } from "../components/ImageInput";
import "dotenv/config";

const Home: React.FC = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleDataProcessing = async () => {
    try {
      const response = await fetch("/api/processAndUploadData", {
        method: "POST",
      });

      if (response.ok) {
        // Request was successful
        const data = await response.json();
        console.log("Data processing response:", data);
        // You can add additional handling or update your UI here
      } else {
        // Request failed
        console.error("Error processing data:", response.statusText);
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

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
      {/* ALERT!!!!!!! ЭНЭ BUTTON НЬ ӨӨР ЗАМААС АЙМШИГТАЙ ОЛОН ЗУРАГ АВААД БҮГДИЙГ НЬ CLOUDINARY РҮҮ ХИЙНЭ. */}
      {/* НӨХЦӨЛД БҮҮ ДАХИЖ АЖЛУУУЛ!!!!!!!! */}
      <button
        onClick={()=>{
          console.log(`clicked`)
          handleDataProcessing();
        }}
        className="border px-10 py-3 border-red mb-5"
      >Data proccess and upload extremly many counts of link to cloudinary to click</button>
      <ImageInput onImageSubmit={handleImageSubmit} />

      {uploadedImageUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Uploaded Image:</h2>
          <img src={uploadedImageUrl} alt="Uploaded" className="max-w-full" />

          <p className="text-blue-600 mt-2">
            Image Link:
            <a
              href={uploadedImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 cursor-pointer"
            >
              {isCopied ? (
                <span
                  className="text-4xl font-bold text-yellow-600 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(uploadedImageUrl)
                      .then(() => setIsCopied(true));
                  }}
                >
                  Copied!
                </span>
              ) : (
                <span
                  className="text-4xl font-bold text-indigo-600 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(uploadedImageUrl)
                      .then(() => setIsCopied(true));
                  }}
                >
                  Copy
                </span>
              )}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
