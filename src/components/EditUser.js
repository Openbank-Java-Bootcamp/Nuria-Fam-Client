import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Form, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function EditUser(props) {
  const { logOutUser, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState(user.role);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { userId } = useParams();

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleImage = (e) => setImage(e.target.value);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneUser = response.data;
        setEmail(oneUser.email);
        setPassword(oneUser.password);
        setName(oneUser.name);
        setImage(oneUser.image);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    const requestBody = { email, password, name, image, role };

    axios
      .put(`${API_URL}/api/auth/users/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEmail("");
        setPassword("");
        setName("");
        setImage("");
        props.refreshUser();
        props.hideForm();
        window.location.reload(true);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  const deleteUser = () => {
    axios
      .delete(`${API_URL}/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
        logOutUser();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditUser">
      <Title level={5}>Edit User</Title>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email">
          <input
            className="ant-input"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Item>

        <Form.Item label="Password">
          <input
            className="ant-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Item>

        <Form.Item label="Name">
          <input
            className="ant-input"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
        </Form.Item>

        <Form.Item label="Image">
          <input
            className="ant-input"
            type="text"
            name="image"
            value={image}
            onChange={handleImage}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

      {errorMessage && <Text className="error-message">{errorMessage}</Text>}

      <Button type="danger" onClick={deleteUser}>
        Delete User
      </Button>
    </div>
  );
}
export default EditUser;
