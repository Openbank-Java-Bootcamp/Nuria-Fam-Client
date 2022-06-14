import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditRestaurant from "../components/EditRestaurant";
import IsOwner from "../components/IsOwner";
import IsUser from "../components/IsUser";
import { Image, Button, Card, Rate, Typography, Select } from "antd";
const { Title, Text } = Typography;
const { Option } = Select;

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

  const handleSubmitRate = () => {
    // e.preventDefault();

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
    <div className="RestaurantDetails">
      {restaurant && (
        <>
          <Image
            alt="Restaurant image"
            preview={false}
            height={300}
            src={restaurant.image}
          />
          <Title level={2}>{restaurant.name}</Title>

          <Rate allowHalf disabled value={totalRating} />

          <Text className="info">{restaurant.phone}</Text>
          <Text className="info">
            {restaurant.address.street}, {restaurant.address.number}
            <br />
            {restaurant.address.city}, {restaurant.address.country}
          </Text>

          {isLoggedIn && (
            <>
              <IsUser>
                <label>Rate:</label>
                <Select
                  className="rate"
                  placeholder="Rate"
                  onChange={(value) => setRatingUser(value)}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>

                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmitRate}
                >
                  Submit
                </Button>
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

          <Link className="cardButton" to={`/${restaurantId}/platecategory`}>
            <Card hoverable>
              <Text strong>Plates</Text>
            </Card>
          </Link>

          <Link className="cardButton" to={`/${restaurantId}/drinkcategory`}>
            <Card hoverable>
              <Text strong>Drinks</Text>
            </Card>
          </Link>
          {isLoggedIn && (
            <IsOwner>
              <Link to={`/${restaurantId}/employees`}>
                <Card hoverable>
                  <Text strong>Employees</Text>
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
