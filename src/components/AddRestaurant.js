import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Button, Form, Input, Typography, InputNumber } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function AddRestaurant(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user } = useContext(AuthContext);
  const userId = user.id;

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    // e.preventDefault();
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
      .post(`${API_URL}/api/restaurants`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setPhone("");
        setStreet("");
        setNumber(0);
        setCity("");
        setCountry("");
        setImage("");
        props.refreshRestaurants();
        props.hideForm();
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddRestaurant">
      <Title level={5}>Add Restaurant</Title>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Street"
          name="street"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setStreet(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Number"
          name="number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber onChange={(value) => setNumber(value)} />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setCity(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setCountry(e.target.value)} />
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
export default AddRestaurant;
