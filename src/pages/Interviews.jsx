import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/NavBar";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await API.get("/interviews");
      setInterviews(res.data.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateResult = async (interviewId, newResult) => {
    try {
      await API.patch(`/interviews/${interviewId}`, {
        result: newResult,
      });
      alert("Interview updated successfully");
      fetchInterviews();
    } catch (error) {
      console.error("Error updating interview:", error);
      alert(error.response?.data?.message || "Failed to update interview");
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

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1 data-testid="interviews-heading">Interviews</h1>

        <button
          data-testid="schedule-interview-btn"
          onClick={() => alert("Schedule interview feature coming soon")}
        >
          Schedule Interview
        </button>

        <br />
        <br />

        {interviews.length === 0 ? (
          <p data-testid="no-interviews-msg">No interviews found</p>
        ) : (
          <table
            border="1"
            data-testid="interview-table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Interview ID</th>
                <th>Student</th>
                <th>Company</th>
                <th>Round</th>
                <th>Date</th>
                <th>Status</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview, idx) => (
                <tr key={interview._id} data-testid={`interview-row-${idx}`}>
                  <td data-testid={`interview-id-${idx}`}>
                    {interview.interviewId}
                  </td>
                  <td data-testid={`interview-student-${idx}`}>
                    {interview.application?.student?.name || "N/A"}
                  </td>
                  <td data-testid={`interview-company-${idx}`}>
                    {interview.application?.drive?.company?.name || "N/A"}
                  </td>
                  <td data-testid={`interview-round-${idx}`}>
                    {interview.round}
                  </td>
                  <td data-testid={`interview-date-${idx}`}>
                    {new Date(interview.interviewDate).toLocaleDateString()}
                  </td>
                  <td data-testid={`interview-status-${idx}`}>
                    {interview.status}
                  </td>
                  <td>
                    <select
                      data-testid={`interview-result-dropdown-${idx}`}
                      value={interview.result}
                      onChange={(e) =>
                        handleUpdateResult(interview._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                    </select>
                  </td>
                  <td>
                    <button
                      data-testid={`view-interview-btn-${idx}`}
                      onClick={() => alert("View interview details")}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Interviews;