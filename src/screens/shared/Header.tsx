import { Link } from "react-router-dom";
import { THeaderProps } from "./types";

const Header = ({}: THeaderProps) => {
  return (
    <header>
      <Link to="/" className="logo d-flex align-item-center">
        EMPLOYEE DETAILS
      </Link>
      <nav className="menu-bar">
        <div className="profile d-flex align-item-center justify-content-center">
          A
        </div>
      </nav>
    </header>
  );
};

export default Header;
