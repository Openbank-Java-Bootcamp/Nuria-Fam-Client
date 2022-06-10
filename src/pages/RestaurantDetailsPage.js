import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button, Card } from "antd";
import { Link } from "react-router-dom";
import EditRestaurant from "../components/EditRestaurant";

const API_URL = "http://localhost:5005";

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();

  const navigate = useNavigate();

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
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Image
            alt="Restaurant image"
            preview={false}
            height={300}
            src={restaurant.image}
          />
          <h2>{restaurant.name}</h2>
          <p>{restaurant.phone}</p>
          <p>
            {restaurant.address.street}, {restaurant.address.number}
            <br />
            {restaurant.address.city}, {restaurant.address.country}
          </p>
          <EditRestaurant refreshRestaurant={getRestaurant} />
          <Link to={"/"}>
            <Button>Edit Information</Button>
          </Link>
          <Link to={`/platecategory`}>
            <Card
              style={{
                width: 400,
              }}
            >
              <p>Plates</p>
            </Card>
          </Link>

          <Link to={`/drinkcategory`}>
            <Card
              style={{
                width: 400,
              }}
            >
              <p>Drinks</p>
            </Card>
          </Link>

          <Link to={`/employees`}>
            <Card
              style={{
                width: 400,
              }}
            >
              <p>Employees</p>
            </Card>
          </Link>
        </>
      )}
    </div>
  );
}
export default RestaurantDetailsPage;
