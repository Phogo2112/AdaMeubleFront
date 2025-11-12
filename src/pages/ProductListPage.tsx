import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../service/ProductService';
import ProductCard from '../components/ProductCard';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: {
        id: number;
        name: string;
    };
}

function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            category={product.category}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductListPage;