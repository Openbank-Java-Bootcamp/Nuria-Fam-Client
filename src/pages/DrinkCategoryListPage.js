import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { List, Button, Typography } from "antd";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import DrinkCategoryCard from "../components/DrinkCategoryCard";
import AddDrinkCategory from "../components/AddDrinkCategory";
import IsOwner from "../components/IsOwner";

const { Title } = Typography;

const API_URL = "http://localhost:5005";

function DrinkCategoryListPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [categories, setCategories] = useState([]);
  const { restaurantId } = useParams();

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
    <div className="DrinkCategoryList">
      <Link to={`/${restaurantId}/platecategory`}>
        <Button>Plates</Button>
      </Link>

      <Title level={2}>Drinks</Title>

      {isLoggedIn && (
        <>
          {/* If the user is a restaurant owner */}
          <IsOwner>
            {showForm && (
              <AddDrinkCategory
                refreshCategories={getAllCategories}
                hideForm={toggleShowFrom}
              />
            )}

            {/* Show or hide form */}
            <Button onClick={toggleShowFrom}>
              {showForm ? "Hide From" : "Add Category"}
            </Button>
          </IsOwner>
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
