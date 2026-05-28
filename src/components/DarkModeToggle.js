import { useTheme } from "../context/ThemeContext";
import "./DarkModeToggle.css";

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Light mode" : "Dark mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
