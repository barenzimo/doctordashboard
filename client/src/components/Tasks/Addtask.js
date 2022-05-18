import { useState } from "react";
const Addtask = ({ onadd }) => {
  const [text, settext] = useState("");
  const [day, setday] = useState("");
  const [reminder, setreminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a task");
      return;
    }
    onadd({ text, day, reminder });
    settext("");
    setday("");
    setreminder(false);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Doctor</label>
        <select
          value={text}
          type="text"
          onChange={(e) => settext(e.target.value)}
        >
          <option value="Doctor X">Doctor X</option>
          <option value="Doctor Y">Doctor Y</option>
          <option value="Doctor Z">Doctor Z</option>
        </select>
        <input hidden type="text" value={text} />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input
          type="text"
          placeholder="Date & Time"
          value={day}
          onChange={(e) => setday(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>reaminder</label>
        <input
          type="checkbox"
          value={reminder}
          checked={reminder}
          onChange={(e) => setreminder(e.currentTarget.checked)}
        />
      </div>

      <input className="btn btn-block" type="submit" value="Save Appointment" />
    </form>
  );
};

export default Addtask;
