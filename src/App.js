import Auth from "./pages/Auth";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import AllCapsules from "./pages/allCapsules";
import CreateCapsule from "./pages/createCapsule";
import sideBar from "./components/shared/navbar/navbar";
import "./styles/app.css"; 
const discluded = ["/login", "/register","/homePage"];


const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      {discluded.every((route) => route !== location.pathname) && <sideBar />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/allCapsules" element={<AllCapsules />} />
        <Route path="/CreateCapsule" element={<CreateCapsule />} />
      </Routes>
    </div>
  );
};

export default App;