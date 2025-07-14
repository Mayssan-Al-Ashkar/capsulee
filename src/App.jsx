import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login"; 
import RegisterPage from "./pages/register"; 
import Navbar from "./components/shared/navbar";
import "./styles/app.css"; 

const discluded = ["/login", "/register"];

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      {discluded.every((route) => route !== location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
