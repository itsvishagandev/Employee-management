import { TEmployee } from "../../../lib/data/Types";
import Employee from "./Employee";
import { TOrganizationTreeViewProps } from "./types";

const OrganizationTreeView = ({ data }: TOrganizationTreeViewProps) => {
  if (!data) {
    return <div>No Employee List</div>;
  }

  return (
    <div className="organization-tree">
      <div className="d-flex align-item-center justify-content-between py-2">
        <h2>Employee List :</h2>
      </div>
      <ul>
        {data.map((employee: TEmployee, index: number) => (
          <Employee
            key={employee.id}
            data={{
              ...employee,
              index,
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrganizationTreeView;
