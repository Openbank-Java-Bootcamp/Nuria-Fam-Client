import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className="Navbar">
      {isLoggedIn && (
        <Link to={`/users/${user.id}`}>
          <Avatar
            alt="User image"
            size={64}
            icon={<UserOutlined />}
            src={user.image}
          />
        </Link>
      )}
      <Link to="/">
        <Button>Home</Button>
      </Link>

      {isLoggedIn && (
        <Button className="primary" onClick={logOutUser}>
          Logout
        </Button>
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
