# Smart Hospital Queue & Appointment Management System

A production-ready Hospital Queue and Appointment Management System built using **React.js** and **Firebase Firestore**. The project is designed to streamline patient registration, token generation, queue monitoring, and appointment management for hospitals, clinics, and community health centers.

---

## 🌐 Live Demo

**Application URL:**
https://hospital-queue-managemen-93f2c.web.app/

---

## 📌 Project Overview

Traditional hospital queue systems often lead to long waiting times, overcrowding, and inefficient patient management. This project provides a digital solution that enables real-time queue monitoring, automated token generation, appointment tracking, and administrative control.

The system improves hospital efficiency while enhancing the patient experience through transparency and reduced waiting time.

---

## 🎯 Objectives

* Digitize patient registration and queue management.
* Reduce patient waiting time.
* Provide real-time queue tracking.
* Prioritize emergency cases.
* Improve hospital workflow efficiency.
* Support community healthcare initiatives.

---

## ✨ Key Features

### 🏥 Patient Registration

* Simple registration form
* Input validation
* Automatic token generation
* Appointment timestamp generation
* QR Code generation for registered patients

### 📋 Live Queue Monitoring

* Real-time queue updates using Firestore
* Current serving token display
* Queue status tracking
* Search and filter functionality
* Emergency patient highlighting

### 👨‍⚕️ Admin Dashboard

* Secure admin login
* Call next patient
* Mark patient as completed
* Clear completed records
* Queue statistics dashboard

### 📺 Token Display Screen

* Large display suitable for waiting rooms
* Real-time token updates
* Full-screen monitoring mode

### 🌙 User Experience

* Dark Mode support
* Responsive design
* Toast notifications
* Modern UI components
* Mobile-friendly interface

---

## 🛠 Technology Stack

| Technology         | Purpose              |
| ------------------ | -------------------- |
| React.js           | Frontend Development |
| JavaScript         | Application Logic    |
| Firebase Firestore | Cloud Database       |
| Firebase Hosting   | Deployment           |
| React Router       | Navigation           |
| QRCode.react       | QR Generation        |
| CSS                | Styling              |

---

## 📂 Project Structure

```text
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
│   ├── firebaseConfig.js
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

---

## 🔥 Firebase Configuration

### Firestore Database

1. Open Firebase Console.
2. Create a Firestore Database.
3. Start in Test Mode (Development).
4. Collection used:

```text
patients
```

---

## 📊 Firestore Collection Schema

| Field                | Type      | Description               |
| -------------------- | --------- | ------------------------- |
| patientName          | string    | Patient Full Name         |
| age                  | number    | Patient Age               |
| gender               | string    | Male/Female/Other         |
| mobile               | string    | Mobile Number             |
| symptoms             | string    | Symptoms Description      |
| priorityType         | string    | Normal/Emergency          |
| token                | string    | Generated Token           |
| status               | string    | waiting/serving/completed |
| createdAt            | timestamp | Registration Time         |
| appointmentTimestamp | string    | Appointment Date          |

---

## 🔐 Demo Login Credentials

| Field    | Value    |
| -------- | -------- |
| Username | admin    |
| Password | admin123 |

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone <your-github-repository-url>
cd hospital-queue-system
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

Application runs at:

```text
http://localhost:3000
```

---

## 🚀 Deployment

### Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### Build Project

```bash
npm run build
```

### Deploy Application

```bash
firebase deploy
```

Or deploy hosting only:

```bash
firebase deploy --only hosting
```

### Hosted URL

https://hospital-queue-managemen-93f2c.web.app/

---

## 🧪 Demonstration Flow

### Step 1

Open Home Page and explain:

* Project Overview
* SDG Alignment
* Community Impact

### Step 2

Register 2–3 patients:

* Normal Patient
* Emergency Patient

### Step 3

Show generated tokens and QR codes.

### Step 4

Open Live Queue Display and demonstrate:

* Real-time updates
* Search and filtering

### Step 5

Login as Admin and:

* Call next patient
* Mark completed
* Show queue statistics

### Step 6

Open Token Display Screen on a second monitor or browser tab.

---

## 🌍 Sustainable Development Goals (SDGs)

### SDG 3 – Good Health and Well-Being

Improves healthcare service delivery and patient management.

### SDG 9 – Industry, Innovation and Infrastructure

Promotes digital transformation in healthcare systems.

### SDG 16 – Peace, Justice and Strong Institutions

Enhances transparency and accountability in hospital operations.

---

## 💡 Innovation & Community Impact

* Reduces overcrowding in hospitals.
* Improves patient satisfaction.
* Enables transparent queue management.
* Supports healthcare digitization initiatives.
* Suitable for government hospitals, clinics, and community health centers.

---

## 📈 Future Enhancements

* SMS notifications for patients.
* Email appointment reminders.
* Firebase Authentication for secure admin access.
* Doctor-specific queues.
* Multi-hospital support.
* Patient history records.
* AI-powered waiting time prediction.

---

## 👨‍💻 Developed For

Community Service Project (CSP)

Final Year Project Submission

Department of Computer Science & Engineering

Academic Year 2025–2026

---

## 📄 License

This project is developed for educational and academic purposes.

Free to use for CSP demonstrations, research, and learning.
