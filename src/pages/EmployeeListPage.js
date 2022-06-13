import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { List, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import EmployeeCard from "../components/EmployeeCard";
import AddEmployee from "../components/AddEmployee";

const API_URL = "http://localhost:5005";

function EmployeeListPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [employees, setEmployees] = useState([]);
  const { restaurantId } = useParams();

  const navigate = useNavigate();

  const getEmployees = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/${restaurantId}/employees`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>

      {isLoggedIn && (
        <>
          {showForm && (
            <AddEmployee
              refreshEmployees={getEmployees}
              hideForm={toggleShowFrom}
            />
          )}
          <Button onClick={toggleShowFrom}>
            {showForm ? "Hide From" : "Add Employee"}
          </Button>
        </>
      )}

      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={employees}
        renderItem={(employee) => (
          <List.Item>
            <EmployeeCard
              key={employee.id}
              employee={employee}
              restaurantId={restaurantId}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export default EmployeeListPage;
