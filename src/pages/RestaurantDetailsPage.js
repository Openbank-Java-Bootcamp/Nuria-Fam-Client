import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditRestaurant from "../components/EditRestaurant";

const API_URL = "http://localhost:5005";

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const navigate = useNavigate();

  const getRestaurant = () => {
    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
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

          {isLoggedIn && (
            <>
              {showForm && (
                <EditRestaurant
                  refreshRestaurant={getRestaurant}
                  hideForm={toggleShowFrom}
                />
              )}
              <Button onClick={toggleShowFrom}>
                {showForm ? "Hide From" : "Edit Information"}
              </Button>
            </>
          )}

          <Link to={`/${restaurantId}/platecategory`}>
            <Card>
              <p>Plates</p>
            </Card>
          </Link>

          <Link to={`/${restaurantId}/drinkcategory`}>
            <Card>
              <p>Drinks</p>
            </Card>
          </Link>

          <Link to={`/employees`}>
            <Card>
              <p>Employees</p>
            </Card>
          </Link>
        </>
      )}
    </div>
  );
}
export default RestaurantDetailsPage;
