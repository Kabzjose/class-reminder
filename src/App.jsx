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
  return (
    <div>
      <h1>Class Reminder App</h1>
       <ClassForm
        onSave={handleSave}
        onUpdate={handleUpdate}
        editingClass={editingClass}
      />

      <Timetable
        classes={classes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
