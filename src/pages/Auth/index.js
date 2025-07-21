import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import LoginForm from "../login";
import SignUpForm from "../register";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(mode !== 'register');

  useEffect(() => {
    setIsLogin(mode !== 'register');
  }, [mode]);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {isLogin ? (
          <LoginForm toggle={switchForm} />
        ) : (
          <SignUpForm toggle={switchForm} />
        )}
      </div>
    </div>
  );
};

export default Auth;
