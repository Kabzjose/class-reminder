const STORAGE_KEY = "class-reminder-classes";

export const getClasses = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveClass = (newClass) => {
  const classes = getClasses();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...classes, newClass])
  );
};

export const setClasses = (classes) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(classes)
  );
};
