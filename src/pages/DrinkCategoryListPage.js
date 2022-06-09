import { useState, useEffect } from "react";
import axios from "axios";
import { List } from "antd";
import DrinkCategoryCard from "../components/DrinkCategoryCard";

const API_URL = "http://localhost:5005";

function DrinkCategoryListPage() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    axios
      .get(`${API_URL}/api/drinkcategory`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
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