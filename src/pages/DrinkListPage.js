import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { List, Button } from "antd";
import { AuthContext } from "../context/auth.context";
import DrinkCard from "../components/DrinkCard";
import AddDrink from "../components/AddDrink";

const API_URL = "http://localhost:5005";

function DrinkListPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [drinks, setDrinks] = useState([]);
  const { drinkCategoryId, drinkCategoryName } = useParams();

  const navigate = useNavigate();

  const getDrinks = () => {
    axios
      .get(`${API_URL}/api/drinks/category/${drinkCategoryId}`)
      .then((response) => setDrinks(response.data))
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
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

      {isLoggedIn && (
        <>
          {showForm && (
            <AddDrink refreshDrinks={getDrinks} hideForm={toggleShowFrom} />
          )}
          <Button onClick={toggleShowFrom}>
            {showForm ? "Hide From" : "Add Drink"}
          </Button>
        </>
      )}
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={drinks}
        renderItem={(drink) => (
          <List.Item>
            <DrinkCard
              key={drink.id}
              drink={drink}
              drinkCategoryId={drinkCategoryId}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export default DrinkListPage;
