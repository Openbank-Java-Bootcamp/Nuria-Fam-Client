import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function AddPlateCategory(props) {
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { restaurantId } = useParams();

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    // e.preventDefault();
    const requestBody = {
      name,
      restaurantId,
    };

    axios
      .post(`${API_URL}/api/platecategory`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        props.refreshCategories();
        props.hideForm();
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddPlateCategory">
      <Title level={5}>Add Plate Category</Title>

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

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

      {errorMessage && <Text className="error-message">{errorMessage}</Text>}
    </div>
  );
}
export default AddPlateCategory;
