// src/shared/hooks/api/useCloudinaryMultipleUploads.ts
import { cloudinaryCloudName, cloudinaryPresetName } from "@/api/utils";
import { useState } from "react";

interface UploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const useCloudinaryMultiUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadResult[]>([]);

  const uploadFiles = async (files: File[]): Promise<UploadResult[]> => {
    setUploading(true);
    setError(null);
    setUploadedFiles([]);

    try {
      const promises = files.map(async (file) => {
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
          throw new Error(`Error al subir el archivo: ${file.name}`);
        }

        return res.json() as Promise<UploadResult>;
      });

      const results = await Promise.all(promises);
      setUploadedFiles(results);
      return results;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      return [];
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    uploadedFiles,
    uploadFiles,
  };
}