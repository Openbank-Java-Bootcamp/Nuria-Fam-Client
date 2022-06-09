import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function PlateCard({ id, image, name, ingredients }) {
  return (
    <div>
      <Link to={`/plates/${id}`}>
        <Card
          hoverable
          style={{ width: 200 }}
          cover={<img alt="Plate image" src={image} />}
        >
          <Meta title={name} description={ingredients} />
        </Card>
      </Link>
    </div>
  );
}

export default PlateCard;
