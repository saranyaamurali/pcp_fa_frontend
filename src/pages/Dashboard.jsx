import { Link }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

function Dashboard() {
  const { logout } =
    useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Protected Route
        Working ✅
      </p>

      <Link
        to="/students"
      >
        <button>
          View Students
        </button>
      </Link>

      <button
        onClick={
          logout
        }
        style={{
          marginLeft:
            "10px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;