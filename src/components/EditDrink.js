import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function EditDrink(props) {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

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
    // e.preventDefault();
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
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
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
    <div className="EditDrink">
      <Title level={5}>Edit Drink</Title>

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

        <Form.Item label="Information">
          <textarea
            className="ant-input"
            name="information"
            value={information}
            onChange={(e) => setInformation(e.target.value)}
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

      <Button type="danger" onClick={deleteDrink}>
        Delete Drink
      </Button>
    </div>
  );
}
export default EditDrink;
