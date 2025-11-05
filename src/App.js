import React, { useState } from "react";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      {showRegister ? (
        <RegisterPage switchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginPage switchToRegister={() => setShowRegister(true)} />
      )}
    </AuthProvider>
  );
}
