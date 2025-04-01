const express = require('express');
const Order = require('../models/orderModel');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Crear nueva orden
router.post('/', authMiddleware, async (req, res) => {
    try {
      const { usuario_id, total, items } = req.body;
      
      // Validaciones básicas
      if (!usuario_id || !total || !items || !Array.isArray(items)) {
        return res.status(400).json({ 
          message: 'Datos incompletos: usuario_id, total e items son requeridos' 
        });
      }
  
      // Crear la orden principal
      const orderId = await Order.create(usuario_id, total);
      
      // Crear los detalles de la orden
      await Promise.all(items.map(async (item) => {
        if (!item.productId || !item.quantity || !item.price) {
          throw new Error(`Item inválido: ${JSON.stringify(item)}`);
        }
        await Order.createDetails(orderId, item.productId, item.quantity, item.price);
      }));
      
      res.status(201).json({ 
        success: true,
        orderId,
        message: 'Orden creada exitosamente'
      });
    } catch (err) {
      console.error('Error al crear orden:', err);
      res.status(500).json({ 
        success: false,
        message: 'Error al crear la orden',
        error: err.message
      });
    }
  });

// Obtener órdenes de un usuario
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.getByUserId(req.params.userId);
    const ordersWithDetails = await Promise.all(
      orders.map(async order => {
        const details = await Order.getDetails(order.id);
        return { ...order, items: details };
      })
    );
    res.json(ordersWithDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;