import { DAYS } from "./days";
import { getClasses, setClasses } from "./storage";

export const startReminderEngine = () => {
  setInterval(() => {
    const now = new Date();
    const today = DAYS[now.getDay()];
    const currentTime = now.getTime();
    const todayDate = now.toISOString().split("T")[0];

    const classes = getClasses();
    let updated = false;

    classes.forEach((c) => {
      if (!c.days.includes(today)) return;

      if (c.lastNotifiedDate === todayDate) return;

      const [hours, minutes] = c.startTime.split(":");
      const classStart = new Date(now);
      classStart.setHours(hours, minutes, 0, 0);

      const reminderTime =
        classStart.getTime() - c.reminderMinutes * 60 * 1000;

      if (currentTime >= reminderTime && currentTime < classStart.getTime()) {
        new Notification("Class Reminder", {
          body: `${c.name} at ${c.startTime} in ${c.venue}`,
        });

        c.lastNotifiedDate = todayDate;
        updated = true;
      }
    });

    if (updated) {
      setClasses(classes);
    }
  }, 60 * 1000); // check every minute
};
