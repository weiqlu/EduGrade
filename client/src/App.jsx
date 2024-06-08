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
        <Route exact path="/" element={<Login />} />
        <Route exact path="/NavBar" element={<NavBar />} />
        <Route exact path="/ClassList" element={<ClassList />} />
        <Route exact path="/User" element={<User />} />
        <Route exact path="/Review" element={<Review />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
