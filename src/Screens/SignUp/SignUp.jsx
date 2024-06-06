import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../Services/users.js";
import "./signup.css";

function SignUp({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const userData = await signUp(form);
      setUser(userData);

      navigate("/home");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        email: "",
        password: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Sign Up</button>;
    }
  };

  return (
    <div className="home-container-signup">
      <div>
        <form className="home-form" onSubmit={handleSubmit}>
          <h1>Join Us!</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={form.username}
            onChange={handleChange}
            autoComplete="off"
            className="signupInput"
          />{" "}
          <span className="focus-border"></span>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            id="first_name"
            placeholder="Enter First Name"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <span className="focus-border"></span>
          <label htmlFor="first_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            id="last_name"
            placeholder="Enter Last Name"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <span className="focus-border"></span>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={form.email}
            placeholder="Enter Email"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <span className="focus-border"></span>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <span className="focus-border"></span>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <span className="focus-border"></span>
          {renderError()}
        </form>
        <div className="nav-to-signin">
          <p>Have an account?</p>
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
