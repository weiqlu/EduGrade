import "../styles/NavBar.css";
import { Outlet, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar-container">
        <NavLink to={"/ClassList"} className="navbar-logo">
          EduGrade
        </NavLink>
        <div className="navbar-links">
          <NavLink
            to={"/User"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Users
          </NavLink>
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
