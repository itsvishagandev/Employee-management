export type TManageEmployeeData = {
  mode: "Add" | "Edit";
  employeeId: number | null;
  managerId?: number;
  isActive: boolean;
};
