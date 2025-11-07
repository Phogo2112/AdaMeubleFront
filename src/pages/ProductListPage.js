import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../service/productService.ts';

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Chargement des produits...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="container">
            <h1>Nos Meubles Disponibles</h1>

            {products.length === 0 ? (
                <div className="empty-message">Aucun produit disponible pour le moment.</div>
            ) : (
                <div className="grid-container">
                    {products.map(product => (
                        <div key={product.id} className="card">
                            <img
                                src={product.imageUrl || 'https://via.placeholder.com/250'}
                                alt={product.name}
                                className="card-img"
                            />

                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-category">{product.category.name}</p>
                            <p className="card-price">{product.price}€</p>

                            <Link to={`/products/${product.id}`} className="btn btn-primary btn-block">
                                Voir les détails
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductListPage;