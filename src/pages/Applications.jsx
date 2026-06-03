import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/NavBar";

function Applications() {
  const navigate = useNavigate();
  const [applications,
    setApplications] =
    useState([]);
  const [statusFilter,
    setStatusFilter] =
    useState("All");

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          const res =
            await API.get(
              "/applications"
            );

          setApplications(
            res.data.data
          );
        } catch (err) {
          console.log(err);
        }
      };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(
    (app) =>
      statusFilter === "All" ||
      app.status.toLowerCase() === statusFilter.toLowerCase()
  );

  return (
    <div>
      <Navbar />

      <h1 data-testid="applications-heading">Applications</h1>

      <div
        data-testid="application-status-filter"
      >
        <button
          data-testid="filter-all"
          onClick={() =>
            setStatusFilter(
              "All"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "All"
                ? "bold"
                : "normal",
          }}
        >
          All
        </button>

        <button
          data-testid="filter-applied"
          onClick={() =>
            setStatusFilter(
              "applied"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "applied"
                ? "bold"
                : "normal",
          }}
        >
          Applied
        </button>

        <button
          data-testid="filter-shortlisted"
          onClick={() =>
            setStatusFilter(
              "shortlisted"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "shortlisted"
                ? "bold"
                : "normal",
          }}
        >
          Shortlisted
        </button>

        <button
          data-testid="filter-selected"
          onClick={() =>
            setStatusFilter(
              "selected"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "selected"
                ? "bold"
                : "normal",
          }}
        >
          Selected
        </button>

        <button
          data-testid="filter-rejected"
          onClick={() =>
            setStatusFilter(
              "rejected"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "rejected"
                ? "bold"
                : "normal",
          }}
        >
          Rejected
        </button>
      </div>

      <table
        border="1"
        data-testid="application-table"
      >
        <thead>
          <tr>
            <th>
              Application ID
            </th>

            <th>
              Student
            </th>

            <th>
              Company
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredApplications.map(
            (
              application, idx
            ) => (
              <tr
                key={
                  application._id
                }
                data-testid="application-row"
              >
                <td data-testid={`app-id-${idx}`}>
                  {
                    application.applicationId
                  }
                </td>

                <td data-testid={`app-student-${idx}`}>
                  {
                    application.student?.name || "N/A"
                  }
                </td>

                <td data-testid={`app-company-${idx}`}>
                  {
                    application.drive?.company?.name || "N/A"
                  }
                </td>

                <td data-testid={`app-status-${idx}`}>
                  {
                    application.status
                  }
                </td>

                <td>
                  <button
                    data-testid={`view-app-btn-${idx}`}
                    onClick={() =>
                      navigate(
                        `/applications/${application._id}`
                      )
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;