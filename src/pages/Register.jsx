import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "placement_officer",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://pcp-fa-backend-hkdu.onrender.com/api/auth/register",
        formData
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <select
          name="role"
          value={formData.role}
          onChange={
            handleChange
          }
        >
          <option value="admin">
            Admin
          </option>

          <option value="placement_officer">
            Placement Officer
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>

      <br />

      <Link to="/login">
        Login
      </Link>
    </div>
  );
};

export default Register;