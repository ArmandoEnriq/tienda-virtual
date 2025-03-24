const connection = require('../database/mysql'); // Conexion a mysql

const Order = {}; // Es un objeto vacío que se utilizará para almacenar métodos de ordenes.

// Crear un nuevo pedido
Order.create = (usuario_id, total) => { // Creamos el metodo create que recibe el id del usuario que hizo la orden y el numero de piezas
  return new Promise((resolve, reject) => { // El metodo devuelve una promesa
    const query = 'INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)'; //Consulta sql
    connection.query(query, [usuario_id, total], (err, results) => { // Hacemos la conexion a mysql y la consulta
      if (err) return reject(err);
      resolve(results.insertId); // Devuelve el id del producto
    });
  });
};

// Obtener todos los pedidos de un usuario
Order.getByUserId = (usuario_id) => { // Creamos el metodo getByUser que recibe el id del usuario que hizo la orden
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pedidos WHERE usuario_id = ?'; // Consulta sql
    connection.query(query, [usuario_id], (err, results) => { // Conexion a mysql y la consulta
      if (err) return reject(err);
      resolve(results); // Devuelve todas las ordenes que ha hecho
    });
  });
};

module.exports = Order;