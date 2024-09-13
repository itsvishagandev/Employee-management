import { TManageEmployeeData } from "../../../lib/context/types";
import { TEmployee, TOrganization } from "../../../lib/data/Types";

export type TOrganizationTreeViewProps = {
  data?: TEmployee[];
};

export type TManageEmployeeModal = {
  status: TManageEmployeeData;
};
