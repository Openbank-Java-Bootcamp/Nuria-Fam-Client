import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function EmployeeCard(props) {
  const { employee, restaurantId } = props;

  return (
    <div className="EmployeeCard cardButton">
      <Link to={`/${restaurantId}/employees/${employee.id}`}>
        <Card
          hoverable
          style={{ width: 300, height: 300 }}
          cover={<img alt="Employee image" src={employee.image} />}
        >
          <Meta title={employee.name} description={employee.jobTitle} />
        </Card>
      </Link>
    </div>
  );
}

export default EmployeeCard;
