import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/NavBar";

function DriveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrive();
  }, [id]);

  const fetchDrive = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/drives/${id}`);
      setDrive(res.data.data);
    } catch (error) {
      console.error("Error fetching drive:", error);
      alert("Drive not found");
      navigate("/drives");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!drive) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <p>Drive not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <button
          data-testid="back-btn"
          onClick={() => navigate("/drives")}
          style={{ marginBottom: "20px" }}
        >
          ← Back
        </button>

        <div
          data-testid="drive-detail-container"
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            maxWidth: "600px",
          }}
        >
          <h1 data-testid="drive-title">{drive.title}</h1>

          <div style={{ marginTop: "20px" }}>
            <p data-testid="drive-id">
              <strong>Drive ID:</strong> {drive.driveId}
            </p>
            <p data-testid="drive-company">
              <strong>Company:</strong> {drive.company?.name || "N/A"}
            </p>
            <p data-testid="drive-mode">
              <strong>Mode:</strong> {drive.mode}
            </p>
            <p data-testid="drive-location">
              <strong>Location:</strong> {drive.location}
            </p>
            <p data-testid="drive-deadline">
              <strong>Registration Deadline:</strong>{" "}
              {new Date(drive.registrationDeadline).toLocaleDateString()}
            </p>
            <p data-testid="drive-status">
              <strong>Status:</strong> {drive.status}
            </p>

            {drive.rounds && drive.rounds.length > 0 && (
              <div data-testid="drive-rounds" style={{ marginTop: "15px" }}>
                <strong>Rounds:</strong>
                <ul>
                  {drive.rounds.map((round, idx) => (
                    <li key={idx} data-testid={`round-${idx}`}>
                      {round}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginTop: "15px", fontSize: "12px", color: "#666" }}>
              <p>Created: {new Date(drive.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(drive.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriveDetail;
