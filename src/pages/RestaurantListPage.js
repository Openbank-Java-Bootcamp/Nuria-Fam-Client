import { useState, useEffect } from "react";
import axios from "axios";
import { List } from "antd";
import RestaurantCard from "../components/RestaurantCard";

const API_URL = "http://localhost:5005";

function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = () => {
    axios
      .get(`${API_URL}/api/restaurants`)
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div>
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
export default RestaurantListPage;
