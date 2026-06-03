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

      <Link
        to="/interviews"
        data-testid="interviews-link"
      >
        Interviews
      </Link>

      {" | "}

      <Link
        to="/analytics"
        data-testid="analytics-link"
      >
        Analytics
      </Link>

      {" | "}

      <Link
        to="/profile"
        data-testid="profile-link"
      >
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;