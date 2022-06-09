import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function DrinkCard({ id, image, name, information }) {
  return (
    <div>
      <Link to={`/drinks/${id}`}>
        <Card
          hoverable
          style={{ width: 200 }}
          cover={<img alt="Drink image" src={image} />}
        >
          <Meta title={name} description={information} />
        </Card>
      </Link>
    </div>
  );
}

export default DrinkCard;
