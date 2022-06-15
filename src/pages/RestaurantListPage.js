import { useState, useEffect } from "react";
import axios from "axios";
import { List } from "antd";
import RestaurantCard from "../components/RestaurantCard";
import { Input } from "antd";
const { Search } = Input;

const API_URL = "http://localhost:5005";

function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantData, setRestaurantsData] = useState([]);
  const [search, setSearch] = useState("");

  const getAllRestaurants = () => {
    axios
      .get(`${API_URL}/api/restaurants`)
      .then((response) => {
        setRestaurants(response.data);
        setRestaurantsData(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchRestaurant(e.target.value);
  };

  const searchRestaurant = (str) => {
    let filteredList;
    filteredList = restaurantData.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(str);
    });

    setRestaurants(filteredList);
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div className="RestaurantList">
      <Search
        placeholder="Search a restaurant"
        onChange={handleSearch}
        style={{
          width: 200,
        }}
        allowClear
        enterButton
      />

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
