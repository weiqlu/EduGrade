import "../styles/NavBar.css";
import { Outlet, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function NavBar() {
  const token = localStorage.getItem("token");
  let status = null;

  // decodes token and stores it in status to compare if the user is an admin
  if (token) {
    const decoded = jwtDecode(token);
    status = decoded.status;
  }

  return (
    <>
      <nav className="navbar-container">
        <NavLink to={"/ClassList"} className="navbar-logo">
          EduGrade
        </NavLink>
        <div className="navbar-links">
          {status === "admin" && (
            <NavLink
              to={"/User"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Users
            </NavLink>
          )}
          <NavLink
            to={"/ClassList"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Grade Distribution
          </NavLink>
          <NavLink
            to={"/Review"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Review
          </NavLink>
          <NavLink
            to={"/Login"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Logout
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
