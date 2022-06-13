import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button, Card, Rate } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditRestaurant from "../components/EditRestaurant";
import IsUser from "../components/IsUser";

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

  const handleRate = () => {
    e.preventDefault();
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
          <Rate allowHalf disabled defaultValue={2} />
          <p>{restaurant.phone}</p>
          <p>
            {restaurant.address.street}, {restaurant.address.number}
            <br />
            {restaurant.address.city}, {restaurant.address.country}
          </p>

          {isLoggedIn && (
            <>
              <IsUser>
                <label>Rate:</label>
                <select onChange={handleRate}>
                  <option value="">Rate the restaurant</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </IsUser>
            </>
          )}

          {isLoggedIn && (
            <>
              <IsOwner>
                {showForm && (
                  <EditRestaurant
                    refreshRestaurant={getRestaurant}
                    hideForm={toggleShowFrom}
                  />
                )}
                <Button onClick={toggleShowFrom}>
                  {showForm ? "Hide From" : "Edit Information"}
                </Button>
              </IsOwner>
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
          {isLoggedIn && (
            <IsOwner>
              <Link to={`/${restaurantId}/employees`}>
                <Card>
                  <p>Employees</p>
                </Card>
              </Link>
            </IsOwner>
          )}
        </>
      )}
    </div>
  );
}
export default RestaurantDetailsPage;
