const express = require('express'); // Framework para crear el servidor.
const cors = require('cors'); // Permite peticiones de otros dominios ejemplo el backend esta en localhost//3000 y el frontend en localhost//4000 sin esto no se podrian comunicar
const dotenv = require('dotenv'); //  // Cargar variables de entorno desde .env
const connection = require('./database/mysql'); // Importa la conexión a MySQL

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la tienda virtual!');
});

// Rutas
app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


// Verificar conexión a MySQL
app.get('/test-db', (req, res) => {
    connection.query('SELECT 1 + 1 AS result', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json({ message: 'Conexión exitosa a MySQL', result });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});