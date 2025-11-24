import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingProducts } from '../service/ProductService';
import { Product } from '../models/Product';
import '../styles/AdminProductsPage.css';

export function AdminPendingProductsPage() {
  const navigate = useNavigate();
  const [productsState, setProductsState] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPendingProducts();
  }, []);

  const loadPendingProducts = async () => {
    try {
      setLoading(true);
      const data = await getPendingProducts();
      setProductsState(data);
      setError(null);
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(err.response?.data?.message || "Erreur lors du chargement des produits en attente");
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id: number, name: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir VALIDER le produit "${name}" ?`)) {
      return;
    }

    console.log('✅ [ADMIN] Validation du produit ID:', id);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8080/api/admin/products/${id}/validate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la validation');
      }

      console.log('✅ [ADMIN] Produit validé avec succès');

      loadPendingProducts();

      alert(`✅ Produit "${name}" validé et mis en ligne !`);

    } catch (err: any) {
      console.error("❌ Erreur validation:", err);
      alert("Erreur lors de la validation");
    }
  };

  const handleReject = async (id: number, name: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir REFUSER le produit "${name}" ?`)) {
      return;
    }

    console.log('❌ [ADMIN] Refus du produit ID:', id);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8080/api/admin/products/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du refus');
      }

      console.log('✅ [ADMIN] Produit refusé');

      loadPendingProducts();

      alert(`❌ Produit "${name}" refusé.`);

    } catch (err: any) {
      console.error("❌ Erreur refus:", err);
      alert("Erreur lors du refus");
    }
  };

  if (loading) {
    return (
      <div className="admin-products-container">
        <div className="loading-message">Chargement des produits en attente...</div>
      </div>
    );
  }

  return (
    <div className="admin-products-container">
      <div className="admin-products-header">
        <h1>🕐 Produits en attente de validation</h1>
        <button
          className="btn-back"
          onClick={() => navigate('/admin/products')}
          style={{
            backgroundColor: '#95a5a6',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Retour
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {productsState.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: '#27ae60', marginBottom: '10px' }}>
            Aucun produit en attente !
          </h2>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Les nouveaux produits proposés par les utilisateurs apparaîtront ici.
          </p>
        </div>
      ) : (
        <table className="admin-products-table">
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-sku">SKU</th>
              <th className="col-category">Catégorie</th>
              <th className="col-name">Nom</th>
              <th className="col-price">Prix</th>
              <th className="col-status">Status</th>
              <th className="col-actions" style={{ width: '220px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsState.map((product) => (
              <tr key={product.id}>
                <td className="col-id">{product.id}</td>
                <td className="col-sku">{product.sku}</td>
                <td className="col-category">
                  {product.category ? product.category.name : 'N/A'}
                </td>
                <td className="col-name">{product.name}</td>
                <td className="col-price">{product.price}€</td>
                <td className="col-status">
                  <span className="status-badge status-pending">
                    ⏳ {product.status}
                  </span>
                </td>
                <td className="col-actions">
                  <div className="action-buttons" style={{ gap: '8px' }}>
                    <button
                      className="btn-action btn-validate"
                      onClick={() => handleValidate(product.id, product.name)}
                      title="Valider et mettre en ligne"
                    >
                      ✅ Valider
                    </button>
                    <button
                      className="btn-action btn-reject"
                      onClick={() => handleReject(product.id, product.name)}
                      title="Refuser ce produit"
                    >
                      ❌ Refuser
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}