import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartPage = () => {
    const { cart, clearCart, removeItem, totalAmount } = useCart(); 
    const navigate = useNavigate();

    const handleCheckout = () => {
        toast.success("¡Compra realizada con éxito! Gracias por elegirnos.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        clearCart();

        navigate("/");
    };

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Tu carrito está vacío</h2>
                <p className="lead">¡Agrega algunos productos para empezar!</p>
                <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Tu Carrito de Compras</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio Unit.</th>
                            <th scope="col">Cant.</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((prod) => (
                            <tr key={prod.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img 
                                            src={prod.image} 
                                            alt={prod.name} 
                                            style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px' }} 
                                        />
                                        <div>
                                            <p className="m-0 fw-bold">{prod.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>${prod.price}</td>
                                <td>{prod.quantity}</td>
                                <td>${(prod.price * prod.quantity).toFixed(2)}</td>
                                <td>
                                    <button 
                                        onClick={() => removeItem(prod.id)} 
                                        className="btn btn-danger btn-sm"
                                        title="Eliminar producto"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded shadow-sm">
                <button onClick={clearCart} className="btn btn-outline-danger">
                    Vaciar Carrito
                </button>
                <div className="text-end">
                    <h3>Total: <span className="text-success fw-bold">${totalAmount().toFixed(2)}</span></h3>
                    
                    <button onClick={handleCheckout} className="btn btn-success btn-lg mt-2">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;