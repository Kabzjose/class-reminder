import ClassForm from "./components/ClassForm";

function App() {
  const handleSave = (classData) => {
    console.log("Saved class:", classData);
  };

  return (
    <div>
      <h1>Class Reminder App</h1>
      <ClassForm onSave={handleSave} />
    </div>
  );
}

export default App;
