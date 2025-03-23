const jwt = require('jsonwebtoken'); // Para autenticación con JWT.
const dotenv = require('dotenv'); // Para manejar variables de entorno .env

dotenv.config(); // Usamos la configuracion del .env creado

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); // Obtiene el token JWT del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifica si el token es válido usando la palabra secreta en el .env
    req.user = decoded; //  Si el token es válido, jwt.verify devuelve el payload (el objeto con la informacion del token) decodificado
    next(); // Pasa el control al siguiente middleware o ruta. 
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;