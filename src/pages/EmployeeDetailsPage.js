import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditEmployee from "../components/EditEmployee";
import { Image, Button, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function EmployeeDetailsPage() {
  const [employee, setEmployee] = useState(null);
  const { employeeId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const getEmployee = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div className="EmployeeDetails">
      {employee && (
        <>
          <Image
            alt="Employee image"
            preview={false}
            height={300}
            src={employee.image}
          />

          <Title level={2}>{employee.name}</Title>

          <Text className="info">{employee.phone}</Text>
          <Text className="info">{employee.jobTitle}</Text>

          {isLoggedIn && (
            <>
              {showForm && (
                <EditEmployee
                  refreshEmployee={getEmployee}
                  hideForm={toggleShowFrom}
                />
              )}

              {/* Show or hide form */}
              <Button onClick={toggleShowFrom}>
                {showForm ? "Hide From" : "Edit Information"}
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default EmployeeDetailsPage;
