import { useEffect, useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function ClassForm({ onSave, onUpdate, editingClass }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    startTime: "",
    endTime: "",
    days: [],
    venue: "",
    reminderMinutes: 10,
    lastNotifiedDate: null,
    notes: "",
    materials: ""
  });

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
        : [...prev.days, day],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.startTime || !form.days.length) {
      alert("Please fill all required fields (Name, Time, Days).");
      return;
    }

    const payload = editingClass 
      ? form 
      : { ...form, id: crypto.randomUUID(), lastNotifiedDate: null };

    if (editingClass) {
      onUpdate(payload);
    } else {
      onSave(payload);
    }

    // Reset form
    setForm({
      id: null,
      name: "",
      startTime: "",
      endTime: "",
      days: [],
      venue: "",
      reminderMinutes: 10,
      lastNotifiedDate: null,
      notes: "",
      materials: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Form Header removed (handled by parent container title in App.js) or kept subtle */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
          {editingClass ? "Edit Class Details" : "Add New Class"}
        </h3>
        {editingClass && (
           <span className="text-xs text-orange-500 font-semibold">Editing Mode</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Name */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Name *</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Data Structures"
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time *</label>
          <input
            type="time"
            name="startTime"
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.startTime}
            onChange={handleChange}
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
          <input
            type="time"
            name="endTime"
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.endTime}
            onChange={handleChange}
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="e.g. Room 304"
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.venue}
            onChange={handleChange}
          />
        </div>

        {/* Reminder Minutes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reminder (mins)</label>
          <input
            type="number"
            name="reminderMinutes"
            min="1"
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.reminderMinutes}
            onChange={handleChange}
          />
        </div>

        {/* Materials Link */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Materials Link (Optional)</label>
          <input
            type="url"
            name="materials"
            placeholder="https://..."
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.materials}
            onChange={handleChange}
          />
        </div>

        {/* Notes */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
          <textarea
            name="notes"
            rows="3"
            placeholder="Any specific details..."
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            value={form.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Days Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Days *</label>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => {
            const isSelected = form.days.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 
                  ${isSelected 
                    ? "bg-blue-600 border-blue-600 text-white shadow-md hover:bg-blue-700" 
                    : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-0.5 
          ${editingClass 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          }`}
      >
        {editingClass ? "💾 Save Changes" : "➕ Add Class"}
      </button>

    </form>
  );
}

export default ClassForm;