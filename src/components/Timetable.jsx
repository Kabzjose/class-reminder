import { DAYS } from "../utils/days";

function Timetable({ classes, onEdit, onDelete }) {
  return (
    <div>
      <h2>Your Timetable</h2>

      {classes.length === 0 && <p>No classes added.</p>}

      {classes.map((c) => (
        <div key={c.id} style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}>
          <p><strong>{c.name}</strong></p>
          <p>{c.days.join(", ")} | {c.startTime} – {c.endTime}</p>
          <p>Venue: {c.venue}</p>
          <p>Reminder: {c.reminderMinutes} minutes before</p>

          <button onClick={() => onEdit(c)}>Edit</button>
          <button onClick={() => onDelete(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Timetable;
