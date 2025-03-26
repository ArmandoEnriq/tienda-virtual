import { createContext, useContext, useState } from 'react';

const CartContext = createContext(); // Creamos un contexto para que sea usado en modo global

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Cambio de estado del carrito donde estaran los productos

  const addToCart = (product) => { // Funcion agregar productos
    setCart([...cart, product]); // Crea una copia del carrito agregando el nuevo producto
  };

  const removeFromCart = (productId) => { // Funcion eliminar productos
    setCart(cart.filter(item => item.id !== productId)); // Copia todos los elementos del carrito menos el que quieres eliminar por id
  };

  // Regresamos el contexto que esto podra ser usuado por todos los que esten dentro
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);