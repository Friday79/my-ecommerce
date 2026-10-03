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

}

    const addToCart = async (product) => {
        try{
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
        const response = await fetch(`${BASEURL}/api/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: product.id }),
        });
        fetchCart();
        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }
        const data = await response.json();
        setTotal(data.total || 0);
    
    }
};

    const removeFromCart = async (itemId) => {
        try {
        setCartItems(cartItems.filter((item) => item.id !== id));
        const response = await fetch(`${BASEURL}/api/cart/remove/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id: itemId }),
        });
        fetchCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }

    const updateQuantity = async (itemId, quantity) => {
        try {
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
        const response = await fetch(`${BASEURL}/api/cart/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id: itemId, quantity: newQuantity }),
        });
        fetchCart();
    } catch (error) {
        console.error('Error updating item quantity:', error);
    };

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () =>  useContext(CartContext);
