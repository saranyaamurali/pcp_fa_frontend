import Navbar from "../components/Navbar";

function Interviews() {
  return (
    <div>
      <Navbar />

      <h1>Interviews</h1>

      <button
        data-testid="schedule-interview-btn"
      >
        Schedule Interview
      </button>

      <br />
      <br />

      <table
        border="1"
        data-testid="interview-table"
      >
        <thead>
          <tr>
            <th>Student</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              Demo Student
            </td>

            <td>
              <select
                data-testid="interview-result-dropdown"
              >
                <option>
                  Pending
                </option>

                <option>
                  Selected
                </option>

                <option>
                  Rejected
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Interviews;