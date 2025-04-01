import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/home';
import { Products } from './pages/Products';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cart } from './components/Cart'; // Asegúrate de importar el componente Cart
import NotFound from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Checkout } from './pages/Checkout';
import { AdminProducts } from './pages/AdminProducts';
import { ProductForm } from './components/ProductForm';
import { OrderHistory } from './components/OrderHistory';
import { OrderSuccess } from './components/OrderSuccess';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} /> {/*Ruta (pagina) para Login*/}
        <Route path="/register" element={<Register />} />{/*Ruta (pagina) para Registrar*/}
        <Route path="/" element={<Home />} /> {/*Ruta (pagina) de inicio*/}
        <Route path="/productos" element={<Products />} /> {/*Ruta (pagina) de productos*/}
        <Route path="/cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute> } /> {/*Ruta (pagina) de carrito solo si estas iniciado en sesion*/}
        <Route path="/checkout" element={ <ProtectedRoute> <Checkout /> </ProtectedRoute> } /> {/*Ruta (pagina) para resumen y pago solo si estas iniciado en sesion*/}
        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/orders/success" element={<OrderSuccess />} />
        <Route path="*" element={<NotFound />} /> {/*Ruta (pagina) Sino encuentra nada en la pagina dada*/}
        <Route path="/admin/products" element={ <ProtectedRoute allowedRoles={['admin', 'encargado']}> <AdminProducts /> </ProtectedRoute>} /> {/*Ruta (pagina) para administrar los productos si estas iniciado en sesion y cumples con el rol*/}
        <Route path="/admin/products/new" element={ <ProtectedRoute allowedRoles={['admin', 'encargado']}> <ProductForm /> </ProtectedRoute>} />{/*Ruta (pagina) para agregar productos si estas iniciado en sesion y cumples con el rol*/}
        <Route path="/admin/products/edit/:id" element={ <ProtectedRoute allowedRoles={['admin', 'encargado']}> <ProductForm /> </ProtectedRoute>} /> {/*Ruta (pagina) para editar los productos si estas iniciado en sesion y cumples con el rol*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;