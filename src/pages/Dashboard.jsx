import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { logout } =
    useAuth();

  const [analytics,
    setAnalytics] =
    useState({
      students: 0,
      companies: 0,
      drives: 0,
      applications: 0,
    });

  useEffect(() => {
    const loadAnalytics =
      async () => {
        try {
          const students =
            await API.get(
              "/analytics/students"
            );

          const companies =
            await API.get(
              "/analytics/companies"
            );

          const applications =
            await API.get(
              "/analytics/applications"
            );

          const drives =
            await API.get(
              "/drives"
            );

          setAnalytics({
            students:
              students.data.data
                .totalStudents,

            companies:
              companies.data.data
                .totalCompanies,

            applications:
              applications.data
                .data
                .totalApplications,

            drives:
              drives.data.data
                .length,
          });
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    loadAnalytics();
  }, []);

  return (
    <div>
      <Navbar />

      <h1>Dashboard</h1>

      <div
        data-testid="analytics-container"
      >
        <div
          data-testid="total-students-card"
        >
          Total Students:
          {
            analytics.students
          }
        </div>

        <div
          data-testid="total-companies-card"
        >
          Total Companies:
          {
            analytics.companies
          }
        </div>

        <div
          data-testid="total-drives-card"
        >
          Total Drives:
          {
            analytics.drives
          }
        </div>

        <div
          data-testid="total-applications-card"
        >
          Total Applications:
          {
            analytics.applications
          }
        </div>

        <div
          data-testid="placement-chart"
        >
          Placement Analytics
        </div>

        <div
          data-testid="recent-interviews"
        >
          Recent Interviews
        </div>
      </div>

      <br />

      <button
  data-testid="logout-btn"
  onClick={() => {
    logout();
    window.location.href =
      "/login";
  }}
>
  Logout
</button>
    </div>
  );
}

export default Dashboard;