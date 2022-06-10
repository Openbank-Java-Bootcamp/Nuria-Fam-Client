import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { List, Button } from "antd";

import PlateCard from "../components/PlateCard";

const API_URL = "http://localhost:5005";

function PlateListPage() {
  const [plates, setPlates] = useState([]);
  const { plateCategoryId, plateCategoryName } = useParams();

  const navigate = useNavigate();

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
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <h2>{plateCategoryName}</h2>
      <Link to={"/"}>
        <Button>Add Plate</Button>
      </Link>
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={plates}
        renderItem={(plate) => (
          <List.Item>
            <PlateCard key={plate.id} {...plate} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default PlateListPage;
