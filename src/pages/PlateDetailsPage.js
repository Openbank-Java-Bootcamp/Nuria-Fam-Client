import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from "antd";

const API_URL = "http://localhost:5005";

function PlateDetailsPage() {
  const [plate, setPlate] = useState(null);
  const { plateId } = useParams();

  const getPlate = () => {
    axios
      .get(`${API_URL}/api/plates/${plateId}`)
      .then((response) => {
        setPlate(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getPlate();
  }, []);
  return (
    <div>
      {plate && (
        <>
          <Image preview={false} height={300} src={plate.image} />
          <h2>{plate.name}</h2>
          <p>{plate.ingredients}</p>
          <p>{plate.price}</p>
        </>
      )}
    </div>
  );
}
export default PlateDetailsPage;
