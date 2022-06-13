import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function EditUser(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const { userId } = useParams();

  const { logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleImage = (e) => setImage(e.target.value);

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/users/${userId}`, {
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
    e.preventDefault();
    const requestBody = { email, password, name, image };

    axios
      .put(`${API_URL}/auth/users/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEmail("");
        setPassword("");
        setName("");
        setImage("");
        props.refreshUser();
        props.hideForm();
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = () => {
    axios
      .delete(`${API_URL}/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
        logOutUser();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Edit User</h3>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Image</label>
        <input type="text" name="image" value={image} onChange={handleImage} />

        <button type="submit">Update User</button>
      </form>
      <button onClick={deleteUser}>Delete User</button>
    </div>
  );
}
export default EditUser;
