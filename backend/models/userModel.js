const jwt = require('jsonwebtoken'); // Para autenticación con JWT.
const connection = require('../database/mysql'); // Conexion Mysql
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas.
const dotenv = require('dotenv'); // Para uso de variables del archivo .env

dotenv.config(); //Usamos la conf de .env creado
const User = {}; //Creamos un objeto vacio para meter metodos

// Creamos el Metodo Crear un nuevo usuario
User.create = (nombre, email, password, rol = 'usuario') => {
  return new Promise((resolve, reject) => { // El metodo regresa una promesa
    const hashedPassword = bcrypt.hashSync(password, 10); // Encriptamos la contraseña 
    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)'; // creamos el usuario con una consulta mysql
    connection.query(query, [nombre, email, hashedPassword, rol], (err, results) => { // hacemos la consulta y creacion en la conexion de a la base
      if (err) return reject(err);
      resolve(results.insertId); // Si se crea devuelve el id
    });
  });
};

// Creamos el metodo obtener un usuario por email
User.getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Creamos el metodo Generar un token JWT
User.generateToken = (user) => {
    const payload = { // Creamos un objeto que tendra la informacion del token
      id: user.id,
      email: user.email,
      rol: user.rol
    };
    // jwt.sign: Es una función de la librería jsonwebtoken que se usa para generar un token JWT.
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
  };

module.exports = User;