// src/shared/components/cloudinary/ThumbnailImage.tsx
import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/api/cloudinaryClient";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface IThumbnailImage {
  imgPublicId: string;
  size?: number;
}

export const ThumbnailImage: React.FC<IThumbnailImage> = ({
  imgPublicId,
  size = 250,
}) => {
  const myImage = cld.image(imgPublicId);

  // thumbnail cuadrado base de Cloudinary
  myImage
    .format("auto")
    .quality("auto")
    .resize(fill().width(size).height(size));

  return (
    <AdvancedImage
      cldImg={myImage}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

