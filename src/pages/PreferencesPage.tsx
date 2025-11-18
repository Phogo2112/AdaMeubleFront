import { useState, useEffect } from 'react';
import { getMyPreferences, addPreference, deletePreference } from '../service/userRequestService';
import { getAllCategories } from '../service/CategoryService';
import { getAllColors } from '../service/ColorService';
import { getAllMaterials } from '../service/MaterialService';
import { UserRequest, CreateUserRequestDTO } from '../models/UserRequest';
import { Category } from '../models/Category';
import { Color } from '../models/Color';
import { Material } from '../models/Material';
import '../styles/CreateProductPage.css'; // Réutilise le CSS

export function PreferencesPage() {
  // États pour les préférences
  const [preferences, setPreferences] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // États pour les listes déroulantes
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  // État pour le formulaire d'ajout
  const [formData, setFormData] = useState<CreateUserRequestDTO>({
    categoryId: undefined,
    colorId: undefined,
    materialId: undefined
  });

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Charger en parallèle
      const [prefsData, catsData, colorsData, matsData] = await Promise.all([
        getMyPreferences(),
        getAllCategories(),
        getAllColors(),
        getAllMaterials()
      ]);

      setPreferences(prefsData);
      setCategories(catsData);
      setColors(colorsData);
      setMaterials(matsData);
      setError(null);
    } catch (err: any) {
      console.error('Erreur chargement:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value ? Number(value) : undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier qu'au moins un champ est rempli
    if (!formData.categoryId && !formData.colorId && !formData.materialId) {
      alert('Veuillez sélectionner au moins une préférence');
      return;
    }

    try {
      const newPref = await addPreference(formData);

      // Ajouter à la liste locale
      setPreferences([...preferences, newPref]);

      // Réinitialiser le formulaire
      setFormData({
        categoryId: undefined,
        colorId: undefined,
        materialId: undefined
      });

      alert('✅ Préférence ajoutée avec succès !');
    } catch (err: any) {
      console.error('Erreur ajout:', err);
      alert('Erreur lors de l\'ajout de la préférence');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette préférence ?')) {
      return;
    }

    try {
      await deletePreference(id);

      // Retirer de la liste locale
      setPreferences(preferences.filter(p => p.id !== id));

      alert('✅ Préférence supprimée');
    } catch (err: any) {
      console.error('Erreur suppression:', err);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="create-product-container">
        <div className="loading-message">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="create-product-container">
      <div className="create-product-header">
        <h1>Mes préférences</h1>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Formulaire d'ajout */}
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>🎨 Ajouter une nouvelle préférence</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Sélectionnez au moins une catégorie, couleur ou matière que vous aimez.
          </p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoryId">Catégorie</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId || ''}
                onChange={handleInputChange}
              >
                <option value="">-- Aucune --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="colorId">Couleur</label>
              <select
                id="colorId"
                name="colorId"
                value={formData.colorId || ''}
                onChange={handleInputChange}
              >
                <option value="">-- Aucune --</option>
                {colors.map(color => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="materialId">Matière</label>
              <select
                id="materialId"
                name="materialId"
                value={formData.materialId || ''}
                onChange={handleInputChange}
              >
                <option value="">-- Aucune --</option>
                {materials.map(mat => (
                  <option key={mat.id} value={mat.id}>
                    {mat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            + Ajouter cette préférence
          </button>
        </div>
      </form>

      {/* Liste des préférences */}
      <div className="product-form" style={{ marginTop: '30px' }}>
        <div className="form-section">
          <h2>📋 Mes préférences actuelles</h2>

          {preferences.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              Vous n'avez pas encore de préférences enregistrées.
            </p>
          ) : (
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Catégorie</th>
                  <th>Couleur</th>
                  <th>Matière</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {preferences.map(pref => (
                  <tr key={pref.id}>
                    <td>{pref.category?.name || '-'}</td>
                    <td>{pref.color?.name || '-'}</td>
                    <td>{pref.material?.name || '-'}</td>
                    <td>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(pref.id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}