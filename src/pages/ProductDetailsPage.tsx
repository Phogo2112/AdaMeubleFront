"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../service/ProductService';
import { Product } from '../models/Product';

// Interfaces pour typer proprement
interface Category {
    id: number;
    name: string;
}

interface Color {
    id: number;
    name: string;
}

interface Material {
    id: number;
    name: string;
}

function ProductDetailPage() {
    // Récupération de l'ID depuis l'URL
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // États pour le produit
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour rediriger vers la page de paiement Stripe
    const handleBuyClick = () => {
        // Vérifier si l'utilisateur est connecté
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Rediriger vers la page de paiement
        navigate(`/payment/${id}`);
    };

    // Chargement du produit au montage du composant
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

    // Gestion des différents états de chargement
    if (loading) return <div className="loading">Chargement du produit...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;
    if (!product) return <div>Le produit n'existe pas</div>;

    // Affichage du produit
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
                {product.colors.map((color: Color) => (
                    <span key={color.id}>{color.name} </span>
                ))}
            </div>

            <div>
                <h3>Matières :</h3>
                {product.materials.map((material: Material) => (
                    <span key={material.id}>{material.name} </span>
                ))}
            </div>

            <button
                className="btn-buy"
                onClick={handleBuyClick}
            >
                Acheter maintenant
            </button>
        </div>
    );
}

export default ProductDetailPage;