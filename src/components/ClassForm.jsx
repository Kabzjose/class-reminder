import { useEffect, useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function ClassForm({ onSave, onUpdate, editingClass }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    startTime: "",
    endTime: "",
    days: [],
    venue: "",
    reminderMinutes: 10,
    lastNotifiedDate: null
  });

  /**
   * When user clicks "Edit", we receive editingClass from App.jsx.
   * We COPY it into local state so we can safely modify inputs
   * without mutating global state directly.
   */
  useEffect(() => {
    if (editingClass) {
      setForm(editingClass);
    }
  }, [editingClass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setForm((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.startTime || !form.days.length) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingClass) {
      // EDIT mode: preserve id + lastNotifiedDate
      onUpdate(form);
    } else {
      // ADD mode: generate a stable ID
      onSave({
        ...form,
        id: crypto.randomUUID(),
        lastNotifiedDate: null
      });
    }

    // Reset form after submit
    setForm({
      id: null,
      name: "",
      startTime: "",
      endTime: "",
      days: [],
      venue: "",
      reminderMinutes: 10,
      lastNotifiedDate: null
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{editingClass ? "Edit Class" : "Add Class"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Course name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="time"
        name="startTime"
        value={form.startTime}
        onChange={handleChange}
      />

      <input
        type="time"
        name="endTime"
        value={form.endTime}
        onChange={handleChange}
      />

      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={form.venue}
        onChange={handleChange}
      />

      <input
        type="number"
        name="reminderMinutes"
        min="1"
        value={form.reminderMinutes}
        onChange={handleChange}
      />

      <div>
        <p>Select days:</p>
        {DAYS.map((day) => (
          <label key={day} style={{ marginRight: "8px" }}>
            <input
              type="checkbox"
              checked={form.days.includes(day)}
              onChange={() => handleDayToggle(day)}
            />
            {day}
          </label>
        ))}
      </div>

      <button type="submit">
        {editingClass ? "Update Class" : "Add Class"}
      </button>
    </form>
  );
}

export default ClassForm;
