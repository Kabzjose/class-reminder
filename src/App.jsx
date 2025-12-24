import { useState,useEffect } from "react";
import ClassForm from "./components/ClassForm";
import {getClasses,saveClass} from "./utils/storage";

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

      <h2>Saved Classes</h2>
      <ul>
        {classes.map((c, index) => (
          <li key={index}>
            <strong>{c.name}</strong> - {c.startTime} to {c.endTime} on {c.days.join(", ")}
          </li>
        ))}
        <li ></li>
      </ul>
    </div>
  );
}

export default App;
