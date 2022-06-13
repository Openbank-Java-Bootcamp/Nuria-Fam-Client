import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { List, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import PlateCategoryCard from "../components/PlateCategoryCard";
import AddPlateCategory from "../components/AddPlateCategory";
import IsOwner from "../components/IsOwner";

const API_URL = "http://localhost:5005";

function PlateCategoryListPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [categories, setCategories] = useState([]);
  const { restaurantId } = useParams();

  const navigate = useNavigate();

  const getAllCategories = () => {
    axios
      .get(`${API_URL}/api/${restaurantId}/platecategory`)
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
          <IsOwner>
            {showForm && (
              <AddPlateCategory
                refreshCategories={getAllCategories}
                hideForm={toggleShowFrom}
              />
            )}
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
            <PlateCategoryCard key={category.id} {...category} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default PlateCategoryListPage;
