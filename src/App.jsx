import { useEffect, useState } from "react";
import ClassForm from "./components/ClassForm";
import Timetable from "./components/Timetable";
import { getClasses, saveClass, deleteClass, updateClass } from "./utils/storage";
import { requestNotificationPermission } from "./utils/notification";
import { startReminderEngine } from "./utils/reminderEngine";

function App() {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("All");
  
  // Dark mode state (defaults to true/dark)
  const [darkMode, setDarkMode] = useState(true);

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

  // Filtering logic
  const filteredClasses = classes.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = filterDay === "All" || c.days.includes(filterDay);
    return matchesSearch && matchesDay;
  });

  // Next Class + Countdown Logic
  const getTodayName = () => new Date().toLocaleDateString("en-US", { weekday: "long" });
  
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
    // Wrap entire app in darkMode logic
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-600">
              Class Reminder
            </h1>
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
          
          {/* Next Class Card (Highlighted) */}
          {nextClass ? (
            <div className="bg-linear-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.01] transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-100 mb-1">Up Next</h3>
                  <h2 className="text-3xl font-bold mb-2">{nextClass.name}</h2>
                  <div className="flex items-center gap-4 text-blue-50">
                    <p className="flex items-center gap-1">
                      <span>🕒</span> {nextClass.startTime} – {nextClass.endTime}
                    </p>
                    <p className="flex items-center gap-1">
                      <span>📍</span> {nextClass.venue}
                    </p>
                  </div>
                </div>
                <div className="text-right bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <p className="text-xs uppercase font-bold">Starts in</p>
                  <p className="text-2xl font-mono font-bold">{countdown}</p>
                </div>
              </div>
            </div>
          ) : (
             // Empty state for next class
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-500 dark:text-gray-400">🎉 No more classes for today!</p>
            </div>
          )}

          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Manage Classes</h3>
            <ClassForm
              onSave={handleSave}
              onUpdate={handleUpdate}
              editingClass={editingClass}
            />
          </div>

          {/* Search & Filter Section */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Search by class name..."
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer"
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
            >
              <option value="All">📅 All Days</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>

          {/* Timetable List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
             <Timetable
              classes={filteredClasses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;