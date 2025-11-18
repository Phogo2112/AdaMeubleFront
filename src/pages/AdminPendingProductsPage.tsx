import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../models/Product';
import '../styles/AdminProductsPage.css'; // Réutilise le même CSS

export function AdminPendingProductsPage() {
  const navigate = useNavigate();
  const [productsState, setProductsState] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPendingProducts();
  }, []);

  // 🎭 FONCTION MOCKÉE : Charge les produits en attente
  const loadPendingProducts = async () => {
    try {
      setLoading(true);

      // 🎭 DONNÉES MOCKÉES (temporaires - à remplacer par l'API plus tard)
      const mockData: Product[] = [
        {
          id: 1,
          name: "Canapé vintage en cuir",
          description: "Magnifique canapé 3 places",
          price: 450,
          dimensions: "200x90x85 cm",
          imageUrl: "https://via.placeholder.com/250",
          status: "PENDING",
          sku: "SKU-12345",
          createdByUserId: 5,
          category: { id: 1, name: "Salon" },
          colors: [{ id: 1, name: "Marron" }],
          materials: [{ id: 1, name: "Cuir" }]
        },
        {
          id: 2,
          name: "Bureau en chêne massif",
          description: "Bureau avec 3 tiroirs",
          price: 280,
          dimensions: "140x70x75 cm",
          imageUrl: "https://via.placeholder.com/250",
          status: "PENDING",
          sku: "SKU-67890",
          createdByUserId: 7,
          category: { id: 3, name: "Bureau" },
          colors: [{ id: 2, name: "Chêne naturel" }],
          materials: [{ id: 2, name: "Chêne massif" }]
        },
        {
          id: 3,
          name: "Table basse scandinave",
          description: "Design épuré et moderne",
          price: 120,
          dimensions: "100x60x45 cm",
          imageUrl: "https://via.placeholder.com/250",
          status: "PENDING",
          sku: "SKU-11111",
          createdByUserId: 5,
          category: { id: 1, name: "Salon" },
          colors: [{ id: 3, name: "Blanc" }],
          materials: [{ id: 3, name: "MDF" }]
        }
      ];

      // Simule un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      setProductsState(mockData);
      setError(null);
    } catch (err: any) {
      console.error("Erreur:", err);
      setError("Erreur lors du chargement des produits en attente");
    } finally {
      setLoading(false);
    }
  };

  // 🎭 FONCTION MOCKÉE : Valider un produit
  const handleValidate = async (id: number, name: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir VALIDER le produit "${name}" ?`)) {
      return;
    }

    console.log('✅ [MOCK] Validation du produit ID:', id);

    try {
      // 🎭 SIMULATION : Appel API futur
      // await api.put(`/api/products/${id}/validate`);

      // Pour l'instant, on retire juste le produit de la liste
      await new Promise(resolve => setTimeout(resolve, 300)); // Simule l'appel réseau

      setProductsState(productsState.filter(p => p.id !== id));
      alert(`✅ Produit "${name}" validé avec succès !`);

    } catch (err: any) {
      console.error("Erreur validation:", err);
      alert("Erreur lors de la validation");
    }
  };

  // 🎭 FONCTION MOCKÉE : Refuser un produit
  const handleReject = async (id: number, name: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir REFUSER le produit "${name}" ?`)) {
      return;
    }

    console.log('❌ [MOCK] Refus du produit ID:', id);

    try {
      // 🎭 SIMULATION : Appel API futur
      // await api.put(`/api/products/${id}/reject`);

      // Pour l'instant, on retire juste le produit de la liste
      await new Promise(resolve => setTimeout(resolve, 300)); // Simule l'appel réseau

      setProductsState(productsState.filter(p => p.id !== id));
      alert(`❌ Produit "${name}" refusé.`);

    } catch (err: any) {
      console.error("Erreur refus:", err);
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
        <h1>Produits en attente de validation</h1>
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
          color: '#666',
          fontSize: '18px'
        }}>
          <p>✅ Aucun produit en attente de validation !</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
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
              <th className="col-actions" style={{ width: '200px' }}>Actions</th>
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
                    {product.status}
                  </span>
                </td>
                <td className="col-actions">
                  <div className="action-buttons">
                    <button
                      className="btn-action btn-validate"
                      onClick={() => handleValidate(product.id, product.name)}
                      style={{
                        backgroundColor: '#27ae60',
                        color: 'white'
                      }}
                    >
                      ✅ Valider
                    </button>
                    <button
                      className="btn-action btn-reject"
                      onClick={() => handleReject(product.id, product.name)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white'
                      }}
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