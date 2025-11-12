// @ts-nocheck
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import './App.css'
import Navbar from './components/Navbar';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Content />
      </Router>
    </AuthProvider>
  );
}

function Content() {
    const { user, loading } = useAuth();

    if (loading) return <p>Chargement...</p>;

    return (
        <>
            <Navbar />
            <Routes>
                {/* Routes PUBLIQUES - accessibles par tous */}
                <Route path="/" element={<HomePage />} />  {/* ← Déplacée ici */}
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Routes conditionnelles selon l'état de connexion */}
                {!user ? (
                    <Route path="*" element={<Navigate to="/" />} />
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
            </Routes>
        </>
    );
}

export default App;
