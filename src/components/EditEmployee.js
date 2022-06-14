import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function EditEmployee(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { employeeId, restaurantId } = useParams();

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneEmployee = response.data;
        setName(oneEmployee.name);
        setPhone(oneEmployee.phone);
        setJobTitle(oneEmployee.jobTitle);
        setImage(oneEmployee.image);
      })
      .catch((error) => console.log(error));
  }, [employeeId]);

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
      .put(`${API_URL}/api/employees/${employeeId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setPhone("");
        setJobTitle("");
        setImage("");
        props.refreshEmployee();
        props.hideForm();
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  const deleteEmployee = () => {
    axios
      .delete(`${API_URL}/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditEmployee">
      <Title level={5}>Edit Employee</Title>

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

        <Form.Item label="Phone">
          <input
            className="ant-input"
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Job Title">
          <input
            className="ant-input"
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
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

      <Button type="danger" onClick={deleteEmployee}>
        Delete Employee
      </Button>
    </div>
  );
}
export default EditEmployee;
