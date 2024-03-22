import Link from "@mui/joy/Link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-brand">
        <Link to="/">
          <p>PRIMAL</p>
        </Link>
      </div>
      <div className="nav-login">
      <Link to="/">
        <p>Login/ Signup</p>
      </Link>
      </div>
    </div>
  );
};

export default Navbar;
