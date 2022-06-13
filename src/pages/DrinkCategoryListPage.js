import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { List, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import DrinkCategoryCard from "../components/DrinkCategoryCard";
import AddDrinkCategory from "../components/AddDrinkCategory";

const API_URL = "http://localhost:5005";

function DrinkCategoryListPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [categories, setCategories] = useState([]);
  const { restaurantId } = useParams();

  const navigate = useNavigate();

  const getAllCategories = () => {
    axios
      .get(`${API_URL}/api/${restaurantId}/drinkcategory`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  useEffect(() => {
    getAllCategories();
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
      {isLoggedIn && (
        <>
          {showForm && (
            <AddDrinkCategory
              refreshCategories={getAllCategories}
              hideForm={toggleShowFrom}
            />
          )}
          <Button onClick={toggleShowFrom}>
            {showForm ? "Hide From" : "Add Category"}
          </Button>
        </>
      )}
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={categories}
        renderItem={(category) => (
          <List.Item>
            <DrinkCategoryCard key={category.id} {...category} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default DrinkCategoryListPage;
