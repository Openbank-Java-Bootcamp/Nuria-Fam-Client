import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditDrink(props) {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const { drinkCategoryId, drinkId } = useParams();

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/drinks/${drinkId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneDrink = response.data;
        setName(oneDrink.name);
        setInformation(oneDrink.information);
        setPrice(oneDrink.price);
        setImage(oneDrink.image);
      })
      .catch((error) => console.log(error));
  }, [drinkId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      information,
      price,
      image,
      drinkCategoryId,
    };

    axios
      .put(`${API_URL}/api/drinks/${drinkId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setInformation("");
        setPrice(0);
        setImage("");
        props.refreshDrink();
        props.hideForm();
      })
      .catch((error) => console.log(error));
  };

  const deleteDrink = () => {
    axios
      .delete(`${API_URL}/api/drinks/${drinkId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Edit Drink</h3>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Information</label>
        <textarea
          name="information"
          value={information}
          onChange={(e) => setInformation(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Image</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Update Drink</button>
      </form>
      <button onClick={deleteDrink}>Delete Drink</button>
    </div>
  );
}
export default EditDrink;
