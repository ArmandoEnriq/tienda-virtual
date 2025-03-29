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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={ <ProtectedRoute> <Checkout /> </ProtectedRoute> } />
        <Route path="/productos" element={<Products />} />
        <Route path="/cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;