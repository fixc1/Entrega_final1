import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(prev => prev.map(prod => 
                prod.id === item.id 
                    ? { ...prod, quantity: prod.quantity + quantity } 
                    : prod
            ));
        } else {
            setCart(prev => [...prev, { ...item, quantity }]);
        }
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(prod => prod.id !== id));
    };

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id);
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalQuantity = () => {
        return cart.reduce((acc, prod) => acc + prod.quantity, 0);
    };

    const totalAmount = () => {
        return cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addItem, 
            removeItem,
            clearCart, 
            totalQuantity,
            totalAmount 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);