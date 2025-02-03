// Client/views/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail]     = useState('');
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
        // Guardamos el token y redirigimos al perfil
        localStorage.setItem('token', data.token);
        navigate('/Perfil');
      } else {
        alert(data.message || 'Error en la autenticación');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input 
            type="text" 
            placeholder="Nombre" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} 
            required 
          />
        )}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isRegistering ? 'Registrarse' : 'Ingresar'}</button>
      </form>
      <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
      </p>
    </div>
  );
}
