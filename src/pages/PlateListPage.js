import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { List, Button } from "antd";
import { AuthContext } from "../context/auth.context";

import PlateCard from "../components/PlateCard";
import AddPlate from "../components/AddPlate";
import IsOwner from "../components/IsOwner";

const API_URL = "http://localhost:5005";

function PlateListPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showForm, setForm] = useState(false);

  const [plates, setPlates] = useState([]);
  const { plateCategoryId, plateCategoryName } = useParams();

  const navigate = useNavigate();

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
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>

      <h2>{plateCategoryName}</h2>

      {isLoggedIn && (
        <>
          // If the user is a restaurant owner
          <IsOwner>
            {showForm && (
              <AddPlate refreshPlates={getPlates} hideForm={toggleShowFrom} />
            )}
            // Show or hide the form
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
