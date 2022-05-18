import { FaTimes, FaEdit } from "react-icons/fa";
const Task = ({ task, ondelete, ontoggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => ontoggle(task._id)}
    >
      <h3>
        {task.text}{" "}
        <div>
          <FaEdit
            style={{ color: "black", cursor: "pointer", marginRight: "30px" }}
          />
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => ondelete(task._id)}
          />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
