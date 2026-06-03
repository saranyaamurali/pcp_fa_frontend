import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/auth/me");
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h1 data-testid="profile-heading">Profile</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h1 data-testid="profile-heading">Profile</h1>
          <p>Could not load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 data-testid="profile-heading">Profile</h1>

        <div
          data-testid="profile-container"
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            maxWidth: "600px",
          }}
        >
          <p data-testid="profile-name">
            <strong>Name:</strong> {user.name}
          </p>
          <p data-testid="profile-email">
            <strong>Email:</strong> {user.email}
          </p>
          <p data-testid="profile-role">
            <strong>Role:</strong> {user.role}
          </p>
          <p data-testid="profile-created">
            <strong>Created:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <button
            data-testid="logout-btn"
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;