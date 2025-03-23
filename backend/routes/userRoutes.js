const express = require('express'); //Framework para manejar el servidor.
const User = require('../models/userModel'); //Manejo de sql usuarios
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas.
const router = express.Router(); // Usaremos express para manejo de rutas

// Registrar un nuevo usuario
router.post('/register', async (req, res) => { //Definimos una ruta que maneja post y su enlace
  try {
    const { nombre, email, password } = req.body; // Buscamos en el cuerpo los valores
    const userId = await User.create(nombre, email, password); // Usamos el metodo create de user
    res.status(201).json({ id: userId }); // Si lo crea devuelve el id
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => { // Creamos una ruta para post con su enlace
  try {
    const { email, password } = req.body;// Buscamos en el cuerpo los valores
    const user = await User.getByEmail(email); // Usamos el metodo getBtEmail de user para buscar el email
    if (!user || !bcrypt.compareSync(password, user.password)) { // verifica si encuentra el usuario o la contraseña esta mal
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    // Generar un token JWT
    const token = User.generateToken(user); // Usa el metodo de user para generar un token
    res.json({ token }); // Devuelve el token en formato json
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;