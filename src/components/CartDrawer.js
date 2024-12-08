import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CartDrawer({cartItems, closeCart, updateQuantity, removeItem }) {
    const navigate = useNavigate();
    const [Coupons,setCoupons]=useState([])
    const [SelectedCoupons,setSelectedCoupons]=useState(null)
    const [saveError, setSaveError] = useState(null);
    // useEffect(() => {
    //     const fetchCoupons = async () => {
    //       try {
    //         const response = await axios.get('http://localhost:5000/api/coupons'); // Adjust the URL if needed
    //         const couponOptions = response.data.coupons.map((coupon) => ({
    //           label: `${coupon.title} - ${coupon.condition}`,
    //           value: coupon.id,
    //         }));
    //         setCoupons(couponOptions);
    //         console.log(couponOptions)
    //       } catch (error) {
    //         console.error('Error fetching coupons:', error);
    //       }
    //     };
    
    //     fetchCoupons();
    //   }, []);
    
      // Handle coupon selection
      const handleCouponSelect = (selectedOptions) => {
        setSelectedCoupons(selectedOptions);
      };
    
    const saveCartToServer = async () => {
        try {
            await axios.post('http://localhost:5000/api/cart', { cartItems });
            setSaveError(null);
            return true;
        } catch (error) {
            console.error('Error saving cart:', error);
            setSaveError('Unable to save cart to server. Please try again later.');
            return false;
        }
    };
    const username = useSelector((state) => state.auth.userData?.username);
    const BuyCart = async () => {
        if (!username) {
            saveCartToServer()
            navigate('/login');
            closeCart();
        }
    };
    return (
        <div className="fixed inset-0 flex justify-end">
            <div className="bg-white w-80 p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center mb-2">
                            <img src={item.image} alt={`Image of ${item.name}`} className="w-12 h-12 object-cover mr-2" />
                            <span>{item.name}</span>
                            <div className="flex items-center">
                                <button onClick={() => updateQuantity(item, -1)} className="bg-gray-300 px-2 py-1 rounded">-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item, 1)} className="bg-gray-300 px-2 py-1 rounded">+</button>
                            </div>
                            <span>₹{(item.price * item.quantity)}</span>
                            <button onClick={() => removeItem(item)} className="text-red-600 ml-2"><i className="fas fa-times"></i></button>
                        </li>
                    ))}
                </ul>
                <Select 
                isMulti
                options={Coupons}
                onChange={handleCouponSelect}
                value={SelectedCoupons}/>
                <button onClick={closeCart} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Close</button>
                <button onClick={BuyCart} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Buy</button>
            </div>
        </div>
    );
}

export default CartDrawer;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function CartDrawer({ cartItems, closeCart, updateQuantity, removeItem }) {
//     const navigate = useNavigate();
//     const BuyCart=()=>{
//         navigate("/login");
//         closeCart()
//     }
//     return (
//         <div className="fixed inset-0 flex justify-end">
//             <div className="bg-white w-80 p-6 shadow-lg">
//                 <h2 className="text-2xl font-bold mb-4">Cart</h2>
//                 <ul>
//                     {cartItems.map((item, index) => (
//                         <li key={index} className="flex justify-between items-center mb-2">
//                             <img src={item.image} alt={`Image of ${item.name}`} className="w-12 h-12 object-cover mr-2" />
//                             <span>{item.name}</span>
//                             <div className="flex items-center">
//                                 <button onClick={() => updateQuantity(item, -1)} className="bg-gray-300 px-2 py-1 rounded">-</button>
//                                 <span className="mx-2">{item.quantity}</span>
//                                 <button onClick={() => updateQuantity(item, 1)} className="bg-gray-300 px-2 py-1 rounded">+</button>
//                             </div>
//                             <span>${(item.price * item.quantity).toFixed(2)}</span>
//                             <button onClick={() => removeItem(item)} className="text-red-600 ml-2"><i className="fas fa-times"></i></button>
//                         </li>
//                     ))}
//                 </ul>
//                 <button onClick={closeCart} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Close</button>
//                 <button onClick={BuyCart} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Buy</button>
//             </div>
//         </div>
//     );
// }

// export default CartDrawer;