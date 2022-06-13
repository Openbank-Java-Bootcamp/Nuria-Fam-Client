import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function EmployeeCard(props) {
  const { employee, restaurantId } = props;
  return (
    <div>
      <Link to={`/${restaurantId}/employees/${employee.id}`}>
        <Card
          hoverable
          style={{ width: 400 }}
          cover={<img alt="Employee image" src={employee.image} />}
        >
          <Meta title={employee.name} description={employee.jobTitle} />
        </Card>
      </Link>
    </div>
  );
}

export default EmployeeCard;
