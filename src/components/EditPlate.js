import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditPlate(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { plateCategoryId, plateId } = useParams();

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plates/${plateId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const onePlate = response.data;
        setName(onePlate.name);
        setIngredients(onePlate.ingredients);
        setPrice(onePlate.price);
        setImage(onePlate.image);
      })
      .catch((error) => console.log(error));
  }, [plateId]);

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
      .put(`${API_URL}/api/plates/${plateId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setIngredients("");
        setPrice(0);
        setImage("");
        props.refreshPlate();
        props.hideForm();
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  const deletePlate = () => {
    axios
      .delete(`${API_URL}/api/plates/${plateId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Edit Plate</h3>

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

        <button type="submit">Update Plate</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={deletePlate}>Delete Plate</button>
    </div>
  );
}
export default EditPlate;
