import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { List, Button, Typography } from "antd";
import { AuthContext } from "../context/auth.context";
import DrinkCard from "../components/DrinkCard";
import AddDrink from "../components/AddDrink";
import IsOwner from "../components/IsOwner";

const { Title } = Typography;

const API_URL = "http://localhost:5005";

function DrinkListPage({ id, name }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [drinks, setDrinks] = useState([]);

  const drinkCategoryId = id;
  const drinkCategoryName = name;

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
    <div className="DrinkList">
      <h2>{drinkCategoryName}</h2>

      {isLoggedIn && (
        <>
          {/* If the user is a restaurant owner */}
          <IsOwner>
            {showForm && (
              <AddDrink
                refreshDrinks={getDrinks}
                hideForm={toggleShowFrom}
                category={id}
              />
            )}

            {/* Show or hide form */}
            <Button onClick={toggleShowFrom}>
              {showForm ? "Hide From" : "Add Drink"}
            </Button>
          </IsOwner>
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
