import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Para cambiarte de pagina despues de una accion
import { registerUser } from '../api/api'; // Usamos la api para register
import '../styles/Auth.css';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
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
      {error && <p className="error">{error}</p>}
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
          minLength="6"
        />
        <input
          type="password"
          placeholder="Vuelve a escribir tu contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength="6"
        />
        {password && confirmPassword && password !== confirmPassword && (
          <p className="error">Las contraseñas no coinciden</p>
        )}
        <button 
          type="submit"
          disabled={password && confirmPassword && password !== confirmPassword}
        >
          Registrarse
        </button>
        <p className="auth-link">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
}