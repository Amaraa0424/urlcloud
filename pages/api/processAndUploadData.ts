import { readFileSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { uploadToCloudinary } from "@/components/ImageInput";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jsonDataPath =
    "C:\\data_shoppy\\scriptToGetProduct-output\\data-data1.json"; // Аюулгүй байдлын үүднээс замыг өөрчилөв C:\\data_shoppy\\chixevchAndDagaldahHeregsel.json
  const outputPath =
    "C:\\data_shoppy\\scriptToGetProduct-output\\data-zangia.json"; // C:\\data_shoppy\\chixevchAndDagaldahHeregselComplete.json

  try {
    // Read the JSON data file
    const jsonData = JSON.parse(readFileSync(jsonDataPath, "utf8"));

    console.log(`data came here`, jsonData);

    for (const item of jsonData) {
      const uploadedImageUrl = await uploadToCloudinary(item.image);
      item.UploadedImage = uploadedImageUrl;
      console.log(`Image uploaded: ${item.UploadedImage}`);
    }

    // Write the updated JSON data to the output file
    writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), "utf8");
    console.log("Updated JSON data saved to", outputPath);

    res.status(200).json({
      message: "Data processed and uploaded successfully",
      data: jsonData,
    });
  } catch (error) {
    console.error("Error processing JSON data:", error);
    res.status(500).json({ error: "Error processing JSON data" });
  }
};
