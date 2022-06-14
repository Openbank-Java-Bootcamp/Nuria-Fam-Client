import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Typography } from "antd";
const { Title, Text } = Typography;

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
    // e.preventDefault();
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
    <div className="EditPlate">
      <Title level={5}>Edit Plate</Title>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name">
          <input
            className="ant-input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Ingredients">
          <textarea
            className="ant-input"
            name="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Price">
          <input
            className="ant-input"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Image">
          <input
            className="ant-input"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

      {errorMessage && <Text className="error-message">{errorMessage}</Text>}

      <Button type="danger" onClick={deletePlate}>
        Delete Restaurant
      </Button>
    </div>
  );
}
export default EditPlate;
