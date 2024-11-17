import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Auth = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/auth/signup' : '/auth/login';
    try {
      const { data } = await axiosInstance.post(endpoint, formData);
      localStorage.setItem('token', data.token);
      navigate('/cars');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)} className="toggle-button">
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
