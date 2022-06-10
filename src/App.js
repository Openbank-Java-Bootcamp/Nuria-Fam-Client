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
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import EmployeeListPage from "./pages/EmployeeListPage";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Routes for restaurant pages */}
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route
          path="/restaurants/:restaurantId"
          element={<RestaurantDetailsPage />}
        />

        {/* Routes for plate pages */}
        <Route path="/platecategory" element={<PlateCategoryListPage />} />
        <Route
          path="/plates/category/:plateCategoryId/:plateCategoryName"
          element={<PlateListPage />}
        />
        <Route path="/plates/:plateId" element={<PlateDetailsPage />} />

        {/* Routes for drink pages */}
        <Route path="/drinkcategory" element={<DrinkCategoryListPage />} />
        <Route
          path="/drinks/category/:drinkCategoryId/:drinkCategoryName"
          element={<DrinkListPage />}
        />
        <Route path="/drinks/:drinkId" element={<DrinkDetailsPage />} />

        {/* Routes for employee pages */}
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route
          path="/employees/:employeeId"
          element={<EmployeeDetailsPage />}
        />

        {/* Routes for user pages */}
        <Route path="/users/:userId" element={<UserDetailsPage />} />

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
