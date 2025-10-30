import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8888/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    console.log(json);
    if (json.flag) {
      props.updateAlert("Welcome to iNoteBook", "success");
      navigate("/");
    } else {
      props.updateAlert(json.msg, "danger");
    }
  };

  return (
    <div className="conatainer my-3">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            name="name"
            value={credentials.name}
            placeholder="Enter your username"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            name="email"
            value={credentials.email}
            placeholder="Enter your E-mail"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
            minLength={6}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={credentials.password}
            placeholder="Enter your password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChange}
            minLength={6}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};
export default Signup;
