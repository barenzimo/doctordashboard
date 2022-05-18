import PropTypes from "prop-types";
import Header from "./components/Tasks/Header";
import Tasks from "./components/Tasks/Tasks";
import Addtask from "./components/Tasks/Addtask";
import { useState, useEffect } from "react";
import Footer from "./components/Tasks/Footer";
import About from "./components/About/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
function App() {
  const [showaddtask, setshowaddtask] = useState(false);
  const [tasks, settasks] = useState([]);
  useEffect(() => {
    const gettasks = async () => {
      const tasksfromserver = await fetchtasks();
      settasks(tasksfromserver);
    };
    gettasks();
  }, []);
  const fetchtasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      headers: { auth_token: localStorage.getItem("auth_token") },
    });
    const data = await res.json();
    return data;
  };

  const fetchtask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const addtask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        auth_token: localStorage.getItem("auth_token"),
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    settasks([...tasks, data]);
  };
  const updatetask = async (id) => {};
  const deleteTask = async (id) => {
    settasks(tasks.filter((task) => task._id !== id));
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
  };

  const toggleremainder = async (id) => {
    const tasktoggle = await fetchtask(id);
    const updatedtask = { ...tasktoggle, reminder: !tasktoggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedtask),
    });
    const data = await res.json();
    settasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  const loginfun = async (cred) => {
    const res = await fetch(`http://localhost:5000/login/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cred),
    });
    const data = await res.json();
    return data;
  };
  const signupfun = async (cred) => {
    const res = await fetch(`http://localhost:5000/login/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cred),
    });
    const data = await res.json();
    return data;
  };
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setshowaddtask(!showaddtask)}
          showAdd={showaddtask}
        />
        <Routes>
          <Route path="/" element={<Login onlogin={loginfun} />} />
          <Route path="/signup" element={<Signup onsignup={signupfun} />} />
          <Route
            path="/tasks"
            element={
              <>
                {/* {showaddtask && <Addtask onadd={addtask} />} */}

                {showaddtask ? (
                  <Addtask onadd={addtask} />
                ) : (
                  <Tasks
                    tasks={tasks}
                    ondelete={deleteTask}
                    ontoggle={toggleremainder}
                  />
                )}
                {/* {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    ondelete={deleteTask}
                    ontoggle={toggleremainder}
                  />
                ) : (
                  "No Tasks to show"
                )} */}
              </>
            }
          />
          <Route
            path="/addtasks"
            element={
              <>
                {showaddtask && <Addtask onadd={addtask} />}
                {/* {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    ondelete={deleteTask}
                    ontoggle={toggleremainder}
                  />
                ) : (
                  "No Tasks to show"
                )} */}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

Header.defaultProps = {
  title: "Doctors Dashboard",
};

Header.prototype = {
  title: PropTypes.string.isRequired,
};
export default App;
