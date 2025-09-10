import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/api/cloudinaryClient";

interface IOriginalImage {
  imgPublicId: string;
}

export const OriginalImage: React.FC<IOriginalImage> = ({ imgPublicId }) => {
  // crear la referencia a la imagen en Cloudinary
  const myImage = cld.image(imgPublicId);

  // aplicamos optimizaciones
  myImage.format("auto").quality("auto");

  return (
    <AdvancedImage
      cldImg={myImage}
    />
  );
};

