import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Label from "../components/shared/Label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../utils/api';
import googleIcon from '../assets/google.jpg'; 

const Login = ({ toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Sending login request...');
      const response = await api.post('/login', {
        email,
        password
      });
      
      console.log('Response received:', response.data);

      if (response.status === 200) {
        setSuccess('Login successful!');
        
        // Store token in localStorage
        localStorage.setItem('token', response.data.payload.token);
        localStorage.setItem('user', JSON.stringify(response.data.payload));
        
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate('/allCapsules');
        }, 1500);
      }
    } catch (error) {
      console.log('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        {success && <div className="success-message text-center">{success}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <Label text={"email"} htmlFor={"email"}/> 
            <Input
              name={"email"}
              hint={"Enter your email"}
              required={true}
              onChangeListener={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          
          <div className="form-group">
            <Label text={"password"} htmlFor={"password"}/> 
            <Input
              name={"password"}
              hint={"Enter your password"}
              required={true}
              onChangeListener={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          
          <Button text={loading ? "Logging in..." : "Login"} disabled={loading} /> 
        </form>
        
        <div className="divider">
          <span>or</span>
        </div>
        
        <button className="google-btn">
          <img src={googleIcon} alt="Google" className="google-icon" />
          Continue with Google
        </button>
        
        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
          <p>
            Don't have an account?{' '}
            <span className="auth-toggle" onClick={toggle}>
          {" "}
          Sign Up
        </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;