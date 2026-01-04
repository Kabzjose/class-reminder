import React from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", ];

function Timetable({ classes, onEdit, onDelete }) {
  // Build day map
  const dayMap = DAYS.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  classes.forEach((c) => {
    c.days.forEach((day) => {
      if (dayMap[day]) dayMap[day].push(c);
    });
  });

  // Sort classes in each day by startTime
  DAYS.forEach((day) => {
    dayMap[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
      {DAYS.map((day) => (
        <div key={day} style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}>
          <h3 style={{ textAlign: "center", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>{day}</h3>
          
          {dayMap[day].length === 0 ? (
            <p style={{ fontStyle: "italic", textAlign: "center" }}>No classes</p>
          ) : (
            dayMap[day].map((c) => (
              <div
                key={`${c.id}-${day}`}
                style={{
                  border: "1px solid #aaa",
                  borderRadius: "4px",
                  padding: "6px",
                  marginTop: "8px",
                  backgroundColor: "#f0f8ff",
                }}
              >
                <p><strong>{c.name}</strong></p>
                <p>{c.startTime} – {c.endTime}</p>
                <p>Venue: {c.venue}</p>

                {c.notes && <p><strong>Notes:</strong> {c.notes}</p>}
                {c.materials && (
                  <p>
                    <strong>Materials:</strong>{" "}
                    <a href={c.materials} target="_blank" rel="noopener noreferrer">Link</a>
                  </p>
                )}

                <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                  <button onClick={() => onEdit(c)}>Edit</button>
                  <button onClick={() => onDelete(c.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default Timetable;
