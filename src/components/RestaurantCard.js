import { Link } from "react-router-dom";
import { Card, Button } from "antd";
const { Meta } = Card;

function RestaurantCard({ id, image, name }) {
  return (
    <div>
      <Link to={`/restaurants/${id}`}>
        <Card
          hoverable
          style={{ width: 400 }}
          cover={<img alt="Restaurant image" src={image} />}
        >
          <Meta title={name} />
        </Card>
      </Link>
    </div>
  );
}

export default RestaurantCard;
