import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";

import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import { MyProductsPage } from "./pages/MyProductPage.tsx";
import { PreferencesPage } from "./pages/PreferencesPage.tsx";
import { CreateProductPage } from "./pages/CreateProductPage";
import { EditProductPage } from "./pages/EditProductPage";

import { AdminProductsPage } from "./pages/AdminProductsPage";
import { AdminPendingProductsPage } from "./pages/AdminPendingProductsPage";

import './App.css';
import Navbar from './components/Navbar';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import { ProtectedUserRoute } from "./components/ProtectedUserRoute.tsx";

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

        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        <Route
          path="/my-products"
          element={<ProtectedUserRoute component={<MyProductsPage />} />}
        />

        <Route
          path="/my-products/create"
          element={<ProtectedUserRoute component={<CreateProductPage />} />}
        />

        <Route
          path="/my-products/edit/:id"
          element={<ProtectedUserRoute component={<EditProductPage />} />}
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
          path="/admin/products/create"
          element={<ProtectedAdminRoute component={<CreateProductPage />} />}
        />

        <Route
          path="/admin/products/edit/:id"
          element={<ProtectedAdminRoute component={<EditProductPage />} />}
        />

        <Route
          path="/admin/products"
          element={<ProtectedAdminRoute component={<AdminProductsPage />} />}
        />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;