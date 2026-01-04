import { DAYS } from "../utils/days";

function Timetable({ classes }) {
  return (
    <div>
      <h2>Weekly Timetable</h2>

      {DAYS.map((day) => {
        const dayClasses = classes.filter((c) =>
          c.days.includes(day)
        );

        if (dayClasses.length === 0) return null;

        return (
          <div key={day}>
            <h3>{day}</h3>
            <ul>
              {dayClasses.map((c) => (
                <li key={c.id}>
                  <strong>{c.name}</strong><br />
                  {c.startTime} – {c.endTime}<br />
                  {c.venue}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Timetable;
