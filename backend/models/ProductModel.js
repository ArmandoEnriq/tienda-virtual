const connection = require('../database/mysql'); // Usamos la conexion mysql

const Product = {}; // Es un objeto vacío que se utilizará para almacenar métodos de productos.

// Metodo para obtener todos los productos
Product.getAll = () => { // Creamos el metodo getAll que no recibe nada
  return new Promise((resolve, reject) => { // Este metodo devuelve una promesa
    const query = 'SELECT * FROM productos'; // Consulta sql
    connection.query(query, (err, results) => { // conexion a mysql y consulta al mismo
      if (err) return reject(err);
      resolve(results); // Devuelve todos los productos
    });
  });
};

// Metodo para obtener un producto por ID
Product.getById = (id) => { // Creamos el metodo getById que recibe el id del producto
  return new Promise((resolve, reject) => { // El metodo devuelve una promesa
    const query = 'SELECT * FROM productos WHERE id = ?'; // Consulta sql
    connection.query(query, [id], (err, results) => { // conexion a mysql y consulta al mismo
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Metodo para crear un nuevo producto
Product.create = (nombre, descripcion, precio) => { // Creamos el metodo create que recibe el nombre, descripcion y precio del producto
  return new Promise((resolve, reject) => { // El metodo devuelve una promesa
    const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)'; // Consulta sql
    connection.query(query, [nombre, descripcion, precio], (err, results) => { // conexion a mysql y consulta al mismo
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

module.exports = Product;