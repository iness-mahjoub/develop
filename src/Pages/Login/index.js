import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
import loginImage from './1.svg';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="login-form-container">
        <h2>Connectez-vous à votre compte</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Connexion
          </button>
        </form>
        <div className="signup-link">
          Vous n'avez pas de compte ?{' '}
          <Link to="/Register">Inscrivez-vous ici</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
