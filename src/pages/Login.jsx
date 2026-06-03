import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import API from "../services/api";

import { useAuth }
from "../context/AuthContext";

function Login() {
  const [username,
    setUsername] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const { login } =
    useAuth();

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await API.post(
            "/auth/login",
            {
              username,
              password,
            }
          );

        login(
          res.data.token
        );

        navigate(
          "/dashboard"
        );
      } catch (
        error
      ) {
        alert(
          "Login Failed"
        );
      }
    };

  return (
    <div>
      <h1>Login</h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;