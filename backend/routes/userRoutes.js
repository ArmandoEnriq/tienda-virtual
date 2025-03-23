const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const userId = await User.create(nombre, email, password);
    res.status(201).json({ id: userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;