import { useState, useEffect } from 'react';
import { getAllProductsForAdmin } from '../service/ProductService';
import { Product } from '../models/Product';
import '../styles/AdminProductsPage.css';
import { useNavigate } from 'react-router-dom';




export function AdminProductsPage() {
    const [productsState, setProductsState] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProductsForAdmin()
            .then(data => setProductsState(data))
            .catch(err => console.error("Erreur:", err));
    }, []);

    return (
        <div className="admin-products-container">
            <div className="admin-products-header">
                <h1>Administration des produits</h1>
                {/* ✅ Connecte le bouton Créer */}
                <button
                    className="btn-create"
                    onClick={() => navigate('/admin/products/create')}
                >
                    + Créer un produit
                </button>
            </div>

            <table className="admin-products-table">
                {/* ... thead ... */}
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
                                    {/* ✅ Connecte le bouton Modifier */}
                                    <button
                                        className="btn-action btn-edit"
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                    >
                                        Modifier
                                    </button>
                                    {/* ✅ Bouton Supprimer (à implémenter plus tard) */}
                                    <button
                                        className="btn-action btn-delete"
                                        onClick={() => {
                                            if (window.confirm('Êtes-vous sûr ?')) {
                                                // Appeler deleteProduct ici
                                            }
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}