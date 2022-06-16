import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { List, Button, Typography } from "antd";
import { AuthContext } from "../context/auth.context";
import PlateCard from "../components/PlateCard";
import AddPlate from "../components/AddPlate";
import IsOwner from "../components/IsOwner";

const { Title } = Typography;

const API_URL = "http://localhost:5005";

function PlateListPage({ id, name }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [plates, setPlates] = useState([]);

  const plateCategoryId = id;
  const plateCategoryName = name;

  const getPlates = () => {
    axios
      .get(`${API_URL}/api/plates/category/${plateCategoryId}`)
      .then((response) => setPlates(response.data))
      .catch((error) => console.log(error));
  };

  const toggleShowFrom = () => {
    setForm(!showForm);
  };

  useEffect(() => {
    getPlates();
  }, []);

  return (
    <div className="PlateList">
      <Title level={2}>{plateCategoryName}</Title>

      {isLoggedIn && (
        <>
          {/* If the user is a restaurant owner */}
          <IsOwner>
            {showForm && (
              <AddPlate
                refreshPlates={getPlates}
                hideForm={toggleShowFrom}
                category={id}
              />
            )}

            {/* Show or hide form */}
            <Button onClick={toggleShowFrom}>
              {showForm ? "Hide From" : "Add Plate"}
            </Button>
          </IsOwner>
        </>
      )}

      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={plates}
        renderItem={(plate) => (
          <List.Item>
            <PlateCard
              key={plate.id}
              plate={plate}
              plateCategoryId={plateCategoryId}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export default PlateListPage;
