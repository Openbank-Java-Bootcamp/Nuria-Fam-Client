import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Tabs, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AddPlateCategory from "../components/AddPlateCategory";
import IsOwner from "../components/IsOwner";
import PlateListPage from "./PlateListPage";

const { TabPane } = Tabs;

const API_URL = "http://localhost:5005";

function PlateCategoryListPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [categories, setCategories] = useState([]);
  const { restaurantId } = useParams();

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
    <div className="PlateCategoryList">
      <Link to={`/${restaurantId}/drinkcategory`}>
        <Button>Drinks</Button>
      </Link>

      <div className="list">
        {isLoggedIn && (
          <>
            {/* If the user is a restaurant owner */}
            <IsOwner>
              {showForm && (
                <AddPlateCategory
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
        <Tabs centered size="large">
          {categories.map((category) => (
            <TabPane tab={category.name} key={category.id}>
              <PlateListPage {...category} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
export default PlateCategoryListPage;
