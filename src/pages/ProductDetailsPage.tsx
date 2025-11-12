import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../service/ProductService';
import { Product } from '../models/Product';

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProductById(Number(id))
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading">Chargement du produit...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;
    if (!product) return <div>Le produit n'existe pas</div>;

    return (
        <div className="container">
            <h1>{product.name}</h1>

            <img src={product.imageUrl} alt={product.name} />

            <p>Prix : {product.price}€</p>
            <p>Description : {product.description}</p>
            <p>Dimensions : {product.dimensions}</p>
            <p>Catégorie : {product.category.name}</p>

            <div>
                <h3>Couleurs disponibles :</h3>
                {product.colors.map(color => (
                    <span key={color.id}>{color.name} </span>
                ))}
            </div>

            <div>
                <h3>Matières :</h3>
                {product.materials.map(material => (
                    <span key={material.id}>{material.name} </span>
                ))}
            </div>

            <button>Acheter</button>
        </div>
    );
}

export default ProductDetailPage;