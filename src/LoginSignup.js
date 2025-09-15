import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';

export default function LoginSignup({ onAuth }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/signup' : '/login';
    try {
      const { data } = await axios.post(`http://localhost:3001${endpoint}`, form);
      onAuth(data.name || 'User');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <div
        className="auth-toggle"
        onClick={() => setIsSignup((prev) => !prev)}
      >
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
      </div>
    </div>
  );
}
