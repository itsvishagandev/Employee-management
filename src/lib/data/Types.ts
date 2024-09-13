export type TEmployee = {
  id: number;
  managerId?: number;
  index?: number;
  name: string;
  position: string;
  subordinates: TEmployee[];
};

export type TOrganization = {
  id: number;
  name: string;
  employees: TEmployee[];
};

export type TSelectOptions = {
  label: string;
  value: number;
};

export type TManageOrgEmployeePayload = {
  employees: TEmployee[];
  employeeId: number | null;
  managerId: number | null;
  newEmployee: Omit<TEmployee, "subordinates"> | null;
  action: "add" | "edit" | "remove";
};
