import { useState, useEffect } from 'react';
import { getAllProductsForAdmin, deleteProductAsAdmin } from '../service/ProductService';
import { Product } from '../models/Product';
import '../styles/AdminProductsPage.css';
import { useNavigate } from 'react-router-dom';

export function AdminProductsPage() {
    const [productsState, setProductsState] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    // ✅ Fonction pour charger les produits
    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllProductsForAdmin();
            setProductsState(data);
            setError(null);
        } catch (err: any) {
            console.error("Erreur:", err);
            setError(err.response?.data?.message || "Erreur lors du chargement des produits");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            return;
        }

        console.log('🗑️ [ADMIN] Suppression du produit ID:', id);

        try {
            await deleteProductAsAdmin(id);
            console.log('✅ [ADMIN] Produit supprimé avec succès');
            loadProducts();
        } catch (err: any) {
            console.error("❌ [ADMIN] Erreur suppression:", err);
            console.error("❌ [ADMIN] Details:", err.response);
            alert(err.response?.data?.message || "Erreur lors de la suppression");
        }
    };

    if (loading) {
        return (
            <div className="admin-products-container">
                <div className="loading-message">Chargement des produits...</div>
            </div>
        );
    }
    const handleValidate = async (id: number) => {
        if (!window.confirm('Valider ce produit et le mettre en ligne ?')) {
            return;
        }

        console.log('✅ [ADMIN] Validation du produit ID:', id);

        try {
            await fetch(`http://localhost:8080/api/admin/products/${id}/validate`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('✅ [ADMIN] Produit validé avec succès');
            loadProducts(); // Recharger la liste
        } catch (err: any) {
            console.error("❌ [ADMIN] Erreur validation:", err);
            alert("Erreur lors de la validation");
        }
    };

    const handleReject = async (id: number) => {
        if (!window.confirm('Refuser ce produit ?')) {
            return;
        }

        console.log('❌ [ADMIN] Refus du produit ID:', id);

        try {
            await fetch(`http://localhost:8080/api/admin/products/${id}/reject`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('✅ [ADMIN] Produit refusé');
            loadProducts(); // Recharger la liste
        } catch (err: any) {
            console.error("❌ [ADMIN] Erreur refus:", err);
            alert("Erreur lors du refus");
        }
    };

    return (
        <div className="admin-products-container">
            <div className="admin-products-header">
                <h1>Administration des produits</h1>
                <button
                    className="btn-create"
                    onClick={() => navigate('/admin/products/create')}
                >
                    + Créer un produit
                </button>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

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
                                <span className={`status-badge status-${product.status.toLowerCase()}`}>
                                    {product.status}
                                </span>
                            </td>
                            <td className="col-actions">
                                <div className="action-buttons">
                                    <button
                                        className="btn-action btn-edit"
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="btn-action btn-delete"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Supprimer
                                    </button>
                                    {product.status === 'PENDING' && (
                                        <>
                                            <button
                                                className="btn-action btn-validate"
                                                onClick={() => handleValidate(product.id)}
                                            >
                                                Valider
                                            </button>
                                            <button
                                                className="btn-action btn-reject"
                                                onClick={() => handleReject(product.id)}
                                            >
                                                Refuser
                                            </button>
                                            <div style={{ display: 'flex', gap: '10px' }}>

                                                <button
                                                    className="btn-create"
                                                    onClick={() => navigate('/admin/products/pending')}
                                                    style={{ backgroundColor: '#f39c12' }}
                                                >
                                                    🕐 Produits en attente
                                                </button>

                                                <button
                                                    className="btn-create"
                                                    onClick={() => navigate('/admin/products/create')}
                                                >
                                                    + Créer un produit
                                                </button>
                                            </div>
                                        </>

                                    )}

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}