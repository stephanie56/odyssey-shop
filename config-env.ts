import { writeFile } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const targetPath = `./src/environments/environment.dev.ts`;

const envConfig = `
  export const environment = {
    production: ${process.env.PRODUCTION},
    CLOUDINARY_CONFIG: {
     USER: '${process.env.CLOUDINARY_USER}',
     PRESET: '${process.env.CLOUDINARY_PRESET}'
    }
  };
`;

writeFile(targetPath, envConfig, (err) => {
  if (err) {
    throw console.error(err);
  }
});
