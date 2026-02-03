# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available# Timetable App

A personal class timetable web app that helps students organize classes, track upcoming sessions, and avoid schedule confusion. Built with **React** and **Tailwind CSS**, the app focuses on clean state management, predictable logic, and real-world usability.

---

## Features

### Core Features

* Add classes with:

  * Course name
  * Days of the week (Monday–Friday)
  * Start and end time
  * Venue
  * Reminder time
* Weekly timetable displayed in a **day-based grid**
* Classes automatically **sorted by start time**
* Edit and delete classes

### Nice-to-Have Enhancements

* Search classes by name
* Filter classes by day
* "Next Class" panel with countdown
* Light / Dark theme toggle
* Export timetable as JSON
* Import timetable from JSON

---

## Tech Stack

* **Frontend:** React (functional components, hooks)
* **Backend:** Expressjs MongoDB, Node.js
* **Authentication:** JWT tokens bycrpt for hashing passwords
* **Styling:** Tailwind CSS
* **State Management:** React `useState`, derived state
* **Persistence:** Local component state (localStorage-ready)

---

## Project Structure

```
src/
├── components/
│   ├── ClassForm.jsx
│   ├── TimetableGrid.jsx
│   ├── NextClass.jsx (optional)
│
├── App.jsx
├── main.jsx
├── index.css
```

---

## Design Principles

* **Single source of truth:** `classes` state lives in `App.jsx`
* **Derived state only:** filtering, sorting, countdowns are never stored
* **Separation of concerns:**

  * App → logic & state
  * Components → presentation only
* **Predictable rendering:** no mutation of source state

---

## How Sorting Works

* Classes are grouped by day
* Each day's classes are sorted by `startTime` (HH:MM format)
* Sorting happens **before rendering**, never inside JSX

---

## Import / Export Format

Timetables are exported as JSON:

```json
[
  {
    "id": "uuid",
    "name": "Math",
    "days": ["Monday", "Wednesday"],
    "startTime": "10:00",
    "endTime": "11:00",
    "venue": "Room 101",
    "reminderMinutes": 10
  }
]
```

Only valid arrays are accepted during import.

---

## Known Limitations

* Notifications depend on browser support
* No backend (data is local only)
* Weekend classes are not supported by default

---

## Future Improvements

* LocalStorage persistence
* Class overlap detection
* Mobile-first layout
* Calendar (.ics) export
* Push notification support

---

## Why This Project Matters

This project emphasizes **software engineering fundamentals**, not just UI:

* Correct state ownership
* Clean data flow
* Logic before styling
* Incremental, testable features

It is suitable for learning, demos, and portfolio use.

---

## License

MIT License
:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
