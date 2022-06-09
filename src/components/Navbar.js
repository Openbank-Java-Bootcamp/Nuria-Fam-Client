import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button } from "antd";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        <Button>Home</Button>
      </Link>

      {isLoggedIn && (
        <>
          <Button className="primary" onClick={logOutUser}>
            Logout
          </Button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
