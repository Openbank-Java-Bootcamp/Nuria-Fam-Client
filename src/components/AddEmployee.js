import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function AddEmployee(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { restaurantId } = useParams();

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    // e.preventDefault();
    const requestBody = {
      name,
      phone,
      jobTitle,
      image,
      restaurantId,
    };

    axios
      .post(`${API_URL}/api/employees`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setPhone("");
        setJobTitle("");
        setImage("");
        props.refreshEmployees();
        props.hideForm();
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddEmployee">
      <Title level={5}>Add Employee</Title>

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
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Provide a phone",
            },
          ]}
        >
          <Input onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Job Title"
          name="jobTitle"
          rules={[
            {
              required: true,
              message: "Provide a job title",
            },
          ]}
        >
          <Input onChange={(e) => setJobTitle(e.target.value)} />
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
export default AddEmployee;
