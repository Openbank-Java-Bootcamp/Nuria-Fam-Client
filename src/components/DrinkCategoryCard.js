import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function DrinkCategoryCard({ id, name }) {
  return (
    <div>
      <Link to={`/drinks/category/${id}`}>
        <Card
          style={{
            width: 300,
          }}
        >
          <p>{name}</p>
        </Card>
      </Link>
    </div>
  );
}

export default DrinkCategoryCard;
