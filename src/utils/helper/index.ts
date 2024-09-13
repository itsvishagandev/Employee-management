import {
  TEmployee,
  TManageOrgEmployeePayload,
  TSelectOptions,
} from "../../lib/data/Types";

export const getEmployeeList = (employees: TEmployee[]) => {
  let employeeList: TSelectOptions[] = [];

  employees.forEach((employee) => {
    employeeList.push({
      label: `${employee.name} - ${employee.position}`,
      value: employee.id,
    });

    if (employee.subordinates.length > 0) {
      employeeList = employeeList.concat(
        getEmployeeList(employee.subordinates)
      );
    }
  });

  return employeeList;
};

export const manageOrganizationEmployee = (
  payload: TManageOrgEmployeePayload
): TEmployee[] => {
  const { employees, employeeId, managerId, newEmployee, action } = payload;
  return employees.reduce<TEmployee[]>(
    (acc: TEmployee[], employee: TEmployee) => {
      if (action === "remove" && employee.id === employeeId) {
        return acc;
      }

      if (action === "edit" && employee.id === employeeId && newEmployee) {
        return [...acc, { ...employee, ...newEmployee }];
      }

      if (action === "add" && employee.id === managerId && newEmployee) {
        return [
          ...acc,
          {
            ...employee,
            subordinates: [
              ...employee.subordinates,
              { ...newEmployee, subordinates: [] },
            ],
          },
        ];
      }

      if (employee.subordinates.length > 0) {
        return [
          ...acc,
          {
            ...employee,
            subordinates: manageOrganizationEmployee({
              employees: employee.subordinates,
              employeeId,
              managerId,
              newEmployee,
              action,
            }),
          },
        ];
      }

      return [...acc, employee];
    },
    []
  );
};
