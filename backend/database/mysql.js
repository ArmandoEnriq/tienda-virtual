const mysql = require('mysql2'); // Librería para conectarse a MySQL.
const dotenv = require('dotenv'); // Para manejar variables de entorno.

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

module.exports = connection;