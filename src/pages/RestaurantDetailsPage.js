import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button, Card, Rate } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditRestaurant from "../components/EditRestaurant";
import IsOwner from "../components/IsOwner";
import IsUser from "../components/IsUser";

const API_URL = "http://localhost:5005";

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [ratingsList, setRatingsList] = useState([]);
  const [rating, setRatingUser] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const getRestaurant = () => {
    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}`)
      .then((response) => setRestaurant(response.data))
      .catch((error) => console.log(error));
  };

  const getRatings = () => {
    axios
      .get(`${API_URL}/api/${restaurantId}/ratings`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRatingsList(response.data);
        ratingAvg();
      })
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  const handleSubmitRate = (e) => {
    e.preventDefault();

    const requestBody = {
      rating,
      restaurantId,
    };

    axios
      .post(`${API_URL}/api/ratings`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRatingUser();
        ratingAvg();
        getRestaurant();
        getRatings();
      });
  };

  const ratingAvg = () => {
    const sum = ratingsList.reduce((accum, currValue) => {
      return accum + currValue.rating;
    }, 0);
    const avg = sum / ratingsList.length;
    const res = Math.round(avg * 100) / 100;
    setTotalRating(res);
  };

  useEffect(() => {
    ratingAvg();
    getRatings();
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
          <Rate allowHalf disabled value={totalRating} />

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
                <select onChange={(e) => setRatingUser(e.target.value)}>
                  <option value="">Rate restaurant</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" onClick={handleSubmitRate}>
                  Rate
                </button>
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
