import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data.slice(0, 6));
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="container">
            <h1>Bienvenue chez Lauréline Meubles</h1>
            <p style={{ fontSize: '18px', marginBottom: '30px', color: '#555' }}>
                Découvrez notre sélection de meubles de qualité pour votre intérieur
            </p>

            <h2>Nos derniers produits</h2>

            {products.length === 0 ? (
                <div className="empty-message">Aucun produit disponible pour le moment.</div>
            ) : (
                <>
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

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <Link to="/products" className="btn btn-primary">
                            Voir tous nos produits
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;