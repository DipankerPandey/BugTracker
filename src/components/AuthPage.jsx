import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function AuthPage({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const authFunction = isLogin ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
      const userCredential = await authFunction(auth, email, password);
      setCurrentUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need to create an account?' : 'Already have an account?'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default AuthPage;