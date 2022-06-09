import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from "antd";

const API_URL = "http://localhost:5005";

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();

  const getRestaurant = () => {
    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getRestaurant();
  }, []);
  return (
    <div>
      {restaurant && (
        <>
          <Image preview={false} height={300} src={restaurant.image} />
          <h2>{restaurant.name}</h2>
          <p>{restaurant.phone}</p>
          <p>
            {restaurant.address.street}, {restaurant.address.number}
            <br />
            {restaurant.address.city}, {restaurant.address.country}
          </p>
        </>
      )}
    </div>
  );
}
export default RestaurantDetailsPage;
