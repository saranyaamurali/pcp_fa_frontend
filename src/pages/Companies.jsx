import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Navbar from "../components/NavBar";

function Companies() {
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

      <h1>Companies</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(
            (company) => (
              <tr
                key={
                  company._id
                }
              >
                <td>
                  {company.name}
                </td>

                <td>
                  {
                    company.companyId
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

export default Companies;