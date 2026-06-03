import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/NavBar";

function Analytics() {
  const [placements, setPlacements] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [placementsRes, deptRes, compRes] = await Promise.all([
        API.get("/analytics/placements"),
        API.get("/analytics/departments"),
        API.get("/analytics/companies"),
      ]);

      setPlacements(placementsRes.data.data);
      setDepartments(deptRes.data.data);
      setCompanies(compRes.data.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h1 data-testid="analytics-page">Analytics</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 data-testid="analytics-page">Analytics</h1>

        {placements && (
          <section
            data-testid="placement-analytics"
            style={{
              marginBottom: "30px",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h2>Placement Analytics</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              <div data-testid="total-applications-stat" style={{ padding: "10px", border: "1px solid #ddd" }}>
                <strong>Total Applications:</strong>
                <p>{placements.totalApplications}</p>
              </div>
              <div data-testid="shortlisted-stat" style={{ padding: "10px", border: "1px solid #ddd" }}>
                <strong>Shortlisted:</strong>
                <p>{placements.shortlistedCount}</p>
              </div>
              <div data-testid="selected-stat" style={{ padding: "10px", border: "1px solid #ddd" }}>
                <strong>Selected:</strong>
                <p>{placements.selectedCount}</p>
              </div>
              <div data-testid="rejected-stat" style={{ padding: "10px", border: "1px solid #ddd" }}>
                <strong>Rejected:</strong>
                <p>{placements.rejectedCount}</p>
              </div>
            </div>
          </section>
        )}

        {departments.length > 0 && (
          <section
            data-testid="department-analytics"
            style={{
              marginBottom: "30px",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h2>Department-wise Placements</h2>
            <table
              border="1"
              data-testid="department-table"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th data-testid="dept-col">Department</th>
                  <th data-testid="placed-col">Placed Count</th>
                  <th data-testid="percentage-col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, idx) => (
                  <tr key={idx} data-testid={`department-row-${idx}`}>
                    <td>{dept.department}</td>
                    <td>{dept.placedCount}</td>
                    <td>{dept.placementPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {companies.length > 0 && (
          <section
            data-testid="company-analytics"
            style={{
              marginBottom: "30px",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h2>Company Analytics</h2>
            <table
              border="1"
              data-testid="company-table"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th data-testid="company-name-col">Company Name</th>
                  <th data-testid="highest-package-col">Highest Package</th>
                  <th data-testid="participation-col">Participation Count</th>
                  <th data-testid="selected-col">Selected Students</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, idx) => (
                  <tr key={company._id} data-testid={`company-row-${idx}`}>
                    <td>{company.companyName}</td>
                    <td>{company.highestPackage}</td>
                    <td>{company.participationCount}</td>
                    <td>{company.selectedStudents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
}

export default Analytics;
