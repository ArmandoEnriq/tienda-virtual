import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(); // Creamos el contexto para el carrito que sea global

export const CartProvider = ({ children }) => { // Definimos la propiedad del contexto 
  const [cart, setCart] = useState(() => { // Para cambios de estado
    const savedCart = localStorage.getItem('cart'); // Guardamos el contenido de cart en localStore
    return savedCart ? JSON.parse(savedCart) : []; // Preguntamos si hay informacion en localStore, si la hay la devolvemos sino regresa un array vacio
  });

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // Se hace la funcion asincrona que espera a que se guarden los elementos en localStore

  const addToCart = (product) => { // Funcion para agregar productos al carrito
    setCart(prevCart => { // Cambiamos el estado del carrito  usando es estado anterior es como ver que se tiene anteriormente antes de poner el siguiente 
      // Verificar si el producto ya está en el carrito
      const existingItem = prevCart.find(item => 
        item.id === product.id || item.product?.id === product.id // el ? sirve para cambio opcional y Si product es null o undefined, devuelve undefined en lugar de lanzar un error
      );
      
      if (existingItem) { 
        // Si existe, aumentar la cantidad
        return prevCart.map(item => // Ingresamos al carrito para buscar el producto
          (item.id === product.id || item.product?.id === product.id) // Bucamos coincidir el producto
            ? { // Si existe agregamos cantida +1
                ...item, // Mantenemos todas las propiedades
                quantity: (item.quantity || 1) + 1, // Si item.quantity existe, le suma +1.
                product: item.product || item // Mantener la estructura
              }
            : item // Sino lo dejamos tal cual
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCart, { 
          productId: product.id,
          product, // Guardamos el producto completo
          quantity: 1 // Lo iniciamos con quantity 1
        }];
      }
    });
  };

  const removeFromCart = (productId, removeCompletely = false) => { // Funcion para eliminar producto de el carrito
    setCart(prevCart => { // Usamos un estado anterios para verificar el que sigue
      const existingItem = prevCart.find(item => // Buscamos el producto en el carrito
        item.id === productId || item.productId === productId || item.product?.id === productId
      );

      if (!existingItem) return prevCart; // Si no existe, devolvemos el carrito sin cambios

      if (existingItem.quantity > 1 && !removeCompletely) { // verificamos Si hay más de 1 unidad y no se quiere eliminar completamente
        // Reducir la cantidad
        return prevCart.map(item => // Buscamos el producto e el carrito
          (item.id === productId || item.productId === productId || item.product?.id === productId)
            ? { ...item, quantity: item.quantity - 1 } // Si lo encontramos Usamos todas las propiedades pero en quantiti reducimos 1
            : item // sino lo dejamos igual
        );
      } else { // Si solo queda 1 unidad o se quiere eliminar completamente
        // Eliminar el producto del carrito
        return prevCart.filter(item => // Filtramos el carrito sin el producto a eliminar
          !(item.id === productId || item.productId === productId || item.product?.id === productId)
        );
      }
    });
  };

  const clearCart = () => { // Función para vaciar completamente el carrito (establece array vacío)
    setCart([]);
  };

  const getCartTotal = () => { // Función que calcula el total del carrito la cual recibe el total de items
    return cart.reduce((total, item) => { // Recibe en cada vuelta el item
      // Maneja ambos formatos: item.precio directo o item.product.precio
      const price = item.precio || item.product?.precio || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity); // Multiplica precio por cantidad
    }, 0).toFixed(2); // redondea a 2 decimales y el 0 hace referencia a que inicializa en 0 la funcion
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);