import React, { useEffect, useState } from 'react';
import VegetableCard from './VegetableCard';

function VegetableList({ category, addToCart }) {
    const [filteredVegetables, setFilteredVegetables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (category) {
            fetchVegetables(category);
        }
    }, [category]);

    const fetchVegetables = async (category) => {
        setLoading(true);
        try {
            console.log(`Fetching vegetables for category: ${category}`);
            const response = await fetch(`http://localhost:5000/api/vegetables?category=${category}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched vegetables:', data);
            setFilteredVegetables(data);
        } catch (error) {
            console.error('Error fetching vegetables:', error.message || error);
        } finally {
            setLoading(false);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredVegetables.map(vegetable => (
                <VegetableCard key={vegetable.id} vegetable={vegetable} addToCart={addToCart} />
            ))}
        </div>
    );
}

export default VegetableList;

// import React, { useEffect, useState } from 'react';
// import VegetableCard from './VegetableCard';
// import vegetables from '../data/vegetables';

// function VegetableList({ category, addToCart }) {
//     const [filteredVegetables, setFilteredVegetables] = useState([]);

//     useEffect(() => {
//         // Check if the category exists in the vegetables object
//         if (vegetables[category]) {
//             setFilteredVegetables(vegetables[category]); // Get the vegetables for the specified category
//         } else {
//             setFilteredVegetables([]); // Set to empty array if category does not exist
//         }
//     }, [category]);

//     return (
//         <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {filteredVegetables.map(vegetable => (
//                 <VegetableCard key={vegetable.id} vegetable={vegetable} addToCart={addToCart} />
//             ))}
//         </div>
//     );
// }

// export default VegetableList;