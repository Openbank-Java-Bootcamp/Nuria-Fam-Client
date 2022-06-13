import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button } from "antd";
import { AuthContext } from "../context/auth.context";
import EditPlate from "../components/EditPlate";

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
    <div>
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
          <h2>{plate.name}</h2>
          <p>{plate.ingredients}</p>
          <p>{plate.price} €</p>

          {isLoggedIn && (
            <>
              {showForm && (
                <EditPlate refreshPlate={getPlate} hideForm={toggleShowFrom} />
              )}
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
export default PlateDetailsPage;
