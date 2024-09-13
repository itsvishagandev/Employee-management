import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { TManageEmployeeData } from "./types";
import { TEmployee, TOrganization, TSelectOptions } from "../data/Types";
import { getOrganizationDetails } from "../../utils";
import {
  getEmployeeList,
  manageOrganizationEmployee,
} from "../../utils/helper";

// Define the context types
interface OrganizationContextType {
  organizationDetails: TOrganization | null;
  manageEmployee: TManageEmployeeData;
  employeeList: TSelectOptions[];
  lastUserId: number | null;
  addEmployee: (
    managerId: number,
    newEmployee: Omit<TEmployee, "subordinates">
  ) => void;
  editEmployee: (
    employeeId: number,
    newEmployee: Omit<TEmployee, "subordinates">
  ) => void;
  removeEmployee: (employeeId: number) => void;
  handleManageEmployee: (newState: TManageEmployeeData) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [organizationDetails, setOrganizationDetails] =
    useState<TOrganization | null>(null);
  const [manageEmployee, setManageEmployee] = useState<TManageEmployeeData>({
    mode: "Add",
    employeeId: null,
    isActive: false,
  });
  const [employeeList, setEmployeeList] = useState<TSelectOptions[]>([]);
  const [lastUserId, setLastUserId] = useState<number | null>(null);

  useEffect(() => {
    // getting organization data from API
    getOrganizationDetails().then((organizationData: TOrganization) => {
      setOrganizationDetails(organizationData);
    });
  }, []);

  useEffect(() => {
    if (!!organizationDetails?.employees.length) {
      const employeeListOptions = getEmployeeList(
        organizationDetails?.employees
      );
      setEmployeeList(employeeListOptions);
    }
  }, [organizationDetails]);

  useEffect(() => {
    if (employeeList.length > 0) {
      // Find the last employee ID after sorting
      const sortedList = [...employeeList].sort((a, b) => a.value - b.value);
      const lastId = sortedList[sortedList.length - 1].value;
      setLastUserId(lastId);
    }
  }, [employeeList]);

  const handleManageEmployee = (newState: TManageEmployeeData) => {
    setManageEmployee(newState);
  };

  const addEmployee = (
    managerId: number,
    newEmployee: Omit<TEmployee, "subordinates">
  ) => {
    setOrganizationDetails((prevDetails) => {
      if (!prevDetails) return prevDetails;

      return {
        ...prevDetails,
        employees: manageOrganizationEmployee({
          employees: prevDetails.employees,
          employeeId: null,
          managerId,
          newEmployee,
          action: "add",
        }),
      };
    });
  };

  const editEmployee = (
    employeeId: number,
    newEmployee: Omit<TEmployee, "subordinates">
  ) => {
    setOrganizationDetails((prevDetails) => {
      if (!prevDetails) return prevDetails;

      return {
        ...prevDetails,
        employees: manageOrganizationEmployee({
          employees: prevDetails.employees,
          employeeId: employeeId,
          managerId: null,
          newEmployee,
          action: "edit",
        }),
      };
    });
  };

  const removeEmployee = (employeeId: number) => {
    setOrganizationDetails((prevDetails) => {
      if (!prevDetails) return prevDetails;

      return {
        ...prevDetails,
        employees: manageOrganizationEmployee({
          employees: prevDetails.employees,
          employeeId: employeeId,
          managerId: null,
          newEmployee: null,
          action: "remove",
        }),
      };
    });
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizationDetails,
        manageEmployee,
        employeeList,
        lastUserId,
        addEmployee,
        editEmployee,
        removeEmployee,
        handleManageEmployee,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganizationContext must be used within an OrganizationProvider"
    );
  }
  return context;
};
