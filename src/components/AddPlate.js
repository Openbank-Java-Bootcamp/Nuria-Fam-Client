import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddPlate(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const { plateCategoryId } = useParams();

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      ingredients,
      price,
      image,
      plateCategoryId,
    };

    axios
      .post(`${API_URL}/api/plates`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setIngredients("");
        setPrice(0);
        setImage("");
        props.refreshPlates();
        props.hideForm();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Plate</h3>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
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
export default AddPlate;
