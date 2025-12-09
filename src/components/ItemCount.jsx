import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="btn-group" role="group" aria-label="Contador de items">
                <button type="button" className="btn btn-outline-secondary" onClick={decrement}>-</button>
                <button type="button" className="btn btn-outline-secondary" disabled>{quantity}</button>
                <button type="button" className="btn btn-outline-secondary" onClick={increment}>+</button>
            </div>
            <button 
                className="btn btn-dark btn-lg w-100 mt-3" 
                onClick={() => onAdd(quantity)} 
                disabled={!stock}
            >
                Agregar al Carrito
            </button>
        </div>
    );
};

export default ItemCount;