import { useState } from "react";
import { createClass } from "../utils/classmodel";
import { DAYS } from "../utils/days";

function ClassForm({ onSave }) {
  const [form, setForm] = useState(createClass());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

    if (!form.name || !form.startTime || !form.endTime || form.days.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    onSave(form);
    setForm(createClass());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Class</h2>

      <input
        type="text"
        name="name"
        placeholder="Course name"
        value={form.name}
        onChange={handleChange}
      />

      <div>
        {DAYS.map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              checked={form.days.includes(day)}
              onChange={() => handleDayToggle(day)}
            />
            {day}
          </label>
        ))}
      </div>

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
        type="number"
        name="reminderMinutes"
        value={form.reminderMinutes}
        onChange={handleChange}
        min="1"
      />

      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={form.venue}
        onChange={handleChange}
      />

      <button type="submit">Save Class</button>
    </form>
  );
}

export default ClassForm;
