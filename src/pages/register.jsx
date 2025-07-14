import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Label from "../components/shared/Label";

import '../styles/register.css';

const Register = ({ toggle }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setconfirm] = useState();
  const [username, setusername] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("DO Something");
  }, [email]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        
        <form className="register-form">
          <div className="form-group">
            <Label text={"username"} htmlFor={"username"}/> 
            <Input
        name={"username"}
        hint={"Enter your username"}
        onChangeListener={(e) => {
          setEmail(e.target.value);
        }}
      />
          </div>
          
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
          
          <div className="form-group">
            <Label text={"confirm password"} htmlFor={"confirm"}/> 
             <Input
        name={"confirm"}
        hint={"confirm your password"}
        onChangeListener={(e) => {
          setEmail(e.target.value);
        }}
      />
          </div>
          
          <Button text={"Register"} /> 
        </form>
        
        <div className="login-redirect">
          <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;