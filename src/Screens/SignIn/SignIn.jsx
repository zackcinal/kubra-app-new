import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../Services/users.js";
import "./signin.css";

function SignIn({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await signIn(form);
      setUser(userData.user);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        password: "",
      }));
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <span className="focus-border"></span>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter Password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <span className="focus-border"></span>
        <button type="submit">Log In</button>
      </form>
      <div className="nav-to-signup">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button className="button-signup">Sign Up</button>
          </Link>
        </div>
    </div>
  );
}

export default SignIn;
