import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../service/ProductService';
import { getAllCategories } from '../service/CategoryService';
import { getAllColors } from '../service/ColorService';
import { getAllMaterials } from '../service/MaterialService';
import { Category } from '../models/Category';
import { Color } from '../models/Color';
import { Material } from '../models/Material';
import '../styles/CreateProductPage.css';

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isAdminContext = window.location.pathname.startsWith('/admin');
  const backPath = isAdminContext ? '/admin/products' : '/my-products';

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

  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('ID du produit manquant');
        setLoadingProduct(false);
        return;
      }

      try {
        setLoadingProduct(true);
        const product = await getProductById(Number(id));

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          dimensions: product.dimensions,
          imageUrls: [product.imageUrl],
          sku: product.sku,
          categoryId: product.category.id.toString(),
          couleurIds: product.colors.map(color => color.id),
          matiereIds: product.materials.map(material => material.id)
        });

        setLoadingProduct(false);
      } catch (err: any) {
        console.error('Erreur chargement produit:', err);
        setError(err.response?.data?.message || 'Erreur lors du chargement du produit');
        setLoadingProduct(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData(prev => ({
      ...prev,
      couleurIds: selectedOptions
    }));
  };

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData(prev => ({
      ...prev,
      matiereIds: selectedOptions
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        imageUrls: formData.imageUrls[0] ? [formData.imageUrls[0]] : []
      };

      await updateProduct(Number(id), productData);

      // ✅ MODIFIÉ : Redirection intelligente
      navigate(backPath);
    } catch (err: any) {
      console.error('Erreur modification produit:', err);
      setError(err.response?.data?.message || 'Erreur lors de la modification du produit');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="create-product-container">
        <div className="loading-message">
          Chargement du produit...
        </div>
      </div>
    );
  }

  return (
    <div className="create-product-container">
      <div className="create-product-header">
        <h1>Modifier le produit</h1>
        {/* ✅ MODIFIÉ : Bouton retour intelligent */}
        <button
          className="btn-back"
          onClick={() => navigate(backPath)}
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
              disabled
            />
          </div>
        </div>

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

        <div className="form-actions">
          {/* ✅ MODIFIÉ : Bouton annuler intelligent */}
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(backPath)}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Modification en cours...' : 'Modifier le produit'}
          </button>
        </div>
      </form>
    </div>
  );
}