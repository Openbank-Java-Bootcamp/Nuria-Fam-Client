import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import RestaurantListPage from "./pages/RestaurantListPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import PlateCategoryListPage from "./pages/PlateCategoryListPage";
import PlateListPage from "./pages/PlateListPage";
import PlateDetailsPage from "./pages/PlateDetailsPage";
import DrinkCategoryListPage from "./pages/DrinkCategoryListPage";
import DrinkListPage from "./pages/DrinkListPage";
import DrinkDetailsPage from "./pages/DrinkDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route
          path="/restaurants/:restaurantId"
          element={<RestaurantDetailsPage />}
        />

        <Route path="/platecategory" element={<PlateCategoryListPage />} />
        <Route
          path="/plates/category/:plateCategoryId"
          element={<PlateListPage />}
        />
        <Route path="/plates/:plateId" element={<PlateDetailsPage />} />

        <Route path="/drinkcategory" element={<DrinkCategoryListPage />} />
        <Route
          path="/drinks/category/:drinkCategoryId"
          element={<DrinkListPage />}
        />
        <Route path="/drinks/:drinkId" element={<DrinkDetailsPage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
