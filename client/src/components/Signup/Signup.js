import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Signup = ({ onsignup }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [data, setdata] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please Enter Name");
      return;
    }
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
    if (password.length < 6) {
      alert("Weak Password");
    }
    const datarec = await onsignup({ name, email, password });
    setdata(datarec.email);
    if (datarec.email === "User Created Successfully") {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  return (
    <div>
      <h1>SignUp</h1>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
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
        <input className="btn btn-block" type="submit" value="Signup" />
      </form>
      <Link to="/">
        <button className="btn btn-block">Log In</button>
      </Link>
      {data === "Already exists" && (
        <div>
          User Already Exists <Link to="/">Login</Link>
        </div>
      )}
      {data === "User Created Successfully" && (
        <div>User Created Successfully</div>
      )}
    </div>
  );
};

export default Signup;
