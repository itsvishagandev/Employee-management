import { ReactNode } from "react";
import { Header } from "../screens/shared";
import { OrganizationProvider } from "../lib/context/OrganizationContext";

interface LayoutProps {
  children?: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <OrganizationProvider>
      <Header />
      <main className="p-2">{children}</main>
    </OrganizationProvider>
  );
};

export default AppLayout;
