import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = ({ onlogin }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [data, setdata] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter Email");
      return;
    }
    if (!password) {
      alert("Please Enter Password");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Not a Valid Email");
      return;
    }
    const datarec = await onlogin({ email, password });
    setdata(datarec.email);
    if (datarec.email === "Successfully logged in") {
      localStorage.setItem("auth_token", datarec.auth_token);
      navigate("/tasks");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/tasks");
    }
  }, [navigate]);
  return (
    <div>
      <h1>Login</h1>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Passsword"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <input className="btn btn-block" type="submit" value="Login" />
      </form>
      <Link to="/signup">
        <button className="btn btn-block">SignUp</button>
      </Link>
      {data === "Successfully logged in" && <div>logged in</div>}
      {data === "Password is incorrect" && <div>Password is incorrect</div>}
      {data === "User Does not exist" && <div>User Does not exist</div>}
    </div>
  );
};

export default Login;
