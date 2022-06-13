import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function PlateCard(props) {
  const { plate, plateCategoryId } = props;
  return (
    <div>
      <Link to={`/plates/${plateCategoryId}/${plate.id}`}>
        <Card
          hoverable
          style={{ width: 400 }}
          cover={<img alt="Plate image" src={plate.image} />}
        >
          <Meta title={plate.name} description={plate.ingredients} />
        </Card>
      </Link>
    </div>
  );
}

export default PlateCard;
