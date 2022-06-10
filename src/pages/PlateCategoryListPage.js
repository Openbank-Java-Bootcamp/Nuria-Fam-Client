import { useState, useEffect } from "react";
import axios from "axios";
import { List } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PlateCategoryCard from "../components/PlateCategoryCard";

const API_URL = "http://localhost:5005";

function PlateCategoryListPage() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const getAllCategories = () => {
    axios
      .get(`${API_URL}/api/platecategory`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
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
