import React from "react";
import "../styles/Login.css";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/classroomVT.jpg",
  "/drillfield.jpg",
  "/flowersVT.jpg",
  "/torgVT.jpg",
  "/buildingVT.jpg",
];

function Login() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-leftside">
          <div className="slideshow-container">
            <AnimatePresence>
              {images.map(
                (image, i) =>
                  i === index && (
                    <motion.img
                      key={image}
                      src={image}
                      alt={`Slide ${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="slideshow-image"
                      style={{ position: "absolute" }}
                    />
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="login-rightside">
          <h2>Welcome</h2>
          <form>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="signup-link">
            Create new account? <a href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
