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
Product.create = (nombre, descripcion, precio, cantidad, imagen) => { // Creamos el metodo create que recibe el nombre, descripcion, precio, cantidad e imagen del producto
  return new Promise((resolve, reject) => { // El metodo devuelve una promesa
    const query = 'INSERT INTO productos (nombre, descripcion, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?)'; // Consulta sql
    connection.query(query, [nombre, descripcion, precio, cantidad, imagen], (err, results) => { // conexion a mysql y consulta del sql
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

// Metodo para actualizar un producto
Product.update = (id, nombre, descripcion, precio, cantidad, imagen) => { // Creamos el metodo update con el cual podemos actualizar nombre, descripcion, precio, cantidad, imagen
    return new Promise((resolve, reject) => {
      const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, imagen = ? WHERE id = ?'; // Consulta sql para actualizar
      connection.query(query, [nombre, descripcion, precio, cantidad, imagen, id], (err, results) => { // Conexion mysql y consulta sql
        if (err) return reject(err);
        resolve(results.affectedRows); // Devuelve el numero de filas afectadas
        });
    });
};
  
// Eliminar un producto
Product.delete = (id) => { // Creamos el metodo delete con el cual eliminamos un producto por su id
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM productos WHERE id = ?'; // Creamos la consulta sql
    connection.query(query, [id], (err, results) => { // Hacemos la conexion y aplicamos la consulta
      if (err) return reject(err);
      resolve(results.affectedRows); // Devuelve el numero de filas afectadas
    });
  });
};

module.exports = Product;