import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      404 Not Found
      <Link to="/"> Return to Login </Link>
    </div>
  );
}

export default NotFound;
