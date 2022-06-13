import { Link } from "react-router-dom";
import { Card } from "antd";

function DrinkCategoryCard({ id, name }) {
  return (
    <div>
      <Link to={`/drinks/category/${id}/${name}`}>
        <Card
          style={{
            width: 400,
          }}
        >
          <p>{name}</p>
        </Card>
      </Link>
    </div>
  );
}

export default DrinkCategoryCard;
