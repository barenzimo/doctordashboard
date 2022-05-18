import React, { useEffect } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onlogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };
  useEffect(() => {
    if (!localStorage.getItem("auth_token") && location.pathname === "/tasks") {
      navigate("/");
    }
  }, [navigate, location]);
  return (
    <header className="header">
      <h1>{title}</h1>
      {(location.pathname === "/tasks" ||
        location.pathname === "/addtasks") && (
        <Button
          color={showAdd ? "black" : "green"}
          text={showAdd ? "View Appointments" : "Create Appointment"}
          OnClick={onAdd}
          marginleft={"450px"}
        />
      )}
      {/* {(location.pathname === "/tasks" ||
        location.pathname === "/addtasks") && (
        <Link to="/viewtasks">
          <Button
            color="green"
            text="View"
            // OnClick={onAdd}
          />
        </Link>
      )} */}

      {(location.pathname === "/tasks" ||
        location.pathname === "/addtasks") && (
        <Button color={"red"} text={"Logout"} OnClick={onlogout} />
      )}
    </header>
  );
};

Header.defaulProps = {
  title: "Doctors Dashboard",
};

export default Header;
