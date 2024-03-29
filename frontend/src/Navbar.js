import Link from "@mui/joy/Link";
import { useContext } from "react";
import UserContext from "./UserContext";
import "./Navbar.css";

const Navbar = () => {
  const user = useContext(UserContext);

  return (
    <div className="nav">
      <div className="nav-brand">
        <Link href="/" className="link">
          <p>PRIMAL</p>
        </Link>
      </div>
      {user.currentUser ? (
        <div className="nav-link">
          <div className="nav-exercises">
            <Link href="/exercises" className="link">
              <p>Exercises</p>
            </Link>
          </div>
          <div className="nav-favorites">
            <Link href={`/user/${user.currentUser.id}/favorites`} className="link">
              <p>Favorites</p>
            </Link>
          </div>
          <div className="nav-logout">
            <Link href="/logout" className="link">
              <p>Logout</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="nav-login">
          <Link href="/login-signup" className="link">
            <p>Login/ Register</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
