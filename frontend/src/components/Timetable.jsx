import React from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Timetable({ classes, onEdit, onDelete }) {
  // Build day map
  const dayMap = DAYS.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  classes.forEach((c) => {
    c.days.forEach((day) => {
      if (dayMap[day]) dayMap[day].push(c);
    });
  });

  // Sort classes in each day by startTime
  DAYS.forEach((day) => {
    dayMap[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {DAYS.map((day) => (
          <div 
            key={day} 
            className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            {/* Day Header */}
            <div className="bg-white dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-sm">
                {day}
              </h3>
            </div>
            
            {/* Classes List */}
            <div className="p-2 flex-1 flex flex-col gap-3">
              {dayMap[day].length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-8">
                  <p className="text-sm text-gray-400 italic">No classes</p>
                </div>
              ) : (
                dayMap[day].map((c) => (
                  <div
                    key={`${c.id}-${day}`}
                    className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-600 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow relative group"
                  >
                    {/* Class Name */}
                    <div className="pr-6"> {/* Padding right for optional absolute positioned buttons in future */}
                      <p className="font-bold text-gray-800 dark:text-white leading-snug">
                        {c.name}
                      </p>
                    </div>

                    {/* Time & Venue */}
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                        ⏰ {c.startTime} – {c.endTime}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        📍 {c.venue}
                      </p>
                    </div>

                    {/* Notes & Materials */}
                    {(c.notes || c.materials) && (
                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        {c.notes && <p><span className="font-semibold">Note:</span> {c.notes}</p>}
                        {c.materials && (
                          <p>
                            <span className="font-semibold">Material: </span>
                            <a 
                              href={c.materials} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-600 hover:underline break-all"
                            >
                              Link
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="mt-3 flex gap-2 justify-end opacity-90">
                      <button 
                        onClick={() => onEdit(c)}
                        className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(c.id)}
                        className="text-xs px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;