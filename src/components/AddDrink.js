import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddDrink(props) {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const { drinkCategoryId } = useParams();

  const storedToken = localStorage.getItem("authToken");

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
      .post(`${API_URL}/api/drinks`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setInformation("");
        setPrice(0);
        setImage("");
        props.refreshDrinks();
        props.hideForm();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Drink</h3>

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default AddDrink;
