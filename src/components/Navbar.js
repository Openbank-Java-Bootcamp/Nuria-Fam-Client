import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="Navbar">
      <div>
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
          <Button className="home" type="link">
            Restaurants
          </Button>
        </Link>
      </div>

      <div>
        <Button
          ghost
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>

      <div>
        {isLoggedIn && (
          <Button className="logout" ghost onClick={logOutUser}>
            Logout
          </Button>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <Button type="primary" className="signup">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button ghost className="login">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
