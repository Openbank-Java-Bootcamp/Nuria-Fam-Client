import { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Typography, InputNumber } from "antd";
const { Title, Text } = Typography;
const { TextArea } = Input;

const API_URL = "http://localhost:5005";

function AddPlate(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const plateCategoryId = props.category;

  const storedToken = localStorage.getItem("authToken");

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
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddPlate">
      <Title level={5}>Add Plate</Title>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Provide a name",
            },
          ]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Ingredients"
          name="ingredients"
          rules={[
            {
              required: true,
              message: "Provide ingredients",
            },
          ]}
        >
          <TextArea onChange={(e) => setIngredients(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Provide a price",
            },
          ]}
        >
          <InputNumber onChange={(value) => setPrice(value)} />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Input onChange={(e) => setImage(e.target.value)} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

      {errorMessage && <Text className="error-message">{errorMessage}</Text>}
    </div>
  );
}
export default AddPlate;
