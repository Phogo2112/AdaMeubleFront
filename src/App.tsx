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
import { AdminProductsPage } from "./pages/AdminProductsPage";
import { CreateProductPage } from "./pages/CreateProductPage";
import { EditProductPage } from "./pages/EditProductPage";
import { ProposeProductPage } from "./pages/ProposeProductPage";
import './App.css';
import Navbar from './components/Navbar';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import { ProtectedUserRoute } from "./components/ProtectedUserRoute.tsx";
import { MyProductsPage } from "./pages/MyProductPage.tsx";
import { AdminPendingProductsPage } from "./pages/AdminPendingProductsPage";
import { PreferencesPage } from "./pages/PreferencesPage";

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
        {/* ========================================
                    ROUTES PUBLIQUES - accessibles par tous
                    ======================================== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ========================================
                    ROUTES ADMIN PROTÉGÉES
                    ⚠️ IMPORTANT : Les routes spécifiques DOIVENT être AVANT les routes génériques !
                    ======================================== */}
        <Route
          path="/my-products"
          element={<ProtectedUserRoute component={<MyProductsPage />} />}
        />
        <Route
          path="/preferences"
          element={<ProtectedUserRoute component={<PreferencesPage />} />}
        />
        <Route
          path="/admin/products/pending"
          element={<ProtectedAdminRoute component={<AdminPendingProductsPage />} />}
        />

        <Route
          path="/preferences"
          element={<ProtectedUserRoute component={<PreferencesPage />} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedAdminRoute component={<AdminProductsPage />} />}
        />
        {/* Proposer un produit */}
        <Route
          path="/products/propose"
          element={<ProtectedUserRoute component={<ProposeProductPage />} />}
        />
        {/* Modifier MON produit */}
        <Route
          path="/my-products/edit/:id"
          element={<ProtectedUserRoute component={<EditProductPage />} />}
        />
        {/* Route pour CRÉER un produit */}
        <Route
          path="/admin/products/create"
          element={<ProtectedAdminRoute component={<CreateProductPage />} />}
        />

        {/* Route pour MODIFIER un produit (NOUVELLE !) */}
        <Route
          path="/admin/products/edit/:id"
          element={<ProtectedAdminRoute component={<EditProductPage />} />}
        />

        {/* Route pour LISTER les produits admin */}
        <Route
          path="/admin/products"
          element={<ProtectedAdminRoute component={<AdminProductsPage />} />}
        />

        {/* ========================================
                    ROUTE PAR DÉFAUT (404)
                    ⚠️ Doit être EN DERNIER !
                    ======================================== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;