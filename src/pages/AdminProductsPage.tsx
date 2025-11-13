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
                {<button className="btn-create">+ Créer un produit</button> }
            </div>

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
                        <td className="col-price">{product.price}</td>
                        <td className="col-status">
                                <span className={`status-badge status-${product.status.toLowerCase()}`}>
                                    {product.status}
                                </span>
                        </td>
                        <td className="col-actions">
                            <div className="action-buttons">
                                <button className="btn-action btn-edit">Modifier</button>
                                <button className="btn-action btn-delete">Supprimer</button>
                            </div>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}