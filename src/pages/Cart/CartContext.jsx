import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Get email from localStorage
    const email = localStorage.getItem("email");

    const fetchCart = async () => {
        if (!email) return;

        try {
            const res = await axios.post("http://localhost:5000/cart/get", { email });
            setCartItems(res.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [email]);

    const addToCart = async (item) => {
        if (!email) return;

        try {
            await axios.post("http://localhost:5000/cart/add", { ...item, email });
            fetchCart();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    //remove item
    const removeFromCart = async (productId, color, size) => {
        if (!email) return;

        try {
            await axios.post("http://localhost:5000/cart/remove", { email, productId, color, size });
            fetchCart();
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const clearCart = async () => {
        if (!email) return;

        try {
            await axios.post("http://localhost:5000/cart/clear", { email });
            setCartItems([]);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
