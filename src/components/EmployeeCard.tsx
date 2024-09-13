import { Delete, Edit } from "../assets/svg";
import Plus from "../assets/svg/Plus";
import { useOrganizationContext } from "../lib/context/OrganizationContext";
import { TEmployee } from "../lib/data/Types";

// const getRandomNumber = (min: number = 1, max: number = 10): number => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

const EmployeeCard = ({ data }: { data: TEmployee }) => {
  // const profilePicId = getRandomNumber();
  const { handleManageEmployee, removeEmployee } = useOrganizationContext();

  return (
    <div
      className={`card-wrapper ${
        !data?.subordinates?.length ? "last-child" : ""
      }`}
      style={{
        position: "relative",
        paddingLeft: `calc(2rem + ${(data?.index || 0) * 5}rem)`,
      }}
    >
      <div className="employee-card justify-content-between gap-1">
        <div className="d-flex align-item-center">
          <div className="profile-img">
            <img
              src={`/gif/img${
                data?.index !== undefined ? data?.index + 1 : 0
              }.gif`}
              alt={data.name}
            />
          </div>
          <div className="employee-details">
            <h4>{data.name}</h4>
            <p>{data.position}</p>
          </div>
        </div>
        <div className="d-flex align-item-center gap-1">
          <button
            className="icon-btn"
            onClick={() => {
              handleManageEmployee({
                mode: "Add",
                employeeId: data.id,
                isActive: true,
              });
            }}
          >
            <Plus />
          </button>
          <button
            className="icon-btn"
            onClick={() => {
              handleManageEmployee({
                mode: "Edit",
                employeeId: data.id,
                managerId: data?.managerId,
                isActive: true,
              });
            }}
          >
            <Edit />
          </button>
          {!data?.subordinates?.length && (
            <button
              className="icon-btn"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to remove this employee?"
                  )
                ) {
                  removeEmployee(data.id);
                }
              }}
            >
              <Delete />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
