import React, { useState, useEffect } from 'react';
import { getMyPreferences, removePreference } from '../service/PreferenceService';
import { Preference } from '../models/Preference';
import { Link } from 'react-router-dom';
import '../styles/AdminProductsPage.css'; // On réutilise les styles existants

export function PreferencesPage() {
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const data = await getMyPreferences();
      setPreferences(data);
    } catch (err: any) {
      console.error('Erreur:', err);
      setError('Erreur lors du chargement de vos favoris');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: number) => {
    if (!window.confirm('Retirer ce produit de vos favoris ?')) {
      return;
    }

    try {
      await removePreference(productId);
      console.log('✅ Produit retiré des favoris');
      loadPreferences(); // Recharger la liste
    } catch (err: any) {
      console.error('❌ Erreur:', err);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="admin-products-container">
        <div className="loading-message">Chargement de vos favoris...</div>
      </div>
    );
  }

  return (
    <div className="admin-products-container">
      <div className="admin-products-header">
        <h1>Mes Produits Favoris ❤️</h1>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {preferences.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Vous n'avez pas encore de favoris.
          </p>
          <Link to="/products" className="btn-create">
            Découvrir les produits
          </Link>
        </div>
      ) : (
        <div className="grid-container">
          {preferences.map((pref) => (
            <div key={pref.id} className="card">
              <img
                src={pref.product.imageUrl || 'https://via.placeholder.com/250'}
                alt={pref.product.name}
                className="card-img"
              />
              <h3 className="card-title">{pref.product.name}</h3>
              <p className="card-category">{pref.product.category.name}</p>
              <p className="card-price">{pref.product.price}€</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Link
                  to={`/products/${pref.product.id}`}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Voir
                </Link>
                <button
                  className="btn-action btn-delete"
                  onClick={() => handleRemove(pref.product.id)}
                  style={{ flex: 1 }}
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}