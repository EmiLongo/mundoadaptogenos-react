import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/api/cloudinaryClient";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface IThumbnailImage {
  imgPublicId: string;
}

export const ThumbnailImage: React.FC<IThumbnailImage> = ({ imgPublicId }) => {
  // crear la referencia a la imagen en Cloudinary
  const myImage = cld.image(imgPublicId);

  // aplicamos optimizaciones para thumbnails
  myImage
    .format("auto")
    .quality("auto")
    .resize(fill().width(144).height(144)); 

  return (
    <AdvancedImage
      cldImg={myImage}
      styles={{ width: "100%", height: "100%" }}
    />
  );
};

