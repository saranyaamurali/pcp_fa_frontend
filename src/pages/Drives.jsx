import {
useEffect,
useState,
} from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Drives() {
const [drives, setDrives] =
useState([]);

useEffect(() => {
const fetchDrives =
async () => {
try {
const res =
await API.get(
"/drives"
);


      setDrives(
        res.data.data
      );
    } catch (err) {
      console.log(err);
    }
  };

fetchDrives();


}, []);

return ( <div> <Navbar />


  <h1>Drives</h1>

  <input
    data-testid="drive-search"
    placeholder="Search Drive"
  />

  <br />
  <br />

  <button
    data-testid="create-drive-btn"
  >
    Create Drive
  </button>

  <br />
  <br />

  <div
    data-testid="drive-list"
  >
    {drives.map(
      (drive) => (
        <div
          key={drive._id}
        >
          <h3>
            {drive.title}
          </h3>

          <p>
            {drive.mode}
          </p>

          <button
            data-testid="apply-btn"
          >
            Apply
          </button>

          <hr />
        </div>
      )
    )}
  </div>

  <button
    data-testid="pagination-prev"
  >
    Previous
  </button>

  <button
    data-testid="pagination-next"
  >
    Next
  </button>
</div>


);
}

export default Drives;
