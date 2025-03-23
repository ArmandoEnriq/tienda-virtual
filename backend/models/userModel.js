const connection = require('../database/mysql');
const bcrypt = require('bcryptjs');

const User = {};

// Crear un nuevo usuario
User.create = (nombre, email, password) => {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    connection.query(query, [nombre, email, hashedPassword], (err, results) => {
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

// Obtener un usuario por email
User.getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

module.exports = User;