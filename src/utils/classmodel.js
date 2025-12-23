export const createClass = () => ({
  id: crypto.randomUUID(),
  name: "",
  days: [],              // ["Monday", "Wednesday"]
  startTime: "",         // "08:00"
  endTime: "",           // "10:00"
  venue: "",
  reminderMinutes: 30,   // integer
  lastNotifiedDate: null // "YYYY-MM-DD"
});
