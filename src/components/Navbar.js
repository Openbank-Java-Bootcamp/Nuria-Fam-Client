import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Avatar, Button } from "antd";
import { UserOutlined, LeftOutlined } from "@ant-design/icons";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="Navbar">
      <div>
        <Button
          className="back"
          type="link"
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutlined />
        </Button>

        {isLoggedIn && (
          <Link to={`/users/${user.id}`}>
            <Avatar
              alt="User image"
              size={45}
              icon={<UserOutlined />}
              src={user.image}
            />
          </Link>
        )}
        <Link to="/">
          <Button className="restaurants" type="link">
            Restaurants
          </Button>
        </Link>
      </div>

      <div>
        {isLoggedIn && (
          <Button onClick={logOutUser} ghost>
            Logout
          </Button>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button ghost>Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
