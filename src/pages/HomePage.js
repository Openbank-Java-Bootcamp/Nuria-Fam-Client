import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import RestaurantListPage from "./RestaurantListPage";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn && (
        <>
          <h2>Welcome {user && user.name}!</h2>
          <RestaurantListPage />
        </>
      )}
      {!isLoggedIn && <RestaurantListPage />}
    </div>
  );
}

export default HomePage;
