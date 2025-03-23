const mongoose = require('mongoose'); // Librería para conectarse a MongoDB.
const dotenv = require('dotenv'); // Para manejar variables de entorno.

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('✅ Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectMongo;
