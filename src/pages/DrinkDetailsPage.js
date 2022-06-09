import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from "antd";

const API_URL = "http://localhost:5005";

function DrinkDetailsPage() {
  const [drink, setDrink] = useState(null);
  const { drinkId } = useParams();

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
          <Image preview={false} height={300} src={drink.image} />
          <h2>{drink.name}</h2>
          <p>{drink.information}</p>
          <p>{drink.price}</p>
        </>
      )}
    </div>
  );
}
export default DrinkDetailsPage;
