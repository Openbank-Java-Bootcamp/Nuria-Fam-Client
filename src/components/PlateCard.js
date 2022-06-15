import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function PlateCard(props) {
  const { plate, plateCategoryId } = props;

  return (
    <div className="PlateCard cardButton">
      <Link to={`/plates/${plateCategoryId}/${plate.id}`}>
        <Card
          hoverable
          style={{ width: 300, height: 300 }}
          cover={<img alt="Plate image" src={plate.image} />}
        >
          <Meta title={plate.name} description={plate.ingredients} />
        </Card>
      </Link>
    </div>
  );
}

export default PlateCard;
