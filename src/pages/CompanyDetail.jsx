import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/NavBar";

function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/companies/${id}`);
      setCompany(res.data.data);
    } catch (error) {
      console.error("Error fetching company:", error);
      alert("Company not found");
      navigate("/companies");
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

  if (!company) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <p>Company not found</p>
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
          onClick={() => navigate("/companies")}
          style={{ marginBottom: "20px" }}
        >
          ← Back
        </button>

        <div
          data-testid="company-detail-container"
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            maxWidth: "600px",
          }}
        >
          <h1 data-testid="company-name">{company.name}</h1>

          <div style={{ marginTop: "20px" }}>
            <p data-testid="company-id">
              <strong>Company ID:</strong> {company.companyId}
            </p>
            <p data-testid="company-role">
              <strong>Role:</strong> {company.role}
            </p>
            <p data-testid="company-package">
              <strong>Package:</strong> ₹{company.package} LPA
            </p>
            <p data-testid="company-cgpa">
              <strong>Minimum CGPA:</strong> {company.minimumCgpa}
            </p>
            <p data-testid="company-drive-date">
              <strong>Drive Date:</strong> {new Date(company.driveDate).toLocaleDateString()}
            </p>
            <p data-testid="company-status">
              <strong>Status:</strong> {company.status}
            </p>

            {company.eligibleDepartments && company.eligibleDepartments.length > 0 && (
              <div data-testid="eligible-departments" style={{ marginTop: "15px" }}>
                <strong>Eligible Departments:</strong>
                <ul>
                  {company.eligibleDepartments.map((dept, idx) => (
                    <li key={idx} data-testid={`department-${idx}`}>
                      {dept}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginTop: "15px", fontSize: "12px", color: "#666" }}>
              <p>Created: {new Date(company.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(company.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
