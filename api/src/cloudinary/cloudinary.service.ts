import { HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/config/cloudinary/cloudinary.response';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<{
    status: number;
    url: string;
    bytes: number;
    width: number;
    height: number;
  }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'uploads', // opcional, para organizar en carpetas
          resource_type: 'auto', // detecta imagen/video
          transformation: [
            { width: 1280, height: 1280, crop: 'limit' }, // limita resolución sin deformar
            { quality: 'auto:eco' },
            { fetch_format: 'auto' }, // convierte a WebP/AVIF según navegador
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error('No result returned from Cloudinary'));

          // ✅ Devolvemos también el peso y tamaño si querés registrar métricas
          resolve({
            status: HttpStatus.OK,
            url: result.secure_url,
            bytes: result.bytes, // peso final en bytes
            width: result.width, // ancho
            height: result.height, // alto
          });
        },
      );

      // Convierte el buffer en un stream legible
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
