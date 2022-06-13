import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditEmployee(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [image, setImage] = useState("");
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
    e.preventDefault();
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
      .catch((error) => console.log(error));
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
    <div>
      <h3>Edit Employee</h3>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Jot Title</label>
        <input
          type="text"
          name="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Update Employee</button>
      </form>
      <button onClick={deleteEmployee}>Delete Employee</button>
    </div>
  );
}
export default EditEmployee;
