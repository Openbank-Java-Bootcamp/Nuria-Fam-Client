import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Image, Button } from "antd";

const API_URL = "http://localhost:5005";

function DrinkDetailsPage() {
  const [drink, setDrink] = useState(null);
  const { drinkId } = useParams();

  const navigate = useNavigate();

  const getDrink = () => {
    axios
      .get(`${API_URL}/api/drinks/${drinkId}`)
      .then((response) => {
        setDrink(response.data);
      })
      .catch((error) => console.log(error));
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
          <Link to={"/"}>
            <Button>Edit Information</Button>
          </Link>
        </>
      )}
    </div>
  );
}
export default DrinkDetailsPage;
