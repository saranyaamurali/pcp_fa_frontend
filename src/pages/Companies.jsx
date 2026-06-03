import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/NavBar";

function Companies() {
  const navigate = useNavigate();
  const [companies,
    setCompanies] =
    useState([]);

  useEffect(() => {
    const fetchCompanies =
      async () => {
        try {
          const res =
            await API.get(
              "/companies"
            );

          setCompanies(
            res.data.data
          );
        } catch (err) {
          console.log(err);
        }
      };

    fetchCompanies();
  }, []);

  return (
    <div>
      <Navbar />

      <h1 data-testid="companies-heading">Companies</h1>

      <table border="1" data-testid="company-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(
            (company) => (
              <tr
                key={
                  company._id
                }
                data-testid="company-row"
              >
                <td
                  data-testid={`company-name-${company._id}`}
                >
                  {company.name}
                </td>

                <td
                  data-testid={`company-id-${company._id}`}
                >
                  {
                    company.companyId
                  }
                </td>

                <td
                  data-testid={`company-role-${company._id}`}
                >
                  {company.role}
                </td>

                <td>
                  <button
                    data-testid={`view-company-btn-${company._id}`}
                    onClick={() =>
                      navigate(
                        `/companies/${company._id}`
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

export default Companies;