import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/NavBar";

function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/applications/${id}`);
      setApplication(res.data.data);
    } catch (error) {
      console.error("Error fetching application:", error);
      alert("Application not found");
      navigate("/applications");
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

  if (!application) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <p>Application not found</p>
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
          onClick={() => navigate("/applications")}
          style={{ marginBottom: "20px" }}
        >
          ← Back
        </button>

        <div
          data-testid="application-detail-container"
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            maxWidth: "700px",
          }}
        >
          <h1 data-testid="application-id">Application {application.applicationId}</h1>

          <section data-testid="application-header" style={{ marginTop: "20px" }}>
            <h3>Application Details</h3>
            <p data-testid="app-status">
              <strong>Status:</strong> {application.status}
            </p>
            <p data-testid="app-current-round">
              <strong>Current Round:</strong> {application.currentRound}
            </p>
            <p data-testid="app-applied-date">
              <strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}
            </p>
          </section>

          {application.student && (
            <section data-testid="student-info" style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
              <h3>Student Information</h3>
              <p data-testid="student-name">
                <strong>Name:</strong> {application.student.name}
              </p>
              <p data-testid="student-id">
                <strong>Student ID:</strong> {application.student.studentId}
              </p>
              <p data-testid="student-email">
                <strong>Email:</strong> {application.student.email}
              </p>
              <p data-testid="student-dept">
                <strong>Department:</strong> {application.student.department}
              </p>
              <p data-testid="student-cgpa">
                <strong>CGPA:</strong> {application.student.cgpa}
              </p>
            </section>
          )}

          {application.drive && (
            <section data-testid="drive-info" style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
              <h3>Drive Information</h3>
              <p data-testid="drive-title">
                <strong>Drive Title:</strong> {application.drive.title}
              </p>
              <p data-testid="drive-id">
                <strong>Drive ID:</strong> {application.drive.driveId}
              </p>
              <p data-testid="drive-mode">
                <strong>Mode:</strong> {application.drive.mode}
              </p>
              <p data-testid="drive-location">
                <strong>Location:</strong> {application.drive.location}
              </p>

              {application.drive.company && (
                <div data-testid="company-info" style={{ marginTop: "15px" }}>
                  <h4>Company</h4>
                  <p data-testid="company-name">
                    <strong>Name:</strong> {application.drive.company.name}
                  </p>
                  <p data-testid="company-role">
                    <strong>Role:</strong> {application.drive.company.role}
                  </p>
                  <p data-testid="company-package">
                    <strong>Package:</strong> ₹{application.drive.company.package} LPA
                  </p>
                </div>
              )}

              {application.drive.rounds && application.drive.rounds.length > 0 && (
                <div data-testid="drive-rounds" style={{ marginTop: "15px" }}>
                  <strong>Rounds:</strong>
                  <ul>
                    {application.drive.rounds.map((round, idx) => (
                      <li key={idx} data-testid={`round-${idx}`}>
                        {round}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <div style={{ marginTop: "20px", fontSize: "12px", color: "#666", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
            <p>Created: {new Date(application.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(application.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
