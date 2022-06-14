import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
const { Text } = Typography;

function PlateCategoryCard({ id, name }) {
  return (
    <div>
      <Link className="cardButton" to={`/plates/category/${id}/${name}`}>
        <Card
          hoverable
          style={{
            width: 200,
          }}
        >
          <Text strong>{name}</Text>
        </Card>
      </Link>
    </div>
  );
}

export default PlateCategoryCard;
