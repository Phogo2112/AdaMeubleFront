import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addPreference, removePreference, checkPreference } from '../service/PreferenceService';
import { useAuth } from '../context/AuthContext';

interface Category {
    id: number;
    name: string;
}

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: Category;
}

function ProductCard({ id, name, price, imageUrl, category }: ProductCardProps) {
    const { isAuthenticated } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadFavoriteStatus();
        }
    }, [isAuthenticated, id]);

    const loadFavoriteStatus = async () => {
        try {
            const status = await checkPreference(id);
            setIsFavorite(status);
        } catch (err) {
            console.error('Erreur vérification favoris:', err);
        }
    };

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        try {
            if (isFavorite) {
                await removePreference(id);
                setIsFavorite(false);
            } else {
                await addPreference(id);
                setIsFavorite(true);
            }
        } catch (err: any) {
            if (err.response?.status === 401) {
                alert('Connectez-vous pour ajouter aux favoris');
            } else {
                alert('Erreur lors de la modification des favoris');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            {isAuthenticated && (
                <button
                    onClick={handleToggleFavorite}
                    disabled={loading}
                    className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                    title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                    {loading ? '⏳' : (isFavorite ? '❤️' : '🤍')}
                </button>
            )}

            <img
                src={imageUrl || 'https://via.placeholder.com/250'}
                alt={name}
                className="card-img"
            />
            <h3 className="card-title">{name}</h3>
            <p className="card-category">{category.name}</p>
            <p className="card-price">{price}€</p>
            <Link to={`/products/${id}`} className="btn btn-primary btn-block">
                Voir les détails
            </Link>
        </div>
    );
}

export default ProductCard;