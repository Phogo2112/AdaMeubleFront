import React, { useState } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import HomePage from "./pages/HomePage.js";

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (isAuthenticated) {
    return <HomePage goToLogin={() => setShowRegister(false)} />;
  }

  return showRegister ? (
    <RegisterPage switchToLogin={() => setShowRegister(false)} />
  ) : (
    <LoginPage switchToRegister={() => setShowRegister(true)} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
