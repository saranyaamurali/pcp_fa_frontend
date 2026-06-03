import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

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
      await API.post(
        "/auth/register",
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
      <h1 data-testid="register-heading">Register</h1>

      <form
        data-testid="register-form"
        onSubmit={handleSubmit}
      >
        <input
          data-testid="register-name-input"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          data-testid="register-email-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          data-testid="register-password-input"
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <select
          data-testid="register-role-select"
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

        <button
          data-testid="register-btn"
          type="submit"
        >
          Register
        </button>
      </form>

      <br />
      <Link to="/login" data-testid="login-link">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Register;