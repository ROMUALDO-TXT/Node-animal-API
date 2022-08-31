import multer, { FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

interface IUploadConfig {
  driver: 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: tmpFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const filehash = crypto.randomBytes(10).toString('hex');
        const filename = `${filehash}-${file.originalname}`;
        callback(null, filename);
      },
    }),
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter(
      request: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback,
    ): void {
      const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  },
} as IUploadConfig;
