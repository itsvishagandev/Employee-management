import { THomeProps } from "./types";
import OrganizationTreeView from "./components/OrganizationTreeView";
import { useOrganizationContext } from "../../lib/context/OrganizationContext";
import { ManageEmployeeModal } from "./components";

const Home = ({}: THomeProps) => {
  const { organizationDetails, manageEmployee, handleManageEmployee } =
    useOrganizationContext();

  return (
    <>
      <div className="d-flex gap-1 flex-wrap align-item-center justify-content-between">
        <h2 className="title">
          Organization : <span className="highlight-text">Tech boss</span>
        </h2>
        <button
          onClick={() =>
            handleManageEmployee({
              mode: "Add",
              employeeId: null,
              isActive: true,
            })
          }
          className="btn btn-primary"
        >
          Add New Employee
        </button>
      </div>
      <OrganizationTreeView data={organizationDetails?.employees} />
      {/* Manage Employee Form popup */}
      <ManageEmployeeModal status={manageEmployee} />
    </>
  );
};

export default Home;
