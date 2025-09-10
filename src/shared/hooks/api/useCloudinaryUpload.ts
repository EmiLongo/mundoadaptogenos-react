// src/shared/hooks/api/useCloudinaryUpload.ts
import { cloudinaryCloudName, cloudinaryPresetName } from "@/api/utils";
import { useState } from "react";

interface UploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadResult | null>(null);

  const uploadFile = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryPresetName);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Error al subir el archivo");
      }

      const data: UploadResult = await res.json();
      setUploadedFile(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    uploadedFile,
    uploadFile,
  };
}
