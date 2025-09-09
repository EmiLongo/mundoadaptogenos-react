// src/utils/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen';
import { cloudinaryCloudName } from './utils';

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudinaryCloudName
  }
});
