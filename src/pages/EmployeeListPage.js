import { useState, useEffect } from "react";
import axios from "axios";
import { List, Button } from "antd";
import { useNavigate } from "react-router-dom";

import EmployeeCard from "../components/EmployeeCard";

const API_URL = "http://localhost:5005";

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  const getEmployees = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/employees`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
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
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={employees}
        renderItem={(employee) => (
          <List.Item>
            <EmployeeCard key={employee.id} {...employee} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default EmployeeListPage;
