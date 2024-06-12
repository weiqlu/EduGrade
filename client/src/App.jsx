//import { motion } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ClassList from "./components/ClassList";
import User from "./components/User";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "./App.css";

function App() {
  const location = useLocation();
  const list = ["/Login", "/NotFound", "/Signup"];
  const hideNavBar = list.includes(location.pathname);

  return (
    <div>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/classList" element={<ClassList />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
        <Route path="/review" element={<Review />} />
        <Route path="NotFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/NotFound" />} />
      </Routes>
    </div>
  );
}

export default App;
