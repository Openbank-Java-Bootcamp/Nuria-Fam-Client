import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { List } from "antd";

import DrinkCard from "../components/DrinkCard";

const API_URL = "http://localhost:5005";

function DrinkListPage() {
  const [drinks, setDrinks] = useState([]);
  const { drinkCategoryId } = useParams();

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
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={drinks}
        renderItem={(drink) => (
          <List.Item>
            <DrinkCard key={drink.id} {...drink} category={drinkCategoryId} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default DrinkListPage;
