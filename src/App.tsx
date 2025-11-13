
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminProductsPage} from "./pages/AdminProductsPage";
import './App.css'
import Navbar from './components/Navbar';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import { CreateProductPage } from "./pages/CreateProductPage";



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
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/admin/products/new"
                    element={<ProtectedAdminRoute component={<CreateProductPage />} />}
                />

                {/* Routes conditionnelles selon l'état de connexion */}
                {!user ? (
                    <Route path="*" element={<Navigate to="/" />} />
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
                <Route
                    path="/admin/products"
                    element={<ProtectedAdminRoute component={<AdminProductsPage />} />}
                />
            </Routes>
        </>
    );
}

export default App;
