import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function Students() {
  const [students,
    setStudents] =
    useState([]);

  const fetchStudents =
    async () => {
      try {
        const res =
          await API.get(
            "/students"
          );

        setStudents(
          res.data.data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>
        Students
      </h1>

      {students.map(
        (
          student
        ) => (
          <div
            key={
              student._id
            }
            style={{
              border:
                "1px solid black",
              margin:
                "10px",
              padding:
                "10px",
            }}
          >
            <h3>
              {
                student.name
              }
            </h3>

            <p>
              {
                student.department
              }
            </p>

            <p>
              CGPA:
              {
                student.cgpa
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Students;