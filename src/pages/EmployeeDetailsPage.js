import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Image, Button } from "antd";

const API_URL = "http://localhost:5005";

function EmployeeDetailsPage() {
  const [employee, setEmployee] = useState(null);
  const { employeeId } = useParams();

  const navigate = useNavigate();

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

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      {employee && (
        <>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Image
            alt="Employee image"
            preview={false}
            height={300}
            src={employee.image}
          />
          <h2>{employee.name}</h2>
          <p>{employee.phone}</p>
          <p>{employee.jobTitle}</p>
          <Link to={"/"}>
            <Button>Edit Information</Button>
          </Link>
        </>
      )}
    </div>
  );
}
export default EmployeeDetailsPage;
