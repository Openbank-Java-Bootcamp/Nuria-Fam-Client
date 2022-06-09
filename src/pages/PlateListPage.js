import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { List } from "antd";

import PlateCard from "../components/PlateCard";

const API_URL = "http://localhost:5005";

function PlateListPage() {
  const [plates, setPlates] = useState([]);
  const { plateCategoryId } = useParams();

  const getPlates = () => {
    axios
      .get(`${API_URL}/api/plates/category/${plateCategoryId}`)
      .then((response) => setPlates(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlates();
  }, []);
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={plates}
        renderItem={(plate) => (
          <List.Item>
            <PlateCard key={plate.id} {...plate} category={plateCategoryId} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default PlateListPage;
