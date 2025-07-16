import Auth from "./pages/Auth";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import AllCapsules from "./pages/allCapsules";
import CreateCapsule from "./pages/createCapsule";
import CapsuleDetails from "./pages/capsuleDetails";
import SideBar from "./components/shared/sideBar/sideBar";
import "./styles/app.css"; 
const discluded = ["/Auth", "/"];


const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      {discluded.every((route) => route !== location.pathname) && <SideBar/>}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/allCapsules" element={<AllCapsules />} />
        <Route path="/CreateCapsule" element={<CreateCapsule />} />
        <Route path="/capsuleDetails" element={<CapsuleDetails />} />

      </Routes>
    </div>
  );
};

export default App;