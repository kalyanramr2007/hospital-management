export const APP_NAME = "Smart Hospital Queue & Appointment Management System";

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export const PRIORITY_TYPES = {
  NORMAL: "Normal",
  EMERGENCY: "Emergency",
};

export const PATIENT_STATUS = {
  WAITING: "waiting",
  SERVING: "serving",
  COMPLETED: "completed",
};

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

export const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/register", label: "Register" },
  { path: "/queue", label: "Live Queue" },
  { path: "/token-display", label: "Token Display" },
  { path: "/admin", label: "Admin" },
];

export const SDG_GOALS = [
  {
    id: 3,
    title: "Good Health and Well-Being",
    description:
      "Digital queue management reduces overcrowding and wait-time stress, improving access to timely healthcare for all patients.",
    icon: "🏥",
  },
  {
    id: 9,
    title: "Industry, Innovation and Infrastructure",
    description:
      "Cloud-based hospital queue systems modernize healthcare infrastructure with real-time data and efficient resource allocation.",
    icon: "⚙️",
  },
  {
    id: 16,
    title: "Peace, Justice and Strong Institutions",
    description:
      "Transparent, token-based queuing ensures fair treatment and orderly service delivery in public healthcare settings.",
    icon: "⚖️",
  },
];
