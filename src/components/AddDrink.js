import { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Typography, InputNumber } from "antd";
const { Title, Text } = Typography;
const { TextArea } = Input;

const API_URL = "http://localhost:5005";

function AddDrink(props) {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const drinkCategoryId = props.category;

  const storedToken = localStorage.getItem("authToken");

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
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddDrink">
      <Title level={5}>Add Drink</Title>

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
          label="Information"
          name="information"
          rules={[
            {
              required: true,
              message: "Provide information",
            },
          ]}
        >
          <TextArea onChange={(e) => setInformation(e.target.value)} />
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
export default AddDrink;
