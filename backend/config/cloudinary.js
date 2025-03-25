const cloudinary = require('cloudinary').v2; // Librería para interactuar con el servicio Cloudinary. La versión v2 es la más reciente.
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Clase especial de multer-storage-cloudinary que permite almacenar archivos directamente en Cloudinary usando Multer.
const multer = require('multer'); // Middleware para manejar la subida de archivos en formularios HTML

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({ // Crea un almacenamiento personalizado para Multer que sube archivos a Cloudinary.
  cloudinary: cloudinary, //  Instancia configurada previamente.
  params: {
    folder: 'tienda-virtual', // Carpeta en Cloudinary donde se guardarán los archivos
    allowed_formats: ['jpg', 'jpeg', 'png'], // Formatos de imagen permitidos (en este caso, solo JPG, JPEG y PNG).
  },
});

const upload = multer({ storage: storage }); // Inicializa Multer con el almacenamiento configurado, esto permite que Multer maneje la subida de archivos y los envíe directamente a Cloudinary.

module.exports = upload;