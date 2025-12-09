import React, { useState, useContext } from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 

const ItemDetail = ({ product }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    
    const { addItem } = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
        
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        };

        addItem(item, quantity);
    };

    if (!product) return null;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img 
                            src={product.image}
                            alt={product.name} 
                            className="img-fluid rounded-start w-100"
                            style={{ objectFit: 'cover', height: '400px' }}
                        />
                    </div>
                    
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p className="card-text text-muted">{product.description || "Sin descripción disponible."}</p>
                            <h3 className="text-success my-3">${product.price}</h3>
                            <p className="card-text">
                                <small className="text-muted">SKU: {product.id}</small>
                            </p>
                            
                            {quantityAdded > 0 ? (
                                <div className="d-grid gap-2">
                                    <Link to="/cart" className="btn btn-success btn-lg">
                                        Terminar la compra
                                    </Link>
                                    <Link to="/" className="btn btn-outline-primary">
                                        Seguir comprando
                                    </Link>
                                </div>
                            ) : (
                                <ItemCount 
                                    initial={1} 
                                    stock={product.stock || 10} 
                                    onAdd={handleOnAdd} 
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;