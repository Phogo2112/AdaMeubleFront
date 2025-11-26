import { useState, useEffect } from 'react';
import { getMyProducts, deleteProduct } from '../service/ProductService';
import { Product } from '../models/Product';
import '../styles/AdminProductsPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export function MyProductsPage() {
  const [productsState, setProductsState] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    loadMyProducts();
  }, []);

  const loadMyProducts = async () => {
    try {
      setLoading(true);
      const data = await getMyProducts();
      console.log("getMyProducts() retourne :", data);
      setProductsState(data);
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(err.response?.data?.message || "Erreur lors du chargement de vos produits");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    console.log('🗑️ Suppression du produit ID:', id);
    console.log('👤 User connecté:', user);

    try {
      await deleteProduct(id);
      console.log('✅ Suppression réussie !');
      loadMyProducts();
    } catch (err: any) {
      console.error("❌ Erreur:", err);
      console.error("❌ Response:", err.response?.data);
      console.error("❌ Status:", err.response?.status);
      alert(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="admin-products-container">
        <div className="loading-message">Chargement de vos produits...</div>
      </div>
    );
  }

  return (
    <div className="admin-products-container">
      <div className="admin-products-header">
        <h1>Mes produits en vente</h1>
        <button
          className="btn-create"
          onClick={() => navigate('/my-products/create')}
        >
          + Proposer un meuble
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {productsState.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Vous n'avez pas encore de produits en vente.
          </p>
          <button
            className="btn-create"
            onClick={() => navigate('/my-products/create')}
          >
            Mettre votre premier produit en vente
          </button>
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
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productsState) && productsState.length > 0 ? (
              productsState.map((product) => (
                <tr key={product.id}>
                  <td className="col-id">{product.id}</td>
                  <td className="col-sku">{product.sku}</td>
                  <td className="col-category">
                    {product.category ? product.category.name : 'N/A'}
                  </td>
                  <td className="col-name">{product.name}</td>
                  <td className="col-price">{product.price}€</td>
                  <td className="col-status">
                    <span className={`status-badge status-${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="col-actions">
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => navigate(`/my-products/edit/${product.id}`)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7}>Aucun produit trouvé</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}