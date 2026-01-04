import { useEffect, useState } from "react";
import ClassForm from "./components/ClassForm";
import Timetable from "./components/Timetable";
import { getClasses, saveClass } from "./utils/storage";

function App() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setClasses(getClasses());
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
