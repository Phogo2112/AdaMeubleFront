import React, { useEffect } from 'react';
import { getAllProducts } from '../service/ProductService';
import { getAllCategories } from '../service/CategoryService';
import { getAllColors } from '../service/ColorService';
import { getAllMaterials } from '../service/MaterialService';

function HomePage() {
    useEffect(() => {
        // Test des appels API
        console.log('🧪 Test des appels API...');

        getAllProducts()
            .then(products => console.log('✅ Products:', products))
            .catch(error => console.error('❌ Products error:', error));

        getAllCategories()
            .then(categories => console.log('✅ Categories:', categories))
            .catch(error => console.error('❌ Categories error:', error));

        getAllColors()
            .then(colors => console.log('✅ Colors:', colors))
            .catch(error => console.error('❌ Colors error:', error));

        getAllMaterials()
            .then(materials => console.log('✅ Materials:', materials))
            .catch(error => console.error('❌ Materials error:', error));
    }, []);

    return (
        <div>
            <h1>HomePage - Test API</h1>
            <p>Ouvre la console (F12) pour voir les résultats !</p>
        </div>
    );
}

export default HomePage;