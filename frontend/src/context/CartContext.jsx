import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    //fetchCart
const fetchChat = async () => {
    try {
        const response = await fetch(`${BASEURL}/api/cart/`);
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data.item || []);
        setTotal(data.total || 0);
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}


    useEffect (() => {
        fetchChat();
    }, []);

    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    }

    const updateQuantity = (id, quantity) => {
        const newQuantity = Number(quantity);
        if (newQuantity < 1) {
            removeFromCart(id) 
            return;
        }
        setCartItems((currentItems)=>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () =>  useContext(CartContext);
