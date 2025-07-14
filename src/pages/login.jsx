import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/login.css';
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Label from "../components/shared/Label";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import googleIcon from '../assets/google.jpg'; 

const Login = ({ toggle }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("DO Something");
  }, [email]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        
        <form className="auth-form">
          <div className="form-group">
            <Label text={"email"} htmlFor={"email"}/> 
            <Input
        name={"email"}
        hint={"Enter your email"}
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
        onChangeListener={(e) => {
          setEmail(e.target.value);
        }}
      />
          </div>
          
          <Button text={"Login"} /> 
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