import Auth from "./pages/Auth";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import AllCapsules from "./pages/allCapsules";
import CreateCapsule from "./pages/createCapsule";
import CapsuleDetails from "./pages/capsuleDetails";
import PublicWall from "./pages/publicWall";
import SideBar from "./components/shared/sideBar/sideBar";
import "./styles/app.css"; 
const discluded = ["/auth", "/" ];


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
        <Route path="/capsules/details/:id" element={<CapsuleDetails />} />
        <Route path="/publicWall" element={<PublicWall />} />
      </Routes>
    </div>
  );
};

export default App;