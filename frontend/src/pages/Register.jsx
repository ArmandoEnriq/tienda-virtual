import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para cambiarte de pagina despues de una accion
import { registerUser } from '../api/api'; // Usamos la api para register
import '../styles/Auth.css';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ nombre, email, password });
      navigate('/login'); // Redirigir a login después del registro
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      {error && <p className="error">{error}</p>} {/* Es una forma de if , si hay un error entonces muestra el <p> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};