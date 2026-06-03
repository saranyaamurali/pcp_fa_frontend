import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/NavBar";

function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data.data);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (department === "" ||
        student.department === department)
  );

  return (
    <div>
      <Navbar />

      <h1 data-testid="students-heading">Students</h1>

      <input
        data-testid="student-search"
        placeholder="Search Student"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        data-testid="student-filter"
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
      >
        <option value="">
          All Departments
        </option>

        <option value="CSE">
          CSE
        </option>

        <option value="IT">
          IT
        </option>

        <option value="ECE">
          ECE
        </option>

        <option value="MECH">
          MECH
        </option>
      </select>

      <table
        border="1"
        data-testid="student-table"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>CGPA</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map(
            (student) => (
              <tr
                key={student._id}
                data-testid="student-row"
              >
                <td
                  data-testid={`student-name-${student._id}`}
                >
                  {student.name}
                </td>

                <td
                  data-testid={`student-dept-${student._id}`}
                >
                  {
                    student.department
                  }
                </td>

                <td
                  data-testid={`student-cgpa-${student._id}`}
                >
                  {student.cgpa}
                </td>

                <td>
                  <button
                    data-testid={`view-student-btn-${student._id}`}
                    onClick={() =>
                      navigate(
                        `/students/${student._id}`
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

export default Students;