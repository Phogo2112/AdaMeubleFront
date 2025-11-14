import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../service/ProductService';
import { getAllCategories } from '../service/CategoryService';
import { getAllColors } from '../service/ColorService';
import { getAllMaterials } from '../service/MaterialService';
import { Category } from '../models/Category';
import { Color } from '../models/Color';
import { Material } from '../models/Material';
import '../styles/CreateProductPage.css'; // Réutilise le même CSS



export function EditProductPage() {
  // 🎯 ÉTAPE 1 : Récupération de l'ID depuis l'URL
  // Si l'URL est /admin/products/edit/42, alors id = "42"
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 🎯 ÉTAPE 2 : État du formulaire (identique à CreateProductPage)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    dimensions: '',
    imageUrls: [''],
    sku: '',
    categoryId: '',
    couleurIds: [] as number[],
    matiereIds: [] as number[]
  });

  // 🎯 ÉTAPE 3 : États pour les listes déroulantes (catégories, couleurs, matières)
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  // 🎯 ÉTAPE 4 : États pour le chargement et les erreurs
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true); // Nouveau : pour le chargement initial
  const [error, setError] = useState<string | null>(null);

  // 🎯 ÉTAPE 5 : useEffect n°1 - Charger les options du formulaire
  // Ce useEffect charge les catégories, couleurs et matières (comme dans CreateProductPage)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, colorsData, materialsData] = await Promise.all([
          getAllCategories(),
          getAllColors(),
          getAllMaterials()
        ]);
        setCategories(categoriesData);
        setColors(colorsData);
        setMaterials(materialsData);
      } catch (err) {
        console.error('Erreur chargement données:', err);
        setError('Erreur lors du chargement des données');
      }
    };
    fetchData();
  }, []);

  // 🎯 ÉTAPE 6 : useEffect n°2 - Charger le produit à éditer
  // Ce useEffect charge le produit spécifique et PRÉ-REMPLIT le formulaire
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('ID du produit manquant');
        setLoadingProduct(false);
        return;
      }

      try {
        setLoadingProduct(true);

        // 📥 Appel GET pour récupérer le produit
        const product = await getProductById(Number(id));

        // 🔄 TRANSFORMATIONS : Backend → Frontend
        // On transforme les données du backend pour qu'elles correspondent au format du formulaire
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(), // number → string pour l'input
          dimensions: product.dimensions,
          imageUrls: [product.imageUrl], // string → tableau
          sku: product.sku,
          categoryId: product.category.id.toString(), // objet → ID
          couleurIds: product.colors.map(color => color.id), // objets → IDs
          matiereIds: product.materials.map(material => material.id) // objets → IDs
        });

        setLoadingProduct(false);
      } catch (err: any) {
        console.error('Erreur chargement produit:', err);
        setError(err.response?.data?.message || 'Erreur lors du chargement du produit');
        setLoadingProduct(false);
      }
    };

    loadProduct();
  }, [id]); // ⚠️ Important : se relance si l'ID change !

  // 🎯 ÉTAPE 7 : Gestion des changements dans les champs (identique à CreateProductPage)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🎯 ÉTAPE 8 : Gestion des couleurs (multi-select)
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData(prev => ({
      ...prev,
      couleurIds: selectedOptions
    }));
  };

  // 🎯 ÉTAPE 9 : Gestion des matières (multi-select)
  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData(prev => ({
      ...prev,
      matiereIds: selectedOptions
    }));
  };

  // 🎯 ÉTAPE 10 : Soumission du formulaire
  // ⚠️ DIFFÉRENCE MAJEURE avec CreateProductPage : on utilise updateProduct() au lieu de createProduct()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 🔄 Préparation des données pour l'envoi
      const productData = {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        imageUrls: formData.imageUrls[0] ? [formData.imageUrls[0]] : []
      };

      // 📤 Appel PUT pour modifier le produit
      // ⚠️ Différence : on passe l'ID en premier paramètre !
      await updateProduct(Number(id), productData);

      // ✅ Redirection après succès
      navigate('/admin/products');
    } catch (err: any) {
      console.error('Erreur modification produit:', err);
      setError(err.response?.data?.message || 'Erreur lors de la modification du produit');
    } finally {
      setLoading(false);
    }
  };

  // 🎯 ÉTAPE 11 : Affichage pendant le chargement initial
  if (loadingProduct) {
    return (
      <div className="create-product-container">
        <div className="loading-message">
          Chargement du produit...
        </div>
      </div>
    );
  }

  // 🎯 ÉTAPE 12 : Rendu du formulaire (presque identique à CreateProductPage)
  return (
    <div className="create-product-container">
      <div className="create-product-header">
        {/* ⚠️ Différence : titre "Modifier" au lieu de "Créer" */}
        <h1>Modifier le produit</h1>
        <button
          className="btn-back"
          onClick={() => navigate('/admin/products')}
        >
          ← Retour
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form className="product-form" onSubmit={handleSubmit}>
        {/* 📝 Section : Informations de base */}
        <div className="form-section">
          <h2>Informations de base</h2>

          <div className="form-group">
            <label htmlFor="name">Nom du produit *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Prix (€) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dimensions">Dimensions *</label>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                placeholder="ex: 120x80x75 cm"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrls">URL de l'image</label>
            <input
              type="url"
              id="imageUrls"
              name="imageUrls"
              value={formData.imageUrls[0]}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                imageUrls: [e.target.value]
              }))}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              disabled // ⚠️ Le SKU ne devrait pas être modifiable en édition
            />
          </div>
        </div>

        {/* 📝 Section : Catégorisation */}
        <div className="form-section">
          <h2>Catégorisation</h2>

          <div className="form-group">
            <label htmlFor="categoryId">Catégorie *</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="couleurIds">Couleurs</label>
            <select
              id="couleurIds"
              name="couleurIds"
              multiple
              value={formData.couleurIds.map(String)}
              onChange={handleColorChange}
              className="multi-select"
            >
              {colors.map(color => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
            <small>Maintenir Ctrl (ou Cmd) pour sélectionner plusieurs</small>
          </div>

          <div className="form-group">
            <label htmlFor="matiereIds">Matières</label>
            <select
              id="matiereIds"
              name="matiereIds"
              multiple
              value={formData.matiereIds.map(String)}
              onChange={handleMaterialChange}
              className="multi-select"
            >
              {materials.map(material => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
            <small>Maintenir Ctrl (ou Cmd) pour sélectionner plusieurs</small>
          </div>
        </div>

        {/* 🎯 Boutons d'action */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/admin/products')}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {/* ⚠️ Différence : texte "Modifier" au lieu de "Créer" */}
            {loading ? 'Modification en cours...' : 'Modifier le produit'}
          </button>
        </div>
      </form>
    </div>
  );
}