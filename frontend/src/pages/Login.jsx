import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import '../styles/Auth.css';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // Evento al precionar envio de formulario
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      login(response.data); // Actualiza el estado de autenticación guardando el token 
      navigate('/productos'); // Redirigir a la página de productos
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>} {/* Si hay un error entonces muestra <p> */}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};