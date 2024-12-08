import React, { useState,useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainScreen from './components/MainScreen';
import VegetableList from './components/VegetableList';
import CartDrawer from './components/CartDrawer';
import LoginPage from "./components/LoginPage";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    // Move useLocation here, inside the Router context
    const location = useLocation();
    const [loginInfo, setLoginInfo] = useState(null);
    const [loginError, setLoginError] = useState(null);
    useEffect(() => {
        const fetchLoginInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getuser', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setLoginInfo(data.user?.username || null); 
                    setLoginError(null);
                } else {
                    setLoginError('Failed to retrieve login info');
                    setLoginInfo(null);
                }
            } catch (error) {
                console.error('Error retrieving login info:', error);
                setLoginError('Unable to connect to server');
                setLoginInfo(null);
            }
        };
    
        fetchLoginInfo();
    }, []);
    
  console.log(loginInfo)
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cart');
                setCartItems(response.data.cartItems);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);
    

    const addToCart = (vegetable) => {
        const existingItem = cartItems.find(item => item.id === vegetable.id);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === vegetable.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...vegetable, quantity: 1 }]);
        }
    };

    const updateQuantity = (vegetable, amount) => {
        setCartItems(cartItems.map(item =>
            item.id === vegetable.id ? { ...item, quantity: item.quantity + amount } : item
        ).filter(item => item.quantity > 0));
    };

    const removeItem = (vegetable) => {
        setCartItems(cartItems.filter(item => item.id !== vegetable.id));
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        <>
            {/* Navbar should not render on /login route */}
            {location.pathname !== '/login' && <Navbar cartItems={cartItems} toggleCart={toggleCart} loginInfo={loginInfo}/>}
            
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/login" element={<LoginPage setIsCartOpen={setIsCartOpen}/> } />
                <Route path="/root" element={<VegetableList category="Root" addToCart={addToCart} />} />
                <Route path="/cruciferous" element={<VegetableList category="Cruciferous" addToCart={addToCart} />} />
                <Route path="/greens" element={<VegetableList category="Greens" addToCart={addToCart} />} />
                <Route path="/nightshades" element={<VegetableList category="Nightshades" addToCart={addToCart} />} />
            </Routes>

            {/* Render CartDrawer if cart is open */}
            {isCartOpen && (
                <CartDrawer
                    cartItems={cartItems}
                    closeCart={closeCart}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    loginInfo={loginInfo}
                />
            )}
        </>
    );
}

export default App;
