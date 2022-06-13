import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button } from "antd";
import { AuthContext } from "../context/auth.context";
import EditDrink from "../components/EditDrink";

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
    <div>
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
          <h2>{drink.name}</h2>
          <p>{drink.information}</p>
          <p>{drink.price} €</p>

          {isLoggedIn && (
            <>
              {showForm && (
                <EditDrink refreshDrink={getDrink} hideForm={toggleShowFrom} />
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
export default DrinkDetailsPage;
