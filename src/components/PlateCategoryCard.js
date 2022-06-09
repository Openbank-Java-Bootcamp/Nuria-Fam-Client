import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function PlateCategoryCard({ id, name }) {
  return (
    <div>
      <Link to={`/plates/category/${id}`}>
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

export default PlateCategoryCard;
