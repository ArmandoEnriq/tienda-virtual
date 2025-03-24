const express = require('express'); // Framework para manejar el servidor
const Product = require('../models/ProductModel'); // Consultas de productos
const authMiddleware = require('../middlewares/authMiddleware'); // Uso de un token de verificacion
const router = express.Router(); // Uso de rutas con express

// Obtener todos los productos
router.get('/', authMiddleware, async (req, res) => { // Definimos una ruta que maneja get y su enlace pero primero verifica si tienes token de verificacion
  try {
    const products = await Product.getAll(); // Usamos el metodo getAll de product  
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un producto por ID
router.get('/:id', authMiddleware, async (req, res) => { // Definimos una ruta que maneja get y su enlace pero primero verifica si tienes token de verificacion
  try {
    const product = await Product.getById(req.params.id); // Usamos el metodo getById de product para obtener un producto por id 
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo producto (solo admin y encargado)
router.post('/', authMiddleware, (req, res) => { // Definimos una ruta que maneja post y su enlace pero primero verifica si tienes token de verificacion
    if (req.user.rol !== 'admin' && req.user.rol !== 'encargado') { // Verificamos que el rol sea admin o encargado
      return res.status(403).json({ message: 'Acceso denegado' }); // Sino es ninguno se le deniega el acceso
    }
    // Lógica para crear un producto
  });
  
  // Actualizar un producto (solo admin y encargado)
  router.put('/:id', authMiddleware, (req, res) => {
    if (req.user.rol !== 'admin' && req.user.rol !== 'encargado') { // Verificamos que el rol sea admin o encargado
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    // Lógica para actualizar un producto
  });
  
  // Eliminar un producto (solo admin)
  router.delete('/:id', authMiddleware, (req, res) => {
    if (req.user.rol !== 'admin') { // Verificamos que el rol sea admin 
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    // Lógica para eliminar un producto
  });

module.exports = router;