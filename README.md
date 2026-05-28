# Smart Hospital Queue & Appointment Management System

A production-ready hospital queue management web application built with **React.js** and **Firebase Firestore** for CSP final-year project presentations and community health center deployments.

## Features

- **Landing Page** — Hero section, system overview, SDG goals, about project, innovation & community impact
- **Patient Registration** — Form validation, auto token generation, Firestore save, QR code success modal
- **Live Queue Display** — Real-time `onSnapshot` updates, emergency highlighting, search/filter
- **Admin Dashboard** — Login, call next patient, mark complete, clear completed, statistics
- **Token Display Screen** — Large animated current token for waiting room TVs
- **Dark Mode** — Theme toggle with persistence
- **Toast Notifications** — Success/error feedback throughout the app

## Tech Stack

- React 19 (functional components + hooks)
- JavaScript
- Firebase Firestore
- React Router
- QRCode.react
- Plain CSS (modular component styles)

## Project Structure

```
src/
├── assets/
├── components/
│   ├── AdminDashboard.js
│   ├── DarkModeToggle.js
│   ├── Footer.js
│   ├── HeroSection.js
│   ├── LoadingSpinner.js
│   ├── Navbar.js
│   ├── PatientForm.js
│   ├── QueueDisplay.js
│   ├── SearchBar.js
│   ├── StatisticsCards.js
│   ├── SuccessModal.js
│   ├── Toast.js
│   └── TokenCard.js
├── context/
│   ├── ThemeContext.js
│   └── ToastContext.js
├── firebase/
│   ├── firebaseConfig.js    ← Your existing credentials (do not commit secrets publicly)
│   └── firestoreService.js
├── hooks/
│   └── usePatients.js
├── pages/
│   ├── AdminPage.js
│   ├── HomePage.js
│   ├── QueuePage.js
│   ├── RegisterPage.js
│   └── TokenDisplayPage.js
├── styles/
│   ├── global.css
│   └── variables.css
└── utils/
    ├── constants.js
    ├── queueHelpers.js
    ├── tokenGenerator.js
    └── validation.js
```

## Firebase Setup

### 1. Firestore Database

1. Open [Firebase Console](https://console.firebase.google.com/) → your project `hospital-queue-system-1b02e`
2. Go to **Build → Firestore Database**
3. Click **Create database** → Start in **test mode** (for development) or production mode with rules below
4. Collection name used by the app: **`patients`**

### 2. Firestore Security Rules

Deploy the included rules (development — open read/write):

```bash
firebase deploy --only firestore:rules
```

For production, replace open rules with Firebase Authentication checks.

### 3. Firestore Index

The app queries patients ordered by `createdAt`. Firestore may prompt you to create a composite index when you first run the app — click the link in the browser console error to auto-create it.

### 4. Collection Schema (`patients`)

| Field | Type | Description |
|-------|------|-------------|
| patientName | string | Full name |
| age | number | Patient age |
| gender | string | Male / Female / Other |
| mobile | string | 10-digit number |
| symptoms | string | Symptom description |
| priorityType | string | `Normal` or `Emergency` |
| token | string | e.g. `T-20260528-001` |
| status | string | `waiting`, `serving`, `completed` |
| createdAt | timestamp | Server timestamp |
| appointmentTimestamp | string | ISO date string |

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Login (Demo)

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

## Deployment (Firebase Hosting)

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Build the React app

```bash
npm run build
```

### 3. Deploy

```bash
firebase deploy
```

Or deploy hosting only:

```bash
firebase deploy --only hosting
```

Your app will be live at: `https://hospital-queue-system-1b02e.web.app`

## Screenshots & Demo Tips

1. **Home** — Show SDG section and project overview for presentation
2. **Register** — Register 2–3 patients (one Emergency) to demonstrate priority
3. **Admin** — Call next patient, show statistics updating
4. **Token Display** — Full-screen on a second monitor for "waiting room" effect
5. **Live Queue** — Show real-time updates when admin calls patients

## SDG Alignment

- **SDG 3** — Good Health and Well-Being
- **SDG 9** — Industry, Innovation and Infrastructure
- **SDG 16** — Peace, Justice and Strong Institutions

## License

Educational / CSP Project Use
