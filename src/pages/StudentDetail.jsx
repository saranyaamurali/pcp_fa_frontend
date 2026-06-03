import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/NavBar";

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/students/${id}`);
      setStudent(res.data.data);
    } catch (error) {
      console.error("Error fetching student:", error);
      alert("Student not found");
      navigate("/students");
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

  if (!student) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <p>Student not found</p>
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
          onClick={() => navigate("/students")}
          style={{ marginBottom: "20px" }}
        >
          ← Back
        </button>

        <div
          data-testid="student-detail-container"
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            maxWidth: "600px",
          }}
        >
          <h1 data-testid="student-name">{student.name}</h1>

          <div style={{ marginTop: "20px" }}>
            <p data-testid="student-id">
              <strong>Student ID:</strong> {student.studentId}
            </p>
            <p data-testid="student-email">
              <strong>Email:</strong> {student.email}
            </p>
            <p data-testid="student-department">
              <strong>Department:</strong> {student.department}
            </p>
            <p data-testid="student-cgpa">
              <strong>CGPA:</strong> {student.cgpa}
            </p>
            <p data-testid="student-graduation">
              <strong>Graduation Year:</strong> {student.graduationYear}
            </p>
            <p data-testid="student-phone">
              <strong>Phone:</strong> {student.phone}
            </p>
            <p data-testid="student-status">
              <strong>Status:</strong> {student.status}
            </p>

            {student.skills && student.skills.length > 0 && (
              <div data-testid="student-skills" style={{ marginTop: "15px" }}>
                <strong>Skills:</strong>
                <ul>
                  {student.skills.map((skill, idx) => (
                    <li key={idx} data-testid={`skill-${idx}`}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginTop: "15px", fontSize: "12px", color: "#666" }}>
              <p>Created: {new Date(student.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(student.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;
