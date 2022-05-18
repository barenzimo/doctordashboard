import Task from "./Task";
const Tasks = ({ tasks, ondelete, ontoggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          ondelete={ondelete}
          ontoggle={ontoggle}
        />
      ))}
    </>
  );
};

export default Tasks;
