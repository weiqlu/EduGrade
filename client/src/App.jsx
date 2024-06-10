//import { motion } from "framer-motion";\
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ClassList from "./components/ClassList";
import User from "./components/User";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  const location = useLocation();
  const list = ["/login", "/NotFound"];
  const hideNavBar = list.includes(location.pathname);

  return (
    <div>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ClassList" element={<ClassList />} />
        <Route path="/User" element={<User />} />
        <Route path="/Review" element={<Review />} />
        <Route path="NotFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/NotFound" />} />
      </Routes>
    </div>
  );
}

export default App;
