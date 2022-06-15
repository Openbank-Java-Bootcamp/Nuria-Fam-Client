import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditDrink from "../components/EditDrink";
import IsOwner from "../components/IsOwner";
import { Image, Button, Typography } from "antd";
const { Title, Text } = Typography;

const API_URL = "http://localhost:5005";

function DrinkDetailsPage() {
  const [drink, setDrink] = useState(null);
  const { drinkId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const navigate = useNavigate();

  const getDrink = () => {
    axios
      .get(`${API_URL}/api/drinks/${drinkId}`)
      .then((response) => {
        setDrink(response.data);
      })
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  useEffect(() => {
    getDrink();
  }, []);

  return (
    <div className="DrinkDetails">
      {drink && (
        <>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>

          <Image
            alt="Drink image"
            preview={false}
            height={300}
            src={drink.image}
          />

          <Title level={2}>{drink.name}</Title>

          <Text className="info">{drink.information}</Text>
          <Text className="info">{drink.price} €</Text>

          {isLoggedIn && (
            <>
              {/* If the user is a restaurant owner */}
              <IsOwner>
                {showForm && (
                  <EditDrink
                    refreshDrink={getDrink}
                    hideForm={toggleShowFrom}
                  />
                )}

                {/* Show or hide form */}
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
export default DrinkDetailsPage;
