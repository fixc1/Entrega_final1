import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        description: '' 
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('https://68fa7e15ef8b2e621e802566.mockapi.io/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => toast.error("Error al cargar productos"));
    };

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!newProduct.name) return toast.warning("El nombre es obligatorio");
        if (newProduct.price <= 0) return toast.warning("El precio debe ser mayor a 0");
        if (newProduct.description.length < 10) return toast.warning("La descripción debe tener al menos 10 caracteres");

        fetch('https://68fa7e15ef8b2e621e802566.mockapi.io/products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            toast.success("Producto creado con éxito");
            setProducts([...products, data]);
            setNewProduct({ name: '', price: '', image: '', category: '', description: '' });
        })
        .catch(err => toast.error("Error al crear producto"));
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            fetch(`https://68fa7e15ef8b2e621e802566.mockapi.io/products/${id}`, {
                method: 'DELETE',
            })
            .then(res => {
                if (res.ok) {
                    toast.success("Producto eliminado");
                    setProducts(products.filter(prod => prod.id !== id));
                } else {
                    throw new Error();
                }
            })
            .catch(err => toast.error("Error al eliminar"));
        }
    };

    if (loading) return <div className="container mt-5">Cargando panel...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Panel de Administración (CRUD)</h2>
            
            <div className="card p-4 mb-5 bg-light">
                <h4>Agregar Nuevo Producto</h4>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="name" className="form-control" value={newProduct.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Precio</label>
                        <input type="number" name="price" className="form-control" value={newProduct.price} onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Categoría</label>
                        <select name="category" className="form-select" value={newProduct.category} onChange={handleChange}>
                            <option value="">Seleccionar...</option>
                            <option value="Ropa">Ropa</option>
                            <option value="Calzado">Calzado</option>
                            <option value="Suplementos">Suplementos</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">URL Imagen</label>
                        <input type="text" name="image" className="form-control" value={newProduct.image} onChange={handleChange} placeholder="http://..." />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Descripción (Mínimo 10 carácteres)</label>
                        <textarea name="description" className="form-control" value={newProduct.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Guardar Producto</button>
                    </div>
                </form>
            </div>

            <h4>Inventario Actual</h4>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prod => (
                            <tr key={prod.id}>
                                <td>{prod.id}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img src={prod.image} alt="img" style={{width: '40px', height: '40px', objectFit:'cover', marginRight:'10px'}} />
                                        {prod.name}
                                    </div>
                                </td>
                                <td>${prod.price}</td>
                                <td><span className="badge bg-secondary">{prod.category}</span></td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(prod.id)} 
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;