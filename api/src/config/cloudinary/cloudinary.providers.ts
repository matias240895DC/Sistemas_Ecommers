import { v2 as cloudinary } from 'cloudinary';
import { variables_entorno_string } from '../variable_entorno';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: variables_entorno_string('CLOUDINARY_NAME'),
      api_key: variables_entorno_string('CLOUDINARY_API_KEY'),
      api_secret: variables_entorno_string('CLOUDINARY_API_SECRET'),
    });
  },
};
