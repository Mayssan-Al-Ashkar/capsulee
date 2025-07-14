import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register"; 
import AllCapsules from "./pages/allCapsules";
import sideBar from "./components/shared/navbar/navbar";
import "./styles/app.css"; 
const discluded = ["/login", "/register","/homePage"];

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      {discluded.every((route) => route !== location.pathname) && <sideBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/allCapsules" element={<AllCapsules />} />
      </Routes>
    </div>
  );
};

export default App;