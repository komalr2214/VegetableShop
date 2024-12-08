import React, { useRef } from 'react';

function VegetableCard({ vegetable, addToCart }) {
    const imgRef = useRef(null);

    const handleAddToCart = () => {
        if (imgRef.current) {
            const img = imgRef.current;
            const cartIcon = document.querySelector(".fa-shopping-cart");
            
            const imgRect = img.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();

            const flyingImage = img.cloneNode(true);
            flyingImage.style.position = "absolute";
            flyingImage.style.top = `${imgRect.top}px`;
            flyingImage.style.left = `${imgRect.left}px`;
            flyingImage.style.width = `${imgRect.width}px`;
            flyingImage.style.height = `${imgRect.height}px`;
            flyingImage.style.zIndex = 1000;
            flyingImage.style.transition = "all 1s ease-in-out";

            document.body.appendChild(flyingImage);

            requestAnimationFrame(() => {
                flyingImage.style.top = `${cartRect.top}px`;
                flyingImage.style.left = `${cartRect.left}px`;
                flyingImage.style.width = "20px";
                flyingImage.style.height = "20px";
                flyingImage.style.opacity = "0.5";
            });

            flyingImage.addEventListener("transitionend", () => {
                flyingImage.remove();
            });
        }

        addToCart(vegetable);
    };

    return (
        <div className="border p-4 rounded-lg shadow-md">
            <img
                ref={imgRef}
                src={vegetable.image}
                alt={`Image of ${vegetable.name}`}
                className="w-full h-32 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{vegetable.name}</h2>
            <p className="text-gray-700 mb-2">₹{vegetable.price} <b>{vegetable.unit}</b></p>
            <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
}

export default VegetableCard;

// import React from 'react';

// function VegetableCard({ vegetable, addToCart }) {
//     return (
//         <div className="border p-4 rounded-lg shadow-md">
//             <img src={vegetable.image} alt={`Image of ${vegetable.name}`} className="w-full h-32 object-cover mb-4" />
//             <h2 className="text-xl font-bold mb-2">{vegetable.name}</h2>
//             <p className="text-gray-700 mb-2">${vegetable.price.toFixed(2)}</p>
//             <button onClick={() => addToCart(vegetable)} className="bg-green-600 text-white px-4 py-2 rounded">Add to Cart</button>
//         </div>
//     );
// }

// export default VegetableCard;
