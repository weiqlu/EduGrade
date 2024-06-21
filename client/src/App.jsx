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
import Account from "./components/Account";
import PrivateRoute from "./components/PrivateRoute";
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
        <Route path="/Signup" element={<Signup />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/NotFound" />} />
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/classList"
          element={
            <PrivateRoute>
              <ClassList />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/review"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route
          path="/Account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
