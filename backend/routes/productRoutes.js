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

// Crear un nuevo producto
router.post('/', authMiddleware, async (req, res) => { // Definimos una ruta que maneja post y su enlace pero primero verifica si tienes token de verificacion
  try {
    const { nombre, descripcion, precio } = req.body; // Obtenemos nombre, descripcion, precio del cuerpo de la solicitud para post
    const productId = await Product.create(nombre, descripcion, precio); // Usamos el metodo create de product para crear un producto con nombre, descripcion, precio
    res.status(201).json({ id: productId }); // Devuelve el id si se crea
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;