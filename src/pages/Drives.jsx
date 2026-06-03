import {
useEffect,
useState,
} from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/NavBar";

function Drives() {
const navigate = useNavigate();
const [drives, setDrives] =
useState([]);
const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
const fetchDrives =
async () => {
try {
const res =
await API.get(
"/drives?page=" + page
);

      setDrives(
        res.data.data
      );
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

fetchDrives();


}, [page]);

const filteredDrives = drives.filter((drive) =>
  drive.title.toLowerCase().includes(search.toLowerCase())
);

return ( <div> <Navbar />


  <h1 data-testid="drives-heading">Drives</h1>

  <input
    data-testid="drive-search"
    placeholder="Search Drive"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <br />
  <br />

  <button
    data-testid="create-drive-btn"
    onClick={() => alert("Create drive feature coming soon")}
  >
    Create Drive
  </button>

  <br />
  <br />

  <div
    data-testid="drive-list"
  >
    {filteredDrives.map(
      (drive, idx) => (
        <div
          key={drive._id}
          data-testid={`drive-item-${idx}`}
          style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}
        >
          <h3 data-testid={`drive-title-${idx}`}>
            {drive.title}
          </h3>

          <p data-testid={`drive-mode-${idx}`}>
            <strong>Mode:</strong> {drive.mode}
          </p>
          <p data-testid={`drive-location-${idx}`}>
            <strong>Location:</strong> {drive.location}
          </p>
          <p data-testid={`drive-status-${idx}`}>
            <strong>Status:</strong> {drive.status}
          </p>

          <button
            data-testid={`view-drive-btn-${idx}`}
            onClick={() => navigate(`/drives/${drive._id}`)}
          >
            View
          </button>

          <button
            data-testid={`apply-btn-${idx}`}
            onClick={() => alert("Apply feature coming soon")}
          >
            Apply
          </button>

          <hr />
        </div>
      )
    )}
  </div>

  <div>
    <button
      data-testid="pagination-prev"
      onClick={() => setPage(Math.max(1, page - 1))}
      disabled={page === 1}
    >
      Previous
    </button>
    <span style={{ margin: "0 10px" }} data-testid="page-indicator">
      Page {page} of {totalPages}
    </span>
    <button
      data-testid="pagination-next"
      onClick={() => setPage(Math.min(totalPages, page + 1))}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
</div>


);
}

export default Drives;
