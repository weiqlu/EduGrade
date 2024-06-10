//import { motion } from "framer-motion";\
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ClassList from "./components/ClassList";
import User from "./components/User";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/ClassList" element={<ClassList />} />
        <Route path="/User" element={<User />} />
        <Route path="/Review" element={<Review />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
