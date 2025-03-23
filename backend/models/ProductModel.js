const connection = require('../database/mysql');

const Product = {};

// Obtener todos los productos
Product.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Obtener un producto por ID
Product.getById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM productos WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Crear un nuevo producto
Product.create = (nombre, descripcion, precio) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
    connection.query(query, [nombre, descripcion, precio], (err, results) => {
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

module.exports = Product;