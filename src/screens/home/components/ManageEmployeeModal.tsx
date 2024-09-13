import { useEffect, useState } from "react";
import { useOrganizationContext } from "../../../lib/context/OrganizationContext";
import { TManageEmployeeModal } from "./types";

type TFormField = {
  name: string;
  position: string;
  selectedManager: number;
};

const defaultValue: TFormField = {
  name: "",
  position: "",
  selectedManager: 101,
};

const ManageEmployeeModal = ({ status }: TManageEmployeeModal) => {
  const {
    employeeList,
    lastUserId,
    handleManageEmployee,
    addEmployee,
    editEmployee,
  } = useOrganizationContext();

  const [formData, setFormData] = useState<TFormField>(defaultValue);

  console.log("formData", formData);

  useEffect(() => {
    if (status.mode === "Edit" && status.employeeId) {
      const employee = employeeList.find(
        (emp) => emp.value === status.employeeId
      );
      if (employee) {
        const [name, position] = employee.label.split(" - ");
        setFormData({
          name,
          position,
          selectedManager: status?.managerId
            ? status.managerId
            : Number(status.employeeId),
        });
      }
    } else {
      setFormData(() => ({
        ...defaultValue,
        selectedManager: status?.managerId
          ? status.managerId
          : Number(status.employeeId) || 101,
      }));
    }
  }, [status, employeeList]);

  const closeModal = () => {
    handleManageEmployee({
      mode: "Add",
      employeeId: null,
      isActive: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, position, selectedManager } = formData;

    if (status.mode === "Add") {
      addEmployee(+selectedManager, {
        id: lastUserId ? lastUserId + 1 : 123,
        name,
        position,
      });
    } else if (status.mode === "Edit" && status.employeeId) {
      editEmployee(status.employeeId, {
        id: status.employeeId,
        name,
        position,
      });
    }
    closeModal();
  };

  return (
    <div className={`modal ${status?.isActive ? "show" : ""}`}>
      <div className="modal-overlayer" onClick={closeModal}></div>
      <form onSubmit={handleForm} className="modal-wrapper">
        <div className="modal-header">
          <h4>{status.mode === "Edit" ? "Edit Employee" : "New Employee"}</h4>
          <button className="icon-btn close-btn" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="modal-content p-1">
          <div className="form-control">
            <label htmlFor="">Select the Manager</label>
            <select
              name="selectedManager"
              id="selectedManager"
              disabled={!!status?.employeeId || status.mode === "Edit"}
              className={`${
                status?.employeeId || status.mode === "Edit" ? "disabled" : ""
              }`}
              value={formData.selectedManager}
              onChange={handleInputChange}
              required
            >
              {employeeList.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">{`${
            status.mode === "Edit" ? "Update" : "Create"
          }`}</button>
        </div>
      </form>
    </div>
  );
};

export default ManageEmployeeModal;
