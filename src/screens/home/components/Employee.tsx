import { EmployeeCard } from "../../../components";
import { TEmployee } from "../../../lib/data/Types";

// Recursive component to render each employee and their subordinates
const Employee = ({ data }: { data: TEmployee }) => {
  return (
    <li>
      <EmployeeCard data={data} />
      {data.subordinates.length > 0 && (
        <ul>
          {data.subordinates.map((subordinate: TEmployee, i: number) => (
            <Employee
              key={subordinate.id}
              data={{
                ...subordinate,
                index: (data?.index || 0) + 1,
                managerId: data.id,
              }}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Employee;
