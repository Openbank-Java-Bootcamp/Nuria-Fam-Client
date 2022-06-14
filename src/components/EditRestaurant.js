import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function EditRestaurant(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { restaurantId } = useParams();

  const { user } = useContext(AuthContext);
  const userId = user.id;

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRestaurant = response.data;
        setName(oneRestaurant.name);
        setPhone(oneRestaurant.phone);
        setStreet(oneRestaurant.address.street);
        setNumber(oneRestaurant.address.number);
        setCity(oneRestaurant.address.city);
        setCountry(oneRestaurant.address.country);
        setImage(oneRestaurant.image);
      })
      .catch((error) => console.log(error));
  }, [restaurantId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      phone,
      street,
      number,
      city,
      country,
      image,
      userId,
    };

    axios
      .put(`${API_URL}/api/restaurants/${restaurantId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.refreshRestaurant();
        props.hideForm();
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  const deleteRestaurant = () => {
    axios
      .delete(`${API_URL}/api/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Edit Restaurant</h3>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Street</label>
        <input
          type="text"
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <label>Number</label>
        <input
          type="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>Country</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <label>Image</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Update Restaurant</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={deleteRestaurant}>Delete Restaurant</button>
    </div>
  );
}
export default EditRestaurant;
