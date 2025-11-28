import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../config/stripeConfig';
import { CheckoutForm } from '../components/CheckoutForm';
import { getProductById } from '../service/ProductService';
import { Product } from '../models/Product';
import '../styles/PaymentPage.css';

export const PaymentPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!productId) {
                    throw new Error('ID produit manquant');
                }
                const data = await getProductById(parseInt(productId));
                setProduct(data);
            } catch (err: any) {
                setError(err.message || 'Erreur lors du chargement du produit');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleSuccess = () => {
        navigate('/payment-success');
    };

    const handleCancel = () => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return (
            <div className="payment-page">
                <div className="loading">Chargement...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="payment-page">
                <div className="error-container">
                    <h2>Erreur</h2>
                    <p>{error || 'Produit introuvable'}</p>
                    <button onClick={() => navigate('/')}>Retour à l'accueil</button>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-page">
            <div className="payment-container">
                <div className="product-summary">
                    <h2>Récapitulatif</h2>
                    <div className="product-info">
                        <img
                            src={product.imageUrl || 'https://via.placeholder.com/150'}
                            alt={product.name}
                        />
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price.toFixed(2)} €</p>
                        </div>
                    </div>
                </div>

                <div className="payment-form-container">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            productId={product.id}
                            amount={product.price}
                            onSuccess={handleSuccess}
                            onCancel={handleCancel}
                        />
                    </Elements>
                </div>
            </div>
        </div>
    );
};