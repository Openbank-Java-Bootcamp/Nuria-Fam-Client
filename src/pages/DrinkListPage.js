import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { List, Button } from "antd";

import DrinkCard from "../components/DrinkCard";

const API_URL = "http://localhost:5005";

function DrinkListPage() {
  const [drinks, setDrinks] = useState([]);
  const { drinkCategoryId, drinkCategoryName } = useParams();

  const navigate = useNavigate();

  const getDrinks = () => {
    axios
      .get(`${API_URL}/api/drinks/category/${drinkCategoryId}`)
      .then((response) => setDrinks(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDrinks();
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
      <h2>{drinkCategoryName}</h2>
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={drinks}
        renderItem={(drink) => (
          <List.Item>
            <DrinkCard key={drink.id} {...drink} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default DrinkListPage;
