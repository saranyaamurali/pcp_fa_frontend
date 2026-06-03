import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav data-testid="navbar">
      <Link
        to="/dashboard"
        data-testid="dashboard-link"
      >
        Dashboard
      </Link>

      {" | "}

      <Link
        to="/students"
        data-testid="students-link"
      >
        Students
      </Link>

      {" | "}

      <Link
        to="/companies"
        data-testid="companies-link"
      >
        Companies
      </Link>

      {" | "}

      <Link
        to="/drives"
        data-testid="drives-link"
      >
        Drives
      </Link>

      {" | "}

      <Link
        to="/applications"
        data-testid="applications-link"
      >
        Applications
      </Link>

      {" | "}

      <Link to="/interviews">
        Interviews
      </Link>

      {" | "}

      <Link to="/profile">
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;