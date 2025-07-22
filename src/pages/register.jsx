import React from 'react';
import { useState } from "react";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Label from "../components/shared/Label";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = ({ toggle }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
  first_name,
  last_name,
  email,
  password,
  password_confirmation: confirmPassword
});
      
      if (response.status === 200) {
        setSuccess('Registration successful!');
        
        
        localStorage.setItem('token', response.data.payload.token);
        localStorage.setItem('user', JSON.stringify(response.data.payload));

        setTimeout(() => {
          navigate('/allCapsules');
        }, 1500);
   
      }
    } catch (error) {
      console.log('Registration error:', error);
      console.log('Error response:', error.response);
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        {success && <div className="success-message text-center">{success}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <Label text={"First Name"} htmlFor={"first_name"}/> 
            <Input
              name={"first_name"}
              hint={"Enter your first name"}
              required={true}
              onChangeListener={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          
          <div className="form-group">
            <Label text={"Last Name"} htmlFor={"last_name"}/> 
            <Input
              name={"last_name"}
              hint={"Enter your last name"}
              required={true}
              onChangeListener={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          
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
          
          <div className="form-group">
            <Label text={"confirm password"} htmlFor={"confirmPassword"}/> 
            <Input
              name={"confirmPassword"}
              hint={"confirm your password"}
              required={true}
              onChangeListener={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          
          <Button text={loading ? "Registering..." : "Register"} disabled={loading} /> 
        </form>
        
        <div className="login-redirect">
          <p>Already have an account? <span className="auth-toggle" onClick={toggle}>
          {" "}
          Login
        </span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;