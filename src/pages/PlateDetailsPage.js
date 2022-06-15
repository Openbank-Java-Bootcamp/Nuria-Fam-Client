import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditPlate from "../components/EditPlate";
import IsOwner from "../components/IsOwner";
import { Image, Button, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function PlateDetailsPage() {
  const [plate, setPlate] = useState(null);
  const { plateId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const navigate = useNavigate();

  const getPlate = () => {
    axios
      .get(`${API_URL}/api/plates/${plateId}`)
      .then((response) => {
        setPlate(response.data);
      })
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  useEffect(() => {
    getPlate();
  }, []);

  return (
    <div className="PlateDetails">
      {plate && (
        <>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>

          <Image
            alt="Plate image"
            preview={false}
            height={300}
            src={plate.image}
          />

          <Title level={2}>{plate.name}</Title>

          <Text className="info">{plate.ingredients}</Text>
          <Text className="info">{plate.price} €</Text>

          {isLoggedIn && (
            <>
              // If the user is a restaurant owner
              <IsOwner>
                {showForm && (
                  <EditPlate
                    refreshPlate={getPlate}
                    hideForm={toggleShowFrom}
                  />
                )}
                // Show or hide the form
                <Button onClick={toggleShowFrom}>
                  {showForm ? "Hide From" : "Edit Information"}
                </Button>
              </IsOwner>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default PlateDetailsPage;
