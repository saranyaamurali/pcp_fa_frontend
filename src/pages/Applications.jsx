import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Applications() {
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

  return (
    <div>
      <Navbar />

      <h1>Applications</h1>

      <div
        data-testid="application-status-filter"
      >
        <button
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
          onClick={() =>
            setStatusFilter(
              "Pending"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "Pending"
                ? "bold"
                : "normal",
          }}
        >
          Pending
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "Selected"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "Selected"
                ? "bold"
                : "normal",
          }}
        >
          Selected
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "Rejected"
            )
          }
          style={{
            fontWeight:
              statusFilter ===
              "Rejected"
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
              Drive
            </th>
          </tr>
        </thead>

        <tbody>
          {applications.map(
            (
              application
            ) => (
              <tr
                key={
                  application._id
                }
                data-testid="application-row"
              >
                <td>
                  {
                    application.applicationId
                  }
                </td>

                <td>
                  {
                    application.studentId
                  }
                </td>

                <td>
                  {
                    application.driveId
                  }
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