// src/pages/LoginPage.js

import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    // e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <Title level={2}>Login</Title>
      <Form layout="vertical" onFinish={handleLoginSubmit}>
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

        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>

      {errorMessage && <Text className="error-message">{errorMessage}</Text>}

      <Text>Don't have an account yet?</Text>
      <Link to={"/signup"}>
        <Button type="link">Sign Up</Button>
      </Link>
    </div>
  );
}

export default LoginPage;
