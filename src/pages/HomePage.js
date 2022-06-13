import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import RestaurantListPage from "./RestaurantListPage";
import RestaurantOwnerListPage from "./RestaurantOwnerList";
import IsOwner from "../components/IsOwner";
import IsUser from "../components/IsUser";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn && (
        <>
          <h2>Welcome {user && user.name}!</h2>
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
