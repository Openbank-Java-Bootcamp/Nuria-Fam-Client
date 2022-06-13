import { Link } from "react-router-dom";
import { Card } from "antd";

function PlateCategoryCard({ id, name }) {
  return (
    <div>
      <Link to={`/plates/category/${id}/${name}`}>
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

export default PlateCategoryCard;
