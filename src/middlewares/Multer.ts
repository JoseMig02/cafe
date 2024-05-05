import multer from 'multer';
import path from 'path';

// Configuración de multer para subir archivos
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../src/uploads')); // Define la carpeta de destino de los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Define el nombre del archivo
  },
});

// Middleware de multer para cargar archivos
const multerUpload = multer({ storage: multerStorage });

export { multerUpload };
