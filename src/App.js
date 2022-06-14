import { Route, Routes } from "react-router-dom";
// import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
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

import { Layout } from "antd";
import IsPrivate from "./components/IsPrivate";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Routes for restaurant pages */}
            <Route path="/restaurants" element={<RestaurantListPage />} />
            <Route
              path="/restaurants/:restaurantId"
              element={<RestaurantDetailsPage />}
            />

            {/* Routes for plate pages */}
            <Route
              path="/:restaurantId/platecategory"
              element={<PlateCategoryListPage />}
            />
            <Route
              path="/plates/category/:plateCategoryId/:plateCategoryName"
              element={<PlateListPage />}
            />
            <Route
              path="/plates/:plateCategoryId/:plateId"
              element={<PlateDetailsPage />}
            />

            {/* Routes for drink pages */}
            <Route
              path="/:restaurantId/drinkcategory"
              element={<DrinkCategoryListPage />}
            />
            <Route
              path="/drinks/category/:drinkCategoryId/:drinkCategoryName"
              element={<DrinkListPage />}
            />
            <Route
              path="/drinks/:drinkCategoryId/:drinkId"
              element={<DrinkDetailsPage />}
            />

            {/* Routes for employee pages */}
            <Route
              path="/:restaurantId/employees"
              element={
                <IsPrivate>
                  <EmployeeListPage />
                </IsPrivate>
              }
            />
            <Route
              path="/:restaurantId/employees/:employeeId"
              element={
                <IsPrivate>
                  <EmployeeDetailsPage />
                </IsPrivate>
              }
            />

            {/* Routes for user pages */}
            <Route
              path="/users/:userId"
              element={
                <IsPrivate>
                  <UserDetailsPage />
                </IsPrivate>
              }
            />

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
        </Content>
      </Layout>
    </div>
  );
}

export default App;
