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

// Crear detalles de un pedido
Order.createDetails = (pedido_id, producto_id, cantidad, precio) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO detalles_pedidos (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)';
    connection.query(query, [pedido_id, producto_id, cantidad, precio], (err, results) => {
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

// Obtener detalles de un pedido específico
Order.getDetails = (pedido_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT dp.*, p.nombre, p.imagen 
      FROM detalles_pedidos dp
      JOIN productos p ON dp.producto_id = p.id
      WHERE dp.pedido_id = ?
    `;
    connection.query(query, [pedido_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = Order;