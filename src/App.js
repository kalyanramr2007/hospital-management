import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import QueuePage from "./pages/QueuePage";
import TokenDisplayPage from "./pages/TokenDisplayPage";
import AdminPage from "./pages/AdminPage";
import "./styles/variables.css";
import "./styles/global.css";
import "./App.css";

function AppLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/token-display";

  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/token-display" element={<TokenDisplayPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
