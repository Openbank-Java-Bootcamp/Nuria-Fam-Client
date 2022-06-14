import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import RestaurantCard from "../components/RestaurantCard";
import AddRestaurant from "../components/AddRestaurant";
import { List, Button, Typography } from "antd";
const { Title } = Typography;

const API_URL = "http://localhost:5005";

function RestaurantOwnerListPage() {
  const { user } = useContext(AuthContext);

  const [restaurants, setRestaurants] = useState([]);
  const [showForm, setForm] = useState(false);

  const getAllRestaurants = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/restaurants/userid/${user.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div className="RestaurantOwnerList">
      <Title level={3}>Your restaurants</Title>
      {showForm && (
        <AddRestaurant
          refreshRestaurants={getAllRestaurants}
          hideForm={toggleShowFrom}
        />
      )}
      <Button onClick={toggleShowFrom}>
        {showForm ? "Hide From" : "Add Restaurant"}
      </Button>
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={restaurants}
        renderItem={(restaurant) => (
          <List.Item>
            <RestaurantCard key={restaurant.id} {...restaurant} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default RestaurantOwnerListPage;
