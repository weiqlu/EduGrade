import React from "react";
import "../styles/Login.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

// images to cycle for the transition on the login page
const images = [
  "/flowersVT.jpg",
  "/torgVT.jpg",
  "/drillfield.jpg",
  "/classroomVT.jpg",
  "/buildingVT.jpg",
];

function Login() {
  const [index, setIndex] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  // handles the image transitions without user input
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3700);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
      swal("", "Please enter a username and password", "error");
      return;
    }

    try {
      const response = await fetch("https://edugrade.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        swal({
          title: "Success!",
          text: "Login successful",
          icon: "success",
          timer: 1000,
        });

        // storing the token and status in localstorage, might change later
        localStorage.setItem("token", data.token);
        localStorage.setItem("status", data.status);
        localStorage.setItem("username", data.username)
        navigate("/Home");
      } else {
        swal("", data.error, "error");
      }
    } catch (error) {
      swal("", "An error occurred. Please try again later.", "error");
    }
  }

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
          <h2>EduGrade.</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <br />
            <button type="submit" className="login-btn" onClick={handleSubmit}>
              Login
            </button>
          </form>
          <p className="signup-link">
            Create new account? <Link to={"/Signup"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
