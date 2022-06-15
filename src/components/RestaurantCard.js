import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function RestaurantCard({ id, image, name }) {
  return (
    <div className="RestaurantCard cardButton">
      <Link to={`/restaurants/${id}`}>
        <Card
          hoverable
          style={{ width: 400, height: 300 }}
          cover={<img alt="Restaurant image" src={image} />}
        >
          <Meta title={name} />
        </Card>
      </Link>
    </div>
  );
}

export default RestaurantCard;
