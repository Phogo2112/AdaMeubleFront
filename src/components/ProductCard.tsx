import React from 'react';
import { Link } from 'react-router-dom';

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
    return (
        <div className="card">
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