import { useEffect, useState } from "react";
import ClassForm from "./components/ClassForm";
import Timetable from "./components/Timetable";
import { getClasses, saveClass } from "./utils/storage";
import { requestNotificationPermission } from "./utils/notification";
import { startReminderEngine } from "./utils/reminderEngine"

function App() {
  const [classes, setClasses] = useState([]);

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

  return (
    <div>
      <h1>Class Reminder App</h1>
      <ClassForm onSave={handleSave} />
      <Timetable classes={classes} />
    </div>
  );
}

export default App;
