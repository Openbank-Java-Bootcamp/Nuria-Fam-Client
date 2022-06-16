import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import RestaurantListPage from "./RestaurantListPage";
import RestaurantOwnerListPage from "./RestaurantOwnerList";
import IsOwner from "../components/IsOwner";
import IsUser from "../components/IsUser";
import { Typography } from "antd";
const { Title } = Typography;

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div className="HomePage">
      {isLoggedIn && (
        <>
          <h2>Welcome {user && user.name}!</h2>
          {/* If the user is a restaurant owner, show only their restaurants */}
          <IsOwner>
            <RestaurantOwnerListPage />
          </IsOwner>

          {/* If is a user, show all the restaurants */}
          <IsUser>
            <RestaurantListPage />
          </IsUser>
        </>
      )}

      {/* If it's not logged in show all restaurants */}
      {!isLoggedIn && <RestaurantListPage />}
    </div>
  );
}

export default HomePage;
