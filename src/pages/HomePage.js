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
          <Title level={2}>Welcome {user && user.name}!</Title>
          <IsOwner>
            <RestaurantOwnerListPage />
          </IsOwner>
          <IsUser>
            <RestaurantListPage />
          </IsUser>
        </>
      )}
      {!isLoggedIn && <RestaurantListPage />}
    </div>
  );
}

export default HomePage;
