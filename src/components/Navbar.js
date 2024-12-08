import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar({ cartItems, toggleCart }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/logout', { // Update the URL here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include this to ensure cookies are sent with the request
            });
    
            if (!response.ok) {
                throw new Error('Logout failed');
            }
    
            const data = await response.json();
            console.log(data.message); // Optional: log the success message
    
            // Navigate to the login page after successful logout
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            // Optionally, show a notification or alert to the user
        }
    };
    

    const username = useSelector((state) => state.auth.userData?.username);
    console.log(username)
    return (
        <nav className="bg-green-600 p-4 flex justify-between items-center">
            {/* Logo */}
            <h1 className="text-white text-2xl font-bold">Vegetable Shop</h1>

            {/* Hamburger menu for md and below */}
            <button
                className="text-white text-2xl lg:hidden focus:outline-none"
                onClick={handleMenuToggle}
            >
                <i className="fas fa-bars"></i>
            </button>

            {/* Navigation links */}
            <ul
                className={`${
                    isMenuOpen ? 'block' : 'hidden'
                } lg:flex lg:space-x-5 lg:static absolute top-16 left-0 w-full lg:w-auto bg-green-600 lg:bg-transparent text-center lg:text-left`}
            >
                <li className="py-2 lg:py-0">
                    <Link to="/">Home</Link>
                </li>
                <li className="py-2 lg:py-0">
                    <Link to="/root">Root Vegetables</Link>
                </li>
                <li className="py-2 lg:py-0">
                    <Link to="/cruciferous">Cruciferous Vegetables</Link>
                </li>
                <li className="py-2 lg:py-0">
                    <Link to="/greens">Greens</Link>
                </li>
                <li className="py-2 lg:py-0">
                    <Link to="/nightshades">Nightshades</Link>
                </li>
            </ul>

            {/* Cart and User Info */}
            <div className="flex items-center">
                {/* Cart section */}
                <div className="text-white cursor-pointer flex items-center" onClick={toggleCart}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="ml-2">{cartItems.length}</span>
                </div>

                {/* User Info */}
                <div className="relative ml-4">
                    <div className="text-white flex items-center cursor-pointer" onClick={handleDropdownToggle}>
                        <i className="fas fa-user-circle text-xl"></i>
                        <span className="ml-2">{username}</span>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-auto bg-white text-black rounded shadow-lg z-10">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/wishlist">Wishlist</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/history">History</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                                    <Link>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
