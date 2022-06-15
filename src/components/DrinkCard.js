import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function DrinkCard(props) {
  const { drink, drinkCategoryId } = props;

  return (
    <div className="DrinkCard">
      <Link to={`/drinks/${drinkCategoryId}/${drink.id}`}>
        <Card
          hoverable
          style={{ width: 400, height: 400 }}
          cover={<img alt="Drink image" src={drink.image} />}
        >
          <Meta title={drink.name} description={drink.ingredients} />
        </Card>
      </Link>
    </div>
  );
}

export default DrinkCard;
