import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddDrinkCategory(props) {
  const [name, setName] = useState("");
  const { restaurantId } = useParams();

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      restaurantId,
    };
    console.log(requestBody);
    axios
      .post(`${API_URL}/api/drinkcategory`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        props.refreshCategories();
        props.hideForm();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Drink Category</h3>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default AddDrinkCategory;