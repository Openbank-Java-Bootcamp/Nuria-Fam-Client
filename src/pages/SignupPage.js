// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Select, Typography } from "antd";
const { Option } = Select;
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (value) => setRole(value);

  const handleSignupSubmit = (e) => {
    // e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, image, role };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <Title level={2}>Sign up</Title>

      <Form layout="vertical" onFinish={handleSignupSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Provide a email",
            },
          ]}
        >
          <Input onChange={handleEmail} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Provide a password",
            },
          ]}
        >
          <Input.Password onChange={handlePassword} />
        </Form.Item>

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
          <Input onChange={handleName} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Provide a role",
            },
          ]}
        >
          <Select
            placeholder="Choose role"
            style={{
              width: 120,
            }}
            onChange={handleRole}
          >
            <Option value="owner">Owner</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form>

      {errorMessage && <Text className="error-message">{errorMessage}</Text>}

      <Text>Already have account?</Text>
      <Link to={"/login"}>
        <Button type="link">Login</Button>
      </Link>
    </div>
  );
}

export default SignupPage;
