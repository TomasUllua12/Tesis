// Client/views/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Si tienes estilos para el login

export function Login() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true); // Alterna entre registro y login

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Definir endpoint y payload según la acción
    const endpoint = isRegistering ? 'register' : 'login';
    const payload = isRegistering 
                    ? { nombre, email, password }
                    : { email, password };

    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      if (response.ok) {
        // Guardamos el token y la información del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/Perfil');
      } else {
        alert(data.message || 'Error en la autenticación');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <input 
              type="text" 
              placeholder="Nombre" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              required 
              className="login-input"
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            className="login-input"
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            className="login-input"
          />
          <button type="submit" className="login-button">
            {isRegistering ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>
        <p 
          className="login-toggle" 
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
        </p>
      </div>
    </div>
  );
}
