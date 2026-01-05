import { useEffect, useState } from "react";
import ClassForm from "./components/ClassForm";
import Timetable from "./components/Timetable";
import { getClasses, saveClass } from "./utils/storage";
import { requestNotificationPermission } from "./utils/notification";
import { startReminderEngine } from "./utils/reminderEngine"
import { deleteClass, updateClass } from "./utils/storage";


function App() {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("All");

  useEffect(() => {
    setClasses(getClasses());

     requestNotificationPermission().then((granted) => {
      if (granted) {
        startReminderEngine();
      } else {
        alert("Notifications are disabled. Reminders will not work.");
      }
    });
  }, []);

  const handleSave = (classData) => {
    saveClass(classData);
    setClasses(getClasses());
  };

  const handleDelete = (id) => {
  deleteClass(id);
  setClasses(getClasses());
};

 const handleEdit = (classData) => {
    setEditingClass(classData);
  };

  const handleUpdate = (updatedClass) => {
    updateClass(updatedClass);
    setClasses(getClasses());
    setEditingClass(null);
  };
  //filtering logic
  const filteredClasses = classes.filter((c) => {
  const matchesSearch =
    c.name.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesDay =
    filterDay === "All" || c.days.includes(filterDay);

  return matchesSearch && matchesDay;
});

//Next Class + Countdown
const getTodayName = () => {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
};

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const now = new Date();
const today = getTodayName();
const currentMinutes = now.getHours() * 60 + now.getMinutes();

const upcomingClasses = classes
  .filter((c) => c.days.includes(today))
  .map((c) => ({
    ...c,
    startMinutes: timeToMinutes(c.startTime),
  }))
  .filter((c) => c.startMinutes > currentMinutes)
  .sort((a, b) => a.startMinutes - b.startMinutes);

const nextClass = upcomingClasses[0] || null;
let countdown = null;

if (nextClass) {
  const diff = nextClass.startMinutes - currentMinutes;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  countdown = `${hours}h ${minutes}m`;
}

  return (
    <div>
      <h1>Class Reminder App</h1>
       <ClassForm
        onSave={handleSave}
        onUpdate={handleUpdate}
        editingClass={editingClass}
      />
    <input
  type="text"
  placeholder="Search by class name"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<select
  value={filterDay}
  onChange={(e) => setFilterDay(e.target.value)}
>
  <option value="All">All Days</option>
  <option value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
</select>
      {nextClass ? (
  <div style={{ padding: "12px", border: "1px solid #ccc", marginBottom: "16px" }}>
    <h3>Next Class</h3>
    <p><strong>{nextClass.name}</strong></p>
    <p>{nextClass.startTime} – {nextClass.endTime}</p>
    <p>Venue: {nextClass.venue}</p>
    <p>Starts in: {countdown}</p>
  </div>
) : (
  <p>No more classes today</p>
)}

      <Timetable
        classes={filteredClasses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
