import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

function EmployeeCard({ id, image, name, jobTitle }) {
  return (
    <div>
      <Link to={`/employees/${id}`}>
        <Card
          hoverable
          style={{ width: 400 }}
          cover={<img alt="Employee image" src={image} />}
        >
          <Meta title={name} description={jobTitle} />
        </Card>
      </Link>
    </div>
  );
}

export default EmployeeCard;
