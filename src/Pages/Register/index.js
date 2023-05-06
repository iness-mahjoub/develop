import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
import registerImage from './4.svg';

function Register() {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handleRegister = (e) => {
e.preventDefault();
// Add your register logic here
navigate('/dashboard');
};

return (
<div className="register-page">
<div className="image-container">
<img src={registerImage} alt="Register" />
</div>
<div className="register-form-container">
<h2>Inscrivez-vous</h2>
<form onSubmit={handleRegister}>
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
<div className="form-group">
<input
type="password"
className="form-control"
placeholder="Confirmer le mot de passe"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
required
/>
</div>
<button type="submit" className="btn btn-primary">
S'inscrire
</button>
</form>
<div className="signin-link">
Vous avez déjà un compte ?{' '}
<Link to="/">Connectez-vous ici</Link>
</div>
</div>
</div>
);
}

export default Register;