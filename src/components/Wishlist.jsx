import { useEffect, useState } from "react";
import axios from "axios";

const useWishlist = () => {
    const [wishlist, setWishlist] = useState({});
    const email = localStorage.getItem("email");

    // Fetch wishlist from database
    const fetchWishlist = async () => {
        if (!email) return;
        try {
            const res = await axios.post("https://ecommerce-mern-task-backend.onrender.com/wishlist/get", { email });
            const wishlistMap = res.data.reduce((acc, item) => {
                acc[item.productId] = true;
                return acc;
            }, {});
            setWishlist(wishlistMap);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    // Handle adding/removing from wishlist
    const toggleWishlist = async (productId) => {
        if (!email) return;
        try {
            if (wishlist[productId]) {
                await axios.post("https://ecommerce-mern-task-backend.onrender.com/wishlist/remove", { email, productId });
            } else {
                await axios.post("https://ecommerce-mern-task-backend.onrender.com/wishlist/add", { email, productId });
            }
            fetchWishlist(); // Refresh wishlist
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return { wishlist, toggleWishlist };
};

export default useWishlist;
