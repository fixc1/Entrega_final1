import { Link } from 'react-router-dom';

const Item = ({ product }) => { 
    return (
        <div className="col-12 col-md-4 col-lg-3">
            
            <div className="card h-100 shadow-sm">
                
                <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name} 
                />
                
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{product.name}</h5>
                    <p className="card-text text-center fw-bold">
                        Precio: ${product.price}
                    </p>
                    <p className="card-text text-muted text-center small">
                        Categoría: {product.category}
                    </p>
                    
                    <div className="mt-auto text-center">
                        <Link to={`/item/${product.id}`} className="btn btn-primary w-100">
                            Ver detalle
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;